import { FOOD_TO_NUTRITION_WITH_UNIT_MAP } from './foods';

const REQUIRED_FIELDS = ['calories', 'fat', 'cholesterol', 'sodium', 'sugar'];

describe('FOOD_TO_NUTRITION_WITH_UNIT_MAP', () => {
  it('should contain all required nutrition fields for each food item', () => {
    for (const [food, nutrition] of Object.entries(FOOD_TO_NUTRITION_WITH_UNIT_MAP)) {
      REQUIRED_FIELDS.forEach(field => {
        expect(nutrition).toHaveProperty(field);
        expect(typeof nutrition[field]).toBe('number');
      });
    }
  });
});
