import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useMeals } from '../context/MealContext';
import { useState, useRef } from 'react';

export default function Meals() {
  const { meals, deleteMeal, getDailyTotals } = useMeals();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mealToDelete, setMealToDelete] = useState(null);
  const cancelRef = useRef();

  const formatNumber = (num) => {
    return Number(num).toFixed(2);
  };

  const handleDeleteClick = (index) => {
    setMealToDelete(index);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    deleteMeal(mealToDelete);
    onClose();
  };

  const dailyTotals = getDailyTotals();

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Meal History</Heading>

        <Box>
          <Heading size="md" mb={4}>Today's Summary</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nutrient</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Calories</Td>
                <Td isNumeric>{formatNumber(dailyTotals.calories)}</Td>
              </Tr>
              <Tr>
                <Td>Fat (g)</Td>
                <Td isNumeric>{formatNumber(dailyTotals.fat)}</Td>
              </Tr>
              <Tr>
                <Td>Cholesterol (mg)</Td>
                <Td isNumeric>{formatNumber(dailyTotals.cholesterol)}</Td>
              </Tr>
              <Tr>
                <Td>Sodium (mg)</Td>
                <Td isNumeric>{formatNumber(dailyTotals.sodium)}</Td>
              </Tr>
              <Tr>
                <Td>Sugar (g)</Td>
                <Td isNumeric>{formatNumber(dailyTotals.sugar)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading size="md" mb={4}>All Meals</Heading>
          {meals.length === 0 ? (
            <Text>No meals recorded yet.</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Time</Th>
                  <Th>Foods</Th>
                  <Th isNumeric>Calories</Th>
                  <Th isNumeric>Fat (g)</Th>
                  <Th isNumeric>Cholesterol (mg)</Th>
                  <Th isNumeric>Sodium (mg)</Th>
                  <Th isNumeric>Sugar (g)</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {meals.map((meal, index) => {
                  const mealTotals = meal.foods.reduce((acc, food) => ({
                    calories: acc.calories + food.calories,
                    fat: acc.fat + food.fat,
                    cholesterol: acc.cholesterol + food.cholesterol,
                    sodium: acc.sodium + food.sodium,
                    sugar: acc.sugar + food.sugar,
                  }), { calories: 0, fat: 0, cholesterol: 0, sodium: 0, sugar: 0 });

                  return (
                    <Tr key={index}>
                      <Td>{new Date(meal.timestamp).toLocaleString()}</Td>
                      <Td>{meal.foods.map(f => f.name).join(', ')}</Td>
                      <Td isNumeric>{formatNumber(mealTotals.calories)}</Td>
                      <Td isNumeric>{formatNumber(mealTotals.fat)}</Td>
                      <Td isNumeric>{formatNumber(mealTotals.cholesterol)}</Td>
                      <Td isNumeric>{formatNumber(mealTotals.sodium)}</Td>
                      <Td isNumeric>{formatNumber(mealTotals.sugar)}</Td>
                      <Td>
                        <IconButton
                          icon={<MdDelete />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(index)}
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Meal
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this meal? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Container>
  );
} 