import { useEffect, useState, useRef } from 'react';

import {
  Box,
  Container,
  Heading,
  Table,
  TableContainer,
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
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { useMealList } from '@/context/MealListContext';
import { foodKeyToHumanReadableStr } from '@/constants/foods';
import { formatTimestamp, formatNumber } from "@/utils";


export default function Meals() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  //=====================
  //  STATE
  //=====================
  const { mealList, dispatchMealList, } = useMealList();
  const handleDuplicateClick = (id) => {
    dispatchMealList({ type: 'duplicate', id });
  };

  const [mealIdToDelete, setMealIdToDelete] = useState(null);
  const handleDeleteClick = (id) => {
    setMealIdToDelete(id);
    onOpen();
  };
  const handleDeleteConfirm = () => {
    dispatchMealList({
      'type': 'delete',
      id: mealIdToDelete,
    });
    setMealIdToDelete(null);
    onClose();
  };

  const defaultDailyTotals = { calories: 0, fat: 0, cholesterol: 0, sodium: 0, sugar: 0 };
  const [dailyTotals, setDailyTotals] = useState(defaultDailyTotals);
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = mealList.filter(meal => {
      const mealDate = typeof meal.timestamp === 'string' 
        ? meal.timestamp.split('T')[0]
        : meal.timestamp.toISOString().split('T')[0];
      return mealDate === today;
    });

    setDailyTotals(
      todayMeals.reduce((acc, meal) => {
        acc.calories += meal.calories;
        acc.fat += meal.fat;
        acc.cholesterol += meal.cholesterol;
        acc.sodium += meal.sodium;
        acc.sugar += meal.sugar;
        return acc;
      }, defaultDailyTotals)
    )
  }, [])

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
          {mealList.length === 0 ? (
            <Text>No meals recorded yet.</Text>
          ) : (
            <TableContainer>
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
                  {mealList.map((meal, index) => (
                    <Tr key={index}>
                      <Td style={{ whiteSpace: "nowrap" }}>{formatTimestamp(meal.timestamp)}</Td>
                      <Td>{Object.keys(meal.foodAmountObj).map((foodKey) => foodKeyToHumanReadableStr(foodKey)).join(', ')}</Td>
                      <Td isNumeric>{formatNumber(meal.calories)}</Td>
                      <Td isNumeric>{formatNumber(meal.fat)}</Td>
                      <Td isNumeric>{formatNumber(meal.cholesterol)}</Td>
                      <Td isNumeric>{formatNumber(meal.sodium)}</Td>
                      <Td isNumeric>{formatNumber(meal.sugar)}</Td>
                      <Td>
                        <Box display="flex">
                          <IconButton
                            icon={<MdDelete />}
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleDeleteClick(meal.id)}
                          />
                          <IconButton
                            icon={<HiOutlineDocumentDuplicate />}
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleDuplicateClick(meal.id)}
                          />
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
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