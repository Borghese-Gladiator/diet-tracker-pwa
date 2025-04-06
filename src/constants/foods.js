/*
- amount
- calories
- cholesterol
- sodium
- sugar
- protein
*/

const FOOD_TO_NUTRITION_WITH_UNIT_MAP = {
  'tofu': { amount: 100, calories: 76, fat: 4.8, cholesterol: 0, sodium: 7, sugar: 0.7 },
  'milk': { amount: 100, calories: 42, fat: 1, cholesterol: 5, sodium: 44, sugar: 4.7 },
  'rice': { amount: 100, calories: 130, fat: 0.3, cholesterol: 0, sodium: 1, sugar: 0 },
  'chicken_breast': { amount: 100, calories: 165, fat: 3.6, cholesterol: 85, sodium: 74, sugar: 0 },
  'zucchini': { amount: 100, calories: 17, fat: 0.3, cholesterol: 0, sodium: 8, sugar: 1.7 },
  'bell_peppers': { amount: 100, calories: 31, fat: 0.3, cholesterol: 0, sodium: 4, sugar: 4.2 },
  'spinach': { amount: 100, calories: 23, fat: 0.4, cholesterol: 0, sodium: 79, sugar: 0.4 },
  'avocado': { amount: 100, calories: 160, fat: 14.7, cholesterol: 0, sodium: 7, sugar: 0.7 },
  'blueberry': { amount: 100, calories: 57, fat: 0.3, cholesterol: 0, sodium: 1, sugar: 9.7 }
};

// FOOD_TO_NUTRITION_MAP maps food to nutrition information per exact amount
export const FOOD_TO_NUTRITION_MAP = Object.entries(FOOD_TO_NUTRITION_WITH_UNIT_MAP).reduce((acc, [foodKey, nutrition]) => {
  // fancy syntax to remove "amount" from nutrition
  const { amount, ...nutritionWithoutAmount } = nutrition;
  acc[foodKey] = nutritionWithoutAmount;
  return acc;
}, {});

// FOOD_TO_FOOD_UNIT_MAP maps food to exact amount (grams)
export const FOOD_TO_FOOD_UNIT_MAP = Object.entries(FOOD_TO_NUTRITION_WITH_UNIT_MAP).reduce((acc, [foodKey, nutrition]) => {
  acc[foodKey] = nutrition['amount'];
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
