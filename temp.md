SCHEMA

- food nutrition map pre retrieved via manual script 
- food display with internal amounts which can be used to calculate nutrition 

```javascript
FOOD_NUTRITION_MAP = {
  'food_name': {
    'amount': 100,
    'calories': 100,
    'protein': 100,
    'carbs': 100,
    'fat': 100
  }
}

FOOD_TO_NUTRITION_MAP = {
  'food_name': {
    'calories': 100,
    'protein': 100,
    'carbs': 100,
    'fat': 100
  }
}

FOOD_TO_FOOD_UNIT_MAP = {
  'food_name': 100
}

```

- user clicks Add Food
  - food increases by 100g OR 1 unit (eg: 1 banana)
    - q
- user clicks Save Meal
  - food 
  

USER FLOW
- user adds food to meal
- user save meal to meal list

PROGRAM FLOW
- build food nutrition map (USDA FoodData Central API)
- build food display map - show user 
  - eg: banana - get individual
- 
- build default food display map - show user default types of food


/*
- amount
- calories
- cholesterol
- sodium
- sugar
- protein


PRE BREAKFAST
Black Fungus Soup

BREAKFAST
Oatmeal
Milk
1/2 avocado

LUNCH
chicken breast
grilled onions and peppers

DINNER
rice noodle
carrot
fish cakes

*/

```jsx
<IconButton
  aria-label="Reset"
  icon={<FaUndo />}
  colorScheme="red"
  onClick={reset}
  isDisabled={isFoodAmountObjEmpty}
  size="lg"
  rounded="full"
  shadow="lg"
/>
<IconButton
  aria-label="Save Meal"
  icon={<FaCheck />}
  bg="#1976d2" // Material UI primary color
  color="white"
  _hover={{ bg: '#1565c0' }}
  onClick={saveMeal}
  isDisabled={isFoodAmountObjEmpty}
  size="lg" 
  rounded="full"
  shadow="lg"
/>
```