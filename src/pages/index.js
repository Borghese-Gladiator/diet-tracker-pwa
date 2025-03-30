import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { MdDelete, MdAdd, MdRemove } from 'react-icons/md';
import { useMeals } from '@/context/MealContext';
import { predefinedFoods } from '@/data/foods';

export default function Home() {
  const { currentMeal, addFood, removeFood, saveMeal, resetCurrentMeal } = useMeals();
  const [foodAmounts, setFoodAmounts] = useState(
    predefinedFoods.reduce((acc, food) => ({ ...acc, [food.name]: 0 }), {})
  );
  const [highlighted, setHighlighted] = useState({});
  const toast = useToast();

  const handleAmountChange = (foodName, value) => {
    setFoodAmounts(prev => {
      const newAmount = Math.max(0, Math.min(1000, prev[foodName] + value));
      if (newAmount === prev[foodName]) return prev;
      return { ...prev, [foodName]: newAmount };
    });

    setHighlighted({ [foodName]: value > 0 ? 'green.100' : 'red.100' });
    setTimeout(() => setHighlighted({}), 200);

    // Find the food in current meal and update or add it
    const foodIndex = currentMeal.foods.findIndex(food => food.name === foodName);
    const food = predefinedFoods.find(f => f.name === foodName);
    
    if (value === 0) {
      if (foodIndex !== -1) {
        removeFood(foodIndex);
      }
      return;
    }

    const scaledFood = {
      name: food.name,
      calories: Math.round(food.calories * (value / 100)),
      fat: Number((food.fat * (value / 100)).toFixed(1)),
      cholesterol: Math.round(food.cholesterol * (value / 100)),
      sodium: Math.round(food.sodium * (value / 100)),
      sugar: Number((food.sugar * (value / 100)).toFixed(1)),
    };

    if (foodIndex === -1) {
      addFood(scaledFood);
    } else {
      removeFood(foodIndex);
      addFood(scaledFood);
    }
  };

  const handleSubtract = (foodName) => {
    setActiveCard({ name: foodName, type: 'subtract' });
    handleAmountChange(foodName, Math.max(0, foodAmounts[foodName] - 100));
    setTimeout(() => setActiveCard(null), 200);
  };

  const handleAdd = (foodName) => {
    setActiveCard({ name: foodName, type: 'add' });
    handleAmountChange(foodName, Math.min(1000, foodAmounts[foodName] + 100));
    setTimeout(() => setActiveCard(null), 200);
  };

  const handleSave = () => {
    if (currentMeal.foods.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one food item',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    saveMeal();
    toast({
      title: 'Success',
      description: 'Meal saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const totalNutrition = currentMeal.foods.reduce((acc, food) => ({
    calories: acc.calories + food.calories,
    fat: acc.fat + food.fat,
    cholesterol: acc.cholesterol + food.cholesterol,
    sodium: acc.sodium + food.sodium,
    sugar: acc.sugar + food.sugar,
  }), { calories: 0, fat: 0, cholesterol: 0, sodium: 0, sugar: 0 });

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Track Your Meal</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {predefinedFoods.map(({ name }) => (
            <Card
              key={name}
              cursor="pointer"
              bg={highlighted[name] || 'white'}
              onClick={() => handleAmountChange(name, 100)}
              transition="background 0.2s"
            >
              <CardBody>
                <HStack justify="space-between">
                  <Heading size="md">{name}</Heading>
                  <HStack>
                    <IconButton
                      icon={<MdRemove />}
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleAmountChange(name, -100); }}
                    />
                    <NumberInput value={foodAmounts[name]} isReadOnly size="sm" w="80px">
                      <NumberInputField textAlign="center" />
                    </NumberInput>
                    <IconButton
                      icon={<MdAdd />}
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleAmountChange(name, 100); }}
                    />
                  </HStack>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Box>
          <Heading size="md" mb={4}>Current Meal</Heading>
          <Box overflowX="auto">
            <Table variant="simple" minW="400px">
              <Thead>
                <Tr>
                  <Th>Food</Th>
                  <Th isNumeric>Amount (g)</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentMeal.foods.map((food, index) => (
                  <Tr key={index}>
                    <Td>{food.name}</Td>
                    <Td isNumeric>{foodAmounts[food.name]}</Td>
                    <Td>
                      <IconButton
                        icon={<MdDelete />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => {
                          removeFood(index);
                          setFoodAmounts(prev => ({ ...prev, [food.name]: 0 }));
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
                <Tr fontWeight="bold">
                  <Td>Total</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + foodAmounts[food.name], 0)}</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + food.calories, 0)}</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + food.fat, 0)}</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + food.cholesterol, 0)}</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + food.sodium, 0)}</Td>
                  <Td isNumeric>{currentMeal.foods.reduce((sum, food) => sum + food.sugar, 0)}</Td>
                  <Td />
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Box display="flex" gap={8}>
          <Button
            colorScheme="red"
            onClick={() => {
              resetCurrentMeal();
              setFoodAmounts(predefinedFoods.reduce((acc, food) => ({ ...acc, [food.name]: 0 }), {}));
            }}
            isDisabled={currentMeal.foods.length === 0}
          >
            Reset
          </Button>
          <Box flex={1} />
          <Button
            colorScheme="green"
            onClick={handleSave}
            isDisabled={currentMeal.foods.length === 0}
          >
            Save Meal
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}
