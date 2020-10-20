import React, { useContext } from 'react';
import IngredientList from './IngredientList';
import { RecipeContext } from './App';

export default function Recipe (props) {
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const {
    id,
    dishName,
    cookTime,
    servings,
    instructions,
    ingredients
  } = props;
  return (
    <div className='recipe'>
      <div className='recipe__header'>
        <h3 className='recipe__title'>{dishName}</h3>
        <div>
          <button
            className='btn btn--primary mr-1'
            onClick={() => handleRecipeSelect(id)}
          >
          edit
          </button>
          <button
            className='btn btn--danger'
            onClick={() => handleRecipeDelete(id)}
          >
            delete
          </button>
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>cook time:</span>
        <span className='recipe__value'> {cookTime} </span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>servings:</span>
        <span className='recipe__value'>{servings}</span>
      </div>
      <div>
        <span className='recipe__label'>instructions:</span>
        <div className='recipe__value recipe__value--indented recipe__instructions'>{instructions}</div>
      </div>
      <div>
        <span className='recipe__label'>Ingredients:</span>
        <div className='recipe__value recipe__value--indented recipe__instructions'>
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
