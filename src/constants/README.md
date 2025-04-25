OVERALL FLOW
- user clicks Add Food
- user clicks Save Meal
- user views Meal nutrition info


**user clicks Add Food**
- increases/decreases by default increment amount
- if unitType is `unit`, then convert to grams

## Schema
MEAL - list of foods aggregated
```javascript
{
  calories: 100,
  protein: 100,
  carbs: 100,
  fat: 100,
  foodMap: {
    food_name: 100,  // grams,
    tofu: 150,
  }
}
```

FOOD
```javascript
{
  amount: 100, // grams
  calories: 100,
  protein: 100,
  carbs: 100,
  fat: 100,
}
```

FOOD META - enables UI functionality (eg: grouping, customizable increment/decrement)
```javascript
{
  foodType: 'breakfast' | 'lunch/dinner' | 'fruit',
  unitType: 'grams' | 'unit', // 'unit' refers to foods that are measured by counting (eg: bananas, oranges)
  defaultStep: 100, // for avocados, this would be 0.5
}
```
