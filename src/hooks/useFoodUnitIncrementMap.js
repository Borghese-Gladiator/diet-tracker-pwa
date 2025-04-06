// This context holds the default amount to increment per food
//    Track Meal
//      - user increments/decrements by default amount from foodUnitIncrementMap
//      - user edits default amount to increment via modal

import { useState, useEffect } from 'react';
import { FOOD_TO_FOOD_UNIT_MAP } from "@/constants/foods"

function useFoodUnitIncrementMap() {
  const [foodUnitIncrementMap, setFoodUnitIncrementMap] = useState({});

  useEffect(() => {
    // get default food unit increment map onload
    setFoodUnitIncrementMap(
      // structuredClone - https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
      structuredClone(FOOD_TO_FOOD_UNIT_MAP)
    )
  }, []);
  
  return [foodUnitIncrementMap, setFoodUnitIncrementMap]
}

export default useFoodUnitIncrementMap;