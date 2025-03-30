import { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Box,
  List,
  ListItem,
  Text,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { MdMoreVert, MdEdit } from 'react-icons/md';
import { predefinedFoods as initialFoods } from '@/data/foods';

export default function Foods() {
  const [foods, setFoods] = useState(initialFoods);
  const [editingFood, setEditingFood] = useState(null);
  const toast = useToast();

  const handleNutritionChange = (foodName, field, value) => {
    setFoods(prevFoods => 
      prevFoods.map(food => 
        food.name === foodName 
          ? { ...food, [field]: Number(value) }
          : food
      )
    );
  };

  const handleSave = () => {
    setEditingFood(null);
    toast({
      title: 'Success',
      description: 'Food information updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Nutrition Info</Heading>
        
        <VStack spacing={6} align="stretch">
          {foods.map((food) => (
            <Card key={food.name}>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Heading size="md">{food.name}</Heading>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<MdMoreVert />}
                      variant="ghost"
                    />
                    <MenuList>
                      <MenuItem icon={<MdEdit />} onClick={() => setEditingFood(food)}>
                        Edit
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>

                {editingFood?.name === food.name ? (
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text>Calories:</Text>
                      <NumberInput
                        value={food.calories}
                        onChange={(value) => handleNutritionChange(food.name, 'calories', value)}
                        min={0}
                        max={1000}
                        w="150px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Fat (g):</Text>
                      <NumberInput
                        value={food.fat}
                        onChange={(value) => handleNutritionChange(food.name, 'fat', value)}
                        min={0}
                        max={100}
                        w="150px"
                        step={0.1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Cholesterol (mg):</Text>
                      <NumberInput
                        value={food.cholesterol}
                        onChange={(value) => handleNutritionChange(food.name, 'cholesterol', value)}
                        min={0}
                        max={500}
                        w="150px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Sodium (mg):</Text>
                      <NumberInput
                        value={food.sodium}
                        onChange={(value) => handleNutritionChange(food.name, 'sodium', value)}
                        min={0}
                        max={5000}
                        w="150px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Sugar (g):</Text>
                      <NumberInput
                        value={food.sugar}
                        onChange={(value) => handleNutritionChange(food.name, 'sugar', value)}
                        min={0}
                        max={100}
                        w="150px"
                        step={0.1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </HStack>
                    <HStack justify="flex-end" mt={4}>
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        onClick={() => setEditingFood(null)}
                        mr={4}
                      >
                        Cancel
                      </Text>
                      <Text
                        color="green.500"
                        cursor="pointer"
                        onClick={handleSave}
                      >
                        Save
                      </Text>
                    </HStack>
                  </VStack>
                ) : (
                  <List spacing={2}>
                    <ListItem>Calories: {food.calories}</ListItem>
                    <ListItem>Fat: {food.fat}g</ListItem>
                    <ListItem>Cholesterol: {food.cholesterol}mg</ListItem>
                    <ListItem>Sodium: {food.sodium}mg</ListItem>
                    <ListItem>Sugar: {food.sugar}g</ListItem>
                  </List>
                )}
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
} 