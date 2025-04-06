
const fs = require('fs');
const path = require('path');

//=======================
//  CONSTANTS
//=======================
const filePath = path.join(__dirname, 'food_log.txt');
const input = fs.readFileSync(filePath, 'utf-8');

//=======================
//  MAIN
//=======================
const uniqueFoods = new Set();

// Normalize and split input by lines
input.split('\n').forEach(line => {
  // Clean line
  const cleanLine = line
    .trim()
    .replace(/\d+[:.]\d+/, '') // remove timestamps like 12:36
    .replace(/^\d+\/\d+/, '')  // remove dates like 3/29
    .replace(/\d+g|\d+\s?(slice|slices|piece|pieces|oz|ts|Ts|mg|bowl|bowls|big bowl|\/\d+\s*bowl)?/gi, '') // remove quantities/units
    .replace(/\b\d+\/\d+\s*(ts|Ts)?\b/g, '') // remove fractions like 1/4 ts
    .replace(/\d+\s*(ts|Ts|mg|g|oz|slice|piece|bowl)?/gi, '') // cleanup stray units
    .replace(/^[^a-zA-Z\u4e00-\u9fa5]+/, '') // remove leading non-letter characters

  // Split line by commas and process each food entry
  cleanLine.split(',').forEach(food => {
    const f = food.trim();
    if (f && !/^\d+$/.test(f) && !/salt|sodium|sugar|sauce|bouillon|seasoning/i.test(f)) {
      uniqueFoods.add(f.toLowerCase());
    }
  });
});

console.log([...uniqueFoods].sort());
