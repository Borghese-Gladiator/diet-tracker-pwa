// This context holds the current list of meals
//    Track Meal - dispatches "create" meal
//    Meal History - loads meal list + delete meal
//    Graph - loads daily totals using meal list

import { createContext, useContext, useReducer, useEffect } from 'react';

const MealListContext = createContext();

function reducerMealList(state, action) {
  switch (action.type) {
    case 'create': {
      const meal = {
        id: Date.now().toString(),  // local optimistic ID, NOT used server-side
        timestamp: new Date(),
        // action properties
        foodAmountObj: action.foodAmountObj,
        calories: action.calories,
        fat: action.fat,
        cholesterol: action.cholesterol,
        sodium: action.sodium,
        sugar: action.sugar, 
      }
      // TODO: call `/create` endpoint - here OR other func?
      return [
        ...state,
        meal
      ]
    }
    case 'duplicate': {
      const meal = structuredClone(state.filter((meal) => meal.id === action.id)[0]);
      // TODO: call `/create` endpoint - here OR other func?
      return [
        ...state,
        {
          ...meal,
          id: Date.now().toString(),  // local optimistic ID, NOT used server-side
          timestamp: new Date(),
        }
      ]
    }
    case 'delete': {
      // TODO: call `/delete` endpoint - here OR other func?
      return state.filter((meal) => meal.id !== action.id)
    }
    case 'override': {
      return action.mealList
    }
  }
  console.error('Unknown action: ' + action.type)
  throw Error('Unknown action: ' + action.type);
}

export function MealListProvider({ children }) {
  const [mealList, dispatchMealList] = useReducer(reducerMealList, []);
  
  // Load meals from localStorage on initial render
  useEffect(() => {
    const savedMeals = localStorage.getItem('mealList');
    if (savedMeals) {
      dispatchMealList({ type: 'override', mealList: JSON.parse(savedMeals) });
    }
  }, []);

  // Save meals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('mealList', JSON.stringify(mealList));
  }, [mealList]);

  return (
    <MealListContext.Provider value={{
      mealList,
      dispatchMealList,
    }}>
      {children}
    </MealListContext.Provider>
  );
}

export function useMealList() {
  return useContext(MealListContext);
} 