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
    defaultStep: 1,
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
    defaultStep: 100,
  },

  'black_beans': {
    // nutrition info
    amount: 100,
    calories: 132,
    fat: 0.5,
    cholesterol: 0,
    sodium: 1,
    sugar: 0.3,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
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
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 100,
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
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
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
    defaultStep: 100,
  },

  'chicken_breast_skinless': {
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
    defaultStep: 100,
  },

  'chipotle_chicken_bowl': {
    // nutrition info
    amount: 100,
    calories: 210,
    fat: 8,
    cholesterol: 50,
    sodium: 400,
    sugar: 1.5,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
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

  'corn': {
    // nutrition info
    amount: 100,
    calories: 86,
    fat: 1.2,
    cholesterol: 0,
    sodium: 15,
    sugar: 6.3,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'cucumber': {
    // nutrition info
    amount: 100,
    calories: 16,
    fat: 0.1,
    cholesterol: 0,
    sodium: 2,
    sugar: 1.7,
    // metadata
    foodType: 'fruit',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
  },

  'fish_cake': {
    // nutrition info
    amount: 100,
    calories: 143,
    fat: 7.5,
    cholesterol: 40,
    sodium: 400,
    sugar: 2,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'fungus': {
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
    defaultStep: 100,
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
    foodType: 'fruit',
    unitType: 'gram',
    defaultStep: 100,
  },

  'grilled_onions_and_peppers': {
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
    defaultStep: 100,
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

  'leafy_green': {
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
    defaultStep: 100,
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
    defaultStep: 100,
  },

  'milk': {
    // nutrition info
    amount: 100,
    calories: 42,
    fat: 1,
    cholesterol: 5,
    sodium: 44,
    sugar: 4.7,
    // metadata
    foodType: 'breakfast',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
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
    defaultStep: 100,
  },

  'oily_tofu': {
    // nutrition info
    amount: 100,
    calories: 120,
    fat: 8,
    cholesterol: 0,
    sodium: 12,
    sugar: 0.6,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
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

  'pico_de_gallo': {
    // nutrition info
    amount: 100,
    calories: 25,
    fat: 0.2,
    cholesterol: 0,
    sodium: 120,
    sugar: 2.5,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'rice_noodle': {
    // nutrition info
    amount: 100,
    calories: 109,
    fat: 0.2,
    cholesterol: 0,
    sodium: 12,
    sugar: 0.1,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'salsa': {
    // nutrition info
    amount: 100,
    calories: 30,
    fat: 0.2,
    cholesterol: 0,
    sodium: 500,
    sugar: 3,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'salsa_verde': {
    // nutrition info
    amount: 100,
    calories: 32,
    fat: 0.3,
    cholesterol: 0,
    sodium: 460,
    sugar: 2,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'seaweed': {
    // nutrition info
    amount: 100,
    calories: 45,
    fat: 0.6,
    cholesterol: 0,
    sodium: 87,
    sugar: 0.5,
    // metadata
    foodType: 'snack',
    unitType: 'gram',
    defaultStep: 100,
  },

  'shredded_cheese': {
    // nutrition info
    amount: 100,
    calories: 402,
    fat: 33,
    cholesterol: 105,
    sodium: 621,
    sugar: 1.3,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'spaghetti': {
    // nutrition info
    amount: 100,
    calories: 158,
    fat: 0.9,
    cholesterol: 0,
    sodium: 1,
    sugar: 0.6,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
  },

  'sunday': {
    // nutrition info
    amount: 100,
    calories: 0,
    fat: 0,
    cholesterol: 0,
    sodium: 0,
    sugar: 0,
    // metadata
    foodType: 'snack',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
  },

  'tofu_extra_firm': {
    // nutrition info
    amount: 100,
    calories: 144,
    fat: 8,
    cholesterol: 0,
    sodium: 10,
    sugar: 0.5,
    // metadata
    foodType: 'lunch_or_dinner',
    unitType: 'gram',
    defaultStep: 100,
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
    defaultStep: 100,
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
    defaultStep: 100,
  }
};

export const FOOD_GROUP_MAP = Object.entries(FOOD_MASTER_MAP).reduce((acc, [foodKey, food]) => {
  acc[food['foodType']] = [...(acc[food['foodType']] || []), {
    key: foodKey,
    defaultStep: food['defaultStep'],
    unitType: food['unitType']
  }];
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
