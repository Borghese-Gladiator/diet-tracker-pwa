/*
- amount
- calories
- cholesterol
- sodium
- sugar
- protein
*/

const FOOD_TO_NUTRITION_WITH_UNIT_MAP = {
  'avocado': { amount: 100, calories: 160, fat: 14.7, cholesterol: 0, sodium: 7, sugar: 0.7 },
  'banana': { amount: 100, calories: 89, fat: 0.3, cholesterol: 0, sodium: 1, sugar: 12.2 },
  'bibigo_mini_wontons': { amount: 100, calories: 220, fat: 9, cholesterol: 35, sodium: 470, sugar: 1 },
  'black_beans': { amount: 100, calories: 132, fat: 0.5, cholesterol: 0, sodium: 1, sugar: 0.3 },
  'black_fungus': { amount: 100, calories: 25, fat: 0.1, cholesterol: 0, sodium: 5, sugar: 0 },
  'black_sesame': { amount: 100, calories: 565, fat: 48, cholesterol: 0, sodium: 11, sugar: 0.3 },
  'blueberry': { amount: 100, calories: 57, fat: 0.3, cholesterol: 0, sodium: 1, sugar: 9.7 },
  'bread': { amount: 100, calories: 265, fat: 3.2, cholesterol: 0, sodium: 491, sugar: 5 },
  'brown_rice': { amount: 100, calories: 111, fat: 0.9, cholesterol: 0, sodium: 5, sugar: 0.4 },
  'cali_b_chicken_bowl': { amount: 100, calories: 185, fat: 6, cholesterol: 40, sodium: 300, sugar: 2 },
  'cara_cara_orange': { amount: 100, calories: 50, fat: 0.1, cholesterol: 0, sodium: 1, sugar: 9 },
  'chicken_breast': { amount: 100, calories: 165, fat: 3.6, cholesterol: 85, sodium: 74, sugar: 0 },
  'chicken_breast_skinless': { amount: 100, calories: 165, fat: 3.6, cholesterol: 85, sodium: 74, sugar: 0 },
  'chipotle_chicken_bowl': { amount: 100, calories: 210, fat: 8, cholesterol: 50, sodium: 400, sugar: 1.5 },
  'clementines': { amount: 100, calories: 47, fat: 0.1, cholesterol: 0, sodium: 1, sugar: 9 },
  'corn': { amount: 100, calories: 86, fat: 1.2, cholesterol: 0, sodium: 15, sugar: 6.3 },
  'cucumber': { amount: 100, calories: 16, fat: 0.1, cholesterol: 0, sodium: 2, sugar: 1.7 },
  'edamame': { amount: 100, calories: 121, fat: 5.2, cholesterol: 0, sodium: 6, sugar: 2.2 },
  'fish_cake': { amount: 100, calories: 143, fat: 7.5, cholesterol: 40, sodium: 400, sugar: 2 },
  'fungus': { amount: 100, calories: 25, fat: 0.1, cholesterol: 0, sodium: 5, sugar: 0 },
  'grapes': { amount: 100, calories: 69, fat: 0.2, cholesterol: 0, sodium: 2, sugar: 15 },
  'grilled_onions_and_peppers': { amount: 100, calories: 45, fat: 1.5, cholesterol: 0, sodium: 12, sugar: 4 },
  'kirkland_chewy_protein_bar': { amount: 100, calories: 350, fat: 12, cholesterol: 5, sodium: 250, sugar: 4 },
  'leafy_green': { amount: 100, calories: 20, fat: 0.2, cholesterol: 0, sodium: 50, sugar: 0.8 },
  'lettuce': { amount: 100, calories: 15, fat: 0.2, cholesterol: 0, sodium: 28, sugar: 0.8 },
  'milk': { amount: 100, calories: 42, fat: 1, cholesterol: 5, sodium: 44, sugar: 4.7 },
  'mushroom': { amount: 100, calories: 22, fat: 0.3, cholesterol: 0, sodium: 5, sugar: 2.1 },
  'oatmeal': { amount: 100, calories: 68, fat: 1.4, cholesterol: 0, sodium: 49, sugar: 0 },
  'oily_tofu': { amount: 100, calories: 120, fat: 8, cholesterol: 0, sodium: 12, sugar: 0.6 },
  'pear': { amount: 100, calories: 57, fat: 0.1, cholesterol: 0, sodium: 1, sugar: 9.8 },
  'pico_de_gallo': { amount: 100, calories: 25, fat: 0.2, cholesterol: 0, sodium: 120, sugar: 2.5 },
  'rice_noodle': { amount: 100, calories: 109, fat: 0.2, cholesterol: 0, sodium: 12, sugar: 0.1 },
  'salsa': { amount: 100, calories: 30, fat: 0.2, cholesterol: 0, sodium: 500, sugar: 3 },
  'salsa_verde': { amount: 100, calories: 32, fat: 0.3, cholesterol: 0, sodium: 460, sugar: 2 },
  'seaweed': { amount: 100, calories: 45, fat: 0.6, cholesterol: 0, sodium: 87, sugar: 0.5 },
  'shredded_cheese': { amount: 100, calories: 402, fat: 33, cholesterol: 105, sodium: 621, sugar: 1.3 },
  'spaghetti': { amount: 100, calories: 158, fat: 0.9, cholesterol: 0, sodium: 1, sugar: 0.6 },
  'sunday': { amount: 100, calories: 0, fat: 0, cholesterol: 0, sodium: 0, sugar: 0 },
  'tofu': { amount: 100, calories: 76, fat: 4.8, cholesterol: 0, sodium: 7, sugar: 0.7 },
  'tofu_extra_firm': { amount: 100, calories: 144, fat: 8, cholesterol: 0, sodium: 10, sugar: 0.5 },
  'white_rice': { amount: 100, calories: 130, fat: 0.3, cholesterol: 0, sodium: 1, sugar: 0 },
  '火鍋米粉': { amount: 100, calories: 110, fat: 0.2, cholesterol: 0, sodium: 10, sugar: 0 } // Hotpot rice noodles
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
