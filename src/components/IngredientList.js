import React from 'react';
import Ingredients from './Ingredients';

export default function IngredientList ({ ingredients }) {
  const ingredientElement = ingredients.map(ingridient => { return <Ingredients key={ingridient.id} {...ingridient} />; });
  return (
    <div className='ingredient--grid'>
      {ingredientElement}
    </div>
  );
}
