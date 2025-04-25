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
  useToast,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { useMealList } from '@/context/MealListContext';
import { foodKeyToHumanReadableStr } from '@/constants/foods';
import { formatTimestamp, formatNumber } from "@/utils";


export default function Meals() {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  //=====================
  //  STATE
  //=====================
  const { mealList, dispatchMealList, } = useMealList();
  const handleDuplicateClick = (id) => {
    dispatchMealList({ type: 'duplicate', id });

    toast({
      title: 'Duplicated',
      description: 'Meal duplicated successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
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
            <VStack spacing={4} align="stretch">
              {mealList.map((meal, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="sm"
                  bg="white"
                >
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    {formatTimestamp(meal.timestamp)}
                  </Text>
                  <Text fontWeight="bold" mb={1}>
                    Foods:
                  </Text>
                  <Text mb={2}>
                    {Object.keys(meal.foodAmountObj)
                      .map(foodKeyToHumanReadableStr)
                      .join(', ')}
                  </Text>

                  <Box display="flex" flexWrap="wrap" gap={4} fontSize="sm" mb={3}>
                    <Text>Calories: {formatNumber(meal.calories)}</Text>
                    <Text>Fat: {formatNumber(meal.fat)}g</Text>
                    <Text>Cholesterol: {formatNumber(meal.cholesterol)}mg</Text>
                    <Text>Sodium: {formatNumber(meal.sodium)}mg</Text>
                    <Text>Sugar: {formatNumber(meal.sugar)}g</Text>
                  </Box>

                  <Box display="flex" gap={2}>
                    <IconButton
                      icon={<MdDelete />}
                      size="sm"
                      colorScheme="red"
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(meal.id)}
                    />
                    <IconButton
                      icon={<HiOutlineDocumentDuplicate />}
                      size="sm"
                      colorScheme="blue"
                      aria-label="Duplicate"
                      onClick={() => handleDuplicateClick(meal.id)}
                    />
                  </Box>
                </Box>
              ))}
            </VStack>
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