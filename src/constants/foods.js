/*
LOGIC is to have a master list of foods with ALL information needed for display and nutrition
*/

const FOOD_MASTER_MAP = {
  'avocado': {
    // nutrition info
    amount: 100,
    calories: 160,
    fat: 14.7,
    cholesterol: 0,
    sodium: 7,
    sugar: 0.7,
    // metadata
    foodType: 'breakfast',
    defaultStep: 0.5,
    unitType: 'unit',
    unitToGrams: 175
  },

  'banana': {
    // nutrition info
    amount: 100,
    calories: 89,
    fat: 0.3,
    cholesterol: 0,
    sodium: 1,
    sugar: 12.2,
    // metadata
    foodType: 'breakfast',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'wheat_bread': {
    // nutrition info
    amount: 100,
    calories: 247,
    fat: 3.3,
    cholesterol: 0, 
    sodium: 450,
    sugar: 3.5,
    // metadata
    foodType: 'snack',
    unitType: 'gram',
    defaultStep: 20,
  },

  'cereal': {
    // nutrition info
    amount: 100,
    calories: 100,
    fat: 0.5,
    cholesterol: 0, 
    sodium: 100,
    sugar: 10,
    // metadata
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 20,
  },

  'cara_cara_orange': {
    // nutrition info
    amount: 100,
    calories: 50,
    fat: 0.1,
    cholesterol: 0,
    sodium: 1,
    sugar: 9,
    // metadata
    foodType: 'fruit',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'chicken_breast': {
    // nutrition info
    amount: 100,
    calories: 165,
    fat: 3.6,
    cholesterol: 85,
    sodium: 74,
    sugar: 0,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  // https://www.chipotle.com/nutrition-calculator/burrito-bowl
  // 1 burrito bowl
  // calories 760
  // fat 24g
  // protein 54g
  // carbs 85g
  // fiber 15g
  // sugar 9g
  // sodium 1930mg

  // chicken
  // brown rice
  // black beans
  // fresh tomato salsa
  // roasted chili corn salsa
  // fajita veggies
  // cheese
  // romaine lettuce

  'chipotle_chicken_bowl': {
    // nutrition info
    amount: 1,
    calories: 760,
    fat: 24,
    cholesterol: 0,
    sodium: 1930,
    sugar: 9,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'unit',
    defaultStep: 0.5,
    unitToGrams: 1  // 1 burrito bowl - nutrition fact assumes 1 burrito bowl instead of 100 grams
  },

  'clementines': {
    // nutrition info
    amount: 100,
    calories: 47,
    fat: 0.1,
    cholesterol: 0,
    sodium: 1,
    sugar: 9,
    // metadata
    foodType: 'fruit',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'edamame': {
    // nutrition info
    amount: 100,
    calories: 121,
    fat: 5.2,
    cholesterol: 0,
    sodium: 6,
    sugar: 2.2,
    // metadata
    foodType: 'snack',
    unitType: 'gram',
    defaultStep: 20,
  },
  
  'grapes': {
    // nutrition info
    amount: 100,
    calories: 69,
    fat: 0.2,
    cholesterol: 0,
    sodium: 2,
    sugar: 15,
    // metadata
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 20,
  },

  'blueberry': {
    // nutrition info
    amount: 100,
    calories: 57,
    fat: 0.3,
    cholesterol: 0,
    sodium: 1,
    sugar: 10,
    // metadata
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 20,
  },

  'onions_and_peppers': {
    // nutrition info
    amount: 100,
    calories: 45,
    fat: 1.5,
    cholesterol: 0,
    sodium: 12,
    sugar: 4,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'kirkland_chewy_protein_bar': {
    // nutrition info
    amount: 100,
    calories: 350,
    fat: 12,
    cholesterol: 5,
    sodium: 250,
    sugar: 4,
    // metadata
    foodType: 'snack',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'bok_choy': {
    // nutrition info
    amount: 100,
    calories: 20,
    fat: 0.2,
    cholesterol: 0,
    sodium: 50,
    sugar: 0.8,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'lettuce': {
    // nutrition info
    amount: 100,
    calories: 15,
    fat: 0.2,
    cholesterol: 0,
    sodium: 28,
    sugar: 0.8,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'milk_cup': {
    // nutrition info
    amount: 100,
    calories: 42,
    fat: 1,
    cholesterol: 5,
    sodium: 44,
    sugar: 4.7,
    // metadata
    foodType: 'breakfast',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'mushroom': {
    // nutrition info
    amount: 100,
    calories: 22,
    fat: 0.3,
    cholesterol: 0,
    sodium: 5,
    sugar: 2.1,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'oatmeal': {
    // nutrition info
    amount: 100,
    calories: 68,
    fat: 1.4,
    cholesterol: 0,
    sodium: 49,
    sugar: 0,
    // metadata
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 20,
  },

  'pear': {
    // nutrition info
    amount: 100,
    calories: 57,
    fat: 0.1,
    cholesterol: 0,
    sodium: 1,
    sugar: 9.8,
    // metadata
    foodType: 'fruit',
    unitType: 'unit',
    defaultStep: 1,
    unitToGrams: 175
  },

  'tofu': {
    // nutrition info
    amount: 100,
    calories: 76,
    fat: 4.8,
    cholesterol: 0,
    sodium: 7,
    sugar: 0.7,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'white_rice': {
    // nutrition info
    amount: 100,
    calories: 130,
    fat: 0.3,
    cholesterol: 0,
    sodium: 1,
    sugar: 0,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 50,
  },

  'white_rice': {
    // nutrition info
    amount: 100,
    calories: 130,
    fat: 0.3,
    cholesterol: 0,
    sodium: 1,
    sugar: 0,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  '火鍋米粉': { // Hotpot rice noodles
    // nutrition info
    amount: 100,
    calories: 110,
    fat: 0.2,
    cholesterol: 0,
    sodium: 10,
    sugar: 0,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  }
  
  /*
  ARCHIVED FOODS

  'bibigo_mini_wontons': {
    // nutrition info
    amount: 100,
    calories: 220,
    fat: 9,
    cholesterol: 35,
    sodium: 470,
    sugar: 1,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'black_fungus': {
    // nutrition info
    amount: 100,
    calories: 25,
    fat: 0.1,
    cholesterol: 0,
    sodium: 5,
    sugar: 0,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'cali_b_chicken_bowl': {
    // nutrition info
    amount: 100,
    calories: 185,
    fat: 6,
    cholesterol: 40,
    sodium: 300,
    sugar: 2,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },

  'brown_rice': {
    // nutrition info
    amount: 100,
    calories: 111,
    fat: 0.9,
    cholesterol: 0,
    sodium: 5,
    sugar: 0.4,
    // metadata
    foodType: ' _or_dinner',
    unitType: 'gram',
    defaultStep: 20,
  },
  */
};

export const FOOD_GROUP_MAP = Object.entries(FOOD_MASTER_MAP).reduce((acc, [foodKey, food]) => {
  acc[food['foodType']] = [...(acc[food['foodType']] || []), {
    key: foodKey,
    defaultStep: food['defaultStep'],
    unitType: food['unitType']
  }].sort((a, b) => a.key.localeCompare(b.key));
  return acc;
}, {});

// FOOD_TO_NUTRITION_MAP maps food to nutrition information per exact amount
export const FOOD_TO_NUTRITION_MAP = Object.entries(FOOD_MASTER_MAP).reduce((acc, [foodKey, nutrition]) => {
  // fancy syntax to remove "amount" from nutrition
  const { amount, calories, fat, cholesterol, sodium, sugar, } = nutrition;
  acc[foodKey] = { amount, calories, fat, cholesterol, sodium, sugar };
  return acc;
}, {});

export const FOOD_UNIT_TO_GRAMS_MAP = Object.entries(FOOD_MASTER_MAP).reduce((acc, [foodKey, foodInfo]) => {
  if (foodInfo['unitType'] !== 'unit') {
    return acc;
  }
  acc[foodKey] = foodInfo['unitToGrams'];
  return acc;
}, {});

export const foodKeyToHumanReadableStr = (snakeStr) => {
  // Converts "snake_case" to "Title Case"
  //    NOTE: I chose to use snake_case keys since it's more readable for me
  return snakeStr
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
