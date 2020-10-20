import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipe';

export default function App () {
  const [recipes, setRecipes] = useState(recipeData);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  function handleRecipeSelect (id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd () {
    const newRecipe = {
      id: Date.now().toString(),
      dishName: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: Date.now().toString(), name: '', amount: '' }
      ]
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange (id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete (id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const recipeData = [
  {
    id: 1,
    dishName: 'Plain Chiken',
    cookTime: ' 1:40',
    servings: 5,
    instructions: '1. cut it\n2. cook it\n3. eat it',
    ingredients: [
      {
        id: 1,
        name: 'chiken',
        amount: '3 drums'
      },
      {
        id: 2,
        name: 'oregano',
        amount: '3ts'
      }
    ]
  },
  {
    id: 2,
    dishName: 'Plain Pork',
    cookTime: ' 4:20',
    servings: 2,
    instructions: '1. cortar it\n2. cocinar it\n3. comer',
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '5oz'
      },
      {
        id: 2,
        name: 'cummin',
        amount: '1ts'
      }
    ]
  }
];
