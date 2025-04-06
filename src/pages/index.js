import { useState } from 'react';

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
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { MdAdd, MdDelete, MdRemove } from 'react-icons/md';

import {
  FOOD_TO_FOOD_UNIT_MAP,
  FOOD_TO_NUTRITION_MAP,
  foodKeyToHumanReadableStr,
} from '@/constants/foods';
import { useMealList } from '@/context/MealListContext';
import useFoodUnitIncrementMap from '@/hooks/useFoodUnitIncrementMap';
import { mergeObj } from '@/utils';


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

  // foodAmountObj - foodKey to amount of food in grams
  const [foodAmountObj, setFoodAmountObj] = useState({});
  const isFoodAmountObjEmpty = Object.keys(foodAmountObj).length === 0
  const handleFoodAmountChange = (foodKey, amount) => {
    // CSS background
    setHighlighted({ [foodKey]: amount > 0 ? 'green.100' : 'red.100' });
    setTimeout(() => setHighlighted({}), 300);

    // foodKey is unique food name string
    // amount is grams
    setFoodAmountObj((prevState) => {
      const currentAmount = prevState[foodKey] ?? 0;
      const newAmount = Math.max(currentAmount + amount, 0);
      return {
        ...prevState,
        [foodKey]: newAmount
      };
    });
  };
  const handleRemoveFood = (foodKey) => {
    setFoodAmountObj((foodAmountObj) => {
      // fancy syntax to remove "[foodKey]" from foodAmountObj
      const { [foodKey]: _, ...rest } = foodAmountObj;
      return rest;
    });
  };

  function reset() {
    setFoodAmountObj({});
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
        const currFoodNutrition = Object.entries(FOOD_TO_NUTRITION_MAP[foodKey]).reduce(
          (acc, [nutritionKey, nutritionPerUnitAmount]) => {
            acc[nutritionKey] = foodAmount * nutritionPerUnitAmount / FOOD_TO_FOOD_UNIT_MAP[foodKey]
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

  //=====================
  //  MAIN
  //=====================
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {Object.keys(FOOD_TO_NUTRITION_MAP).map((foodKey) => {
            const name = foodKeyToHumanReadableStr(foodKey);
            return (
              <Card
                key={foodKey}
                bg={highlighted[foodKey] || 'white'}
                transition="background 0.2s"
              >
                <CardBody>
                  <HStack justify="space-between">
                    <Heading size="md">{name}</Heading>
                    <HStack>
                      <IconButton
                        icon={<MdRemove />}
                        size="sm"
                        onClick={(e) => { handleFoodAmountChange(foodKey, -foodUnitIncrementMap[foodKey]); }}
                      />
                      <NumberInput
                        value={foodAmountObj[foodKey] ?? 0}
                        onChange={(valueString) =>
                          setFoodAmountObj((prev) => ({
                            ...prev,
                            [foodKey]: Number(valueString),
                          }))
                        }
                        size="sm"
                        w="80px"
                      >
                        <NumberInputField textAlign="center" />
                      </NumberInput>
                      <IconButton
                        icon={<MdAdd />}
                        size="sm"
                        onClick={(e) => { handleFoodAmountChange(foodKey, foodUnitIncrementMap[foodKey]); }}
                      />
                    </HStack>
                  </HStack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>

        <Box>
          <Heading size="lg" mb={4}>Current Meal</Heading>
          <TableContainer>
            <Table variant="simple" minW="400px">
              <Thead>
                <Tr>
                  <Th>Food</Th>
                  <Th>Amount (g)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(foodAmountObj).map(([foodKey, foodAmount], idx) => {
                  const name = foodKeyToHumanReadableStr(foodKey);
                  return (
                    <Tr key={`${foodKey}-${idx}`}>
                      <Td>{name}</Td>
                      <Td isNumeric>{foodAmount} (g)</Td>
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
                  <Td isNumeric>{Object.values(foodAmountObj).reduce((acc, foodAmount) => acc + foodAmount, 0)}</Td>
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
