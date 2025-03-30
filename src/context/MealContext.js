import { createContext, useContext, useState, useEffect } from 'react';

const MealContext = createContext();

export function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({
    foods: [],
    timestamp: new Date(),
  });

  // Load meals from localStorage on initial render
  useEffect(() => {
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  }, []);

  // Save meals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addFood = (food) => {
    setCurrentMeal(prev => ({
      ...prev,
      foods: [...prev.foods, food]
    }));
  };

  const removeFood = (index) => {
    setCurrentMeal(prev => ({
      ...prev,
      foods: prev.foods.filter((_, i) => i !== index)
    }));
  };

  const saveMeal = () => {
    if (currentMeal.foods.length > 0) {
      setMeals(prev => [...prev, {
        ...currentMeal,
        timestamp: new Date(),
      }]);
      setCurrentMeal({
        foods: [],
        timestamp: new Date(),
      });
    }
  };

  const resetCurrentMeal = () => {
    setCurrentMeal({
      foods: [],
      timestamp: new Date(),
    });
  };

  const deleteMeal = (index) => {
    setMeals(prev => prev.filter((_, i) => i !== index));
  };

  const getDailyTotals = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = meals.filter(meal => {
      const mealDate = typeof meal.timestamp === 'string' 
        ? meal.timestamp.split('T')[0]
        : meal.timestamp.toISOString().split('T')[0];
      return mealDate === today;
    });

    return todayMeals.reduce((acc, meal) => {
      meal.foods.forEach(food => {
        acc.calories += food.calories;
        acc.fat += food.fat;
        acc.cholesterol += food.cholesterol;
        acc.sodium += food.sodium;
        acc.sugar += food.sugar;
      });
      return acc;
    }, { calories: 0, fat: 0, cholesterol: 0, sodium: 0, sugar: 0 });
  };

  return (
    <MealContext.Provider value={{
      meals,
      currentMeal,
      addFood,
      removeFood,
      saveMeal,
      resetCurrentMeal,
      deleteMeal,
      getDailyTotals,
    }}>
      {children}
    </MealContext.Provider>
  );
}

export function useMeals() {
  return useContext(MealContext);
} 