import { useState, useMemo } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md';

import {
  FOOD_UNIT_TO_GRAMS_MAP,
  FOOD_TO_NUTRITION_MAP,
  FOOD_GROUP_MAP,
  foodKeyToHumanReadableStr,
} from '@/constants/foods';
import { useMealList } from '@/context/MealListContext';
import useFoodUnitIncrementMap from '@/hooks/useFoodUnitIncrementMap';
import { mergeObj, formatNumber } from '@/utils';


export default function Home() {
  const toast = useToast();

  const [highlighted, setHighlighted] = useState({});

  //=====================
  //  STATE
  //=====================
  // FOOD - single item with unique nutrition information
  // MEAL - multiple foods with aggregated nutrition information
  const { dispatchMealList } = useMealList();
  const [foodUnitIncrementMap, setFoodUnitIncrementMap] = useFoodUnitIncrementMap();

  // foodAmountObj - foodKey to amount of food (str) in grams
  const [foodAmountObjStr, setFoodAmountObjStr] = useState({});
  const foodAmountObj = Object.entries(foodAmountObjStr).reduce((acc, [key, val]) => {
    acc[key] = Number(val);
    return acc;
  }, {});
  const isFoodAmountObjEmpty = Object.keys(foodAmountObj).length === 0
  const foodAmountTotal = useMemo(() => {
    return Object.entries(foodAmountObj).reduce((acc, [foodKey, foodAmount]) => {
      if (foodKey in FOOD_UNIT_TO_GRAMS_MAP) {
        return acc + (foodAmount * FOOD_UNIT_TO_GRAMS_MAP[foodKey]);
      }
      return acc + foodAmount;
    }, 0);
  }, [foodAmountObj]);
  const handleFoodAmountChange = (foodKey, amount) => {
    // CSS background
    setHighlighted({ [foodKey]: amount > 0 ? 'green.100' : 'red.100' });
    setTimeout(() => setHighlighted({}), 300);

    // foodKey is unique food name string
    // amount is grams
    const currentAmount = foodAmountObj[foodKey] ?? 0;
    const newAmount = Math.max(currentAmount + amount, 0);  
    setFoodAmountObjStr({
      ...foodAmountObjStr,
      [foodKey]: newAmount
    });
  };
  const handleRemoveFood = (foodKey) => {
    setFoodAmountObjStr((foodAmountObj) => {
      // fancy syntax to remove "[foodKey]" from foodAmountObj
      const { [foodKey]: _, ...rest } = foodAmountObj;
      return rest;
    });
  };

  function reset() {
    setFoodAmountObjStr({});
  }
  function saveMeal() {
    reset();
    // build meal with nutrition info by aggregating food and amounts
    // eg:
    //    Input
    //      tofu: 120 grams
    //      eggs: 100 grams
    //    Output
    //      cholesterol: 30 grams
    const newMeal = Object.entries(foodAmountObj).reduce(
      (acc, [foodKey, foodAmount]) => {
        // proportion (5th grade math)
        // STEP 1
        //    50 grams tofu       300 grams tofu
        //    ---------------- = -------------------
        //    9 grams protein       X grams protein
        // STEP 2
        //    X = 300 * 9 / 50
        // GENERALIZE
        //    X = foodAmount * nutritionPerUnitAmount / unitAmount
        
        // If food is a unit (eg: banana), convert to grams
        if (foodKey in FOOD_UNIT_TO_GRAMS_MAP) {
          const unitToGrams = FOOD_UNIT_TO_GRAMS_MAP[foodKey];
          foodAmount = foodAmount * unitToGrams;
        }

        // calculate nutrition for this food
        const { amount, ...nutrition } = FOOD_TO_NUTRITION_MAP[foodKey];  // fancy syntax to remove "amount" from nutrition
        const currFoodNutrition = Object.entries(nutrition).reduce(
          (acc, [nutritionKey, nutritionPerUnitAmount]) => {
            acc[nutritionKey] = foodAmount * nutritionPerUnitAmount / amount
            return acc;
          }, {}
        );
        return mergeObj(acc, currFoodNutrition);
      }, {}
    )
    console.log('create_meal', { type: 'create', foodList: Object.keys(foodAmountObj), ...newMeal })
    dispatchMealList({ type: 'create', foodAmountObj, ...newMeal });

    toast({
      title: 'Success',
      description: 'Meal saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const [amount, setAmount] = useState(0);

  //=====================
  //  MAIN
  //=====================
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} align="stretch">
          {Object.entries(FOOD_GROUP_MAP).map(([groupName, foods]) => (
            <Box key={groupName}>
              <Heading size="lg" mb={4}>{foodKeyToHumanReadableStr(groupName)}</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {foods.map(({ key: foodKey, unitType, defaultStep }) => {
                  const name = foodKeyToHumanReadableStr(foodKey);
                  const amount = foodAmountObj[foodKey] ?? 0;
                  const displayAmount = unitType === 'unit' 
                    ? `${amount} ${name}${amount !== 1 ? 's' : ''}`
                    : `${amount} grams`;

                  return (
                    <Card
                      key={foodKey}
                      bg={highlighted[foodKey] || 'white'}
                      transition="background 0.2s"
                    >
                      <CardBody>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Heading size="md">{name}</Heading>
                            <Text fontSize="sm" color="gray.600">{displayAmount}</Text>
                          </VStack>
                          <HStack>
                            <IconButton
                              icon={<MdRemove />}
                              size="sm"
                              onClick={(e) => { handleFoodAmountChange(foodKey, -defaultStep); }}
                            />
                            <NumberInput
                              value={amount}
                              onChange={(valueString) =>
                                setFoodAmountObjStr((prev) => ({
                                  ...prev,
                                  [foodKey]: valueString,
                                }))
                              }
                              precision={2}
                              size="sm"
                              w="80px"
                            >
                              <NumberInputField textAlign="center" />
                            </NumberInput>
                            <IconButton
                              icon={<MdAdd />}
                              size="sm"
                              onClick={(e) => { handleFoodAmountChange(foodKey, defaultStep); }}
                            />
                          </HStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </Box>
          ))}
        </VStack>

        <Box>
          <Heading size="lg" mb={4}>Current Meal</Heading>
          <TableContainer>
            <Table variant="simple" minW="400px">
              <Thead>
                <Tr>
                  <Th>Food</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(foodAmountObj).map(([foodKey, foodAmount], idx) => {
                  const name = foodKeyToHumanReadableStr(foodKey);
                  const displayAmount = foodKey in FOOD_UNIT_TO_GRAMS_MAP
                    ? `${foodAmount} ${name}${foodAmount !== 1 ? 's' : ''}`
                    : `${foodAmount} g`;
                  return (
                    <Tr key={`${foodKey}-${idx}`}>
                      <Td>{name}</Td>
                      <Td isNumeric>{displayAmount}</Td>
                      <Td>
                        <IconButton
                          icon={<MdDelete />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleRemoveFood(foodKey)}
                        />
                      </Td>
                    </Tr>
                  );
                })}
                <Tr fontWeight="bold">
                  <Td>Total</Td>
                  <Td isNumeric>{foodAmountTotal} g</Td>
                  <Td />
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box display="flex">
          <Button
            colorScheme="red"
            onClick={reset}
            isDisabled={isFoodAmountObjEmpty}
          >
            Reset
          </Button>
          <Box flex={1} />
          <Button
            colorScheme="green"
            onClick={saveMeal}
            isDisabled={isFoodAmountObjEmpty}
          >
            Save Meal
          </Button>
        </Box>
      </VStack>
      
    </Container>
  );
}
