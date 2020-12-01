import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchDrink } from '../../services/cocktailAPI';
import SecondaryHeader from '../../components/SecondaryHeader';
import { addRecipeProgress, selectedIngredient } from '../../services/localStorage';
import '../Detail/detail.css';

export default function DrinkInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});
  const zero = 0;
  let ingredientsNumber = zero;

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchDrink('lookupIngredient', id);
    setRecipes(recipesByIdApi.drinks[0]);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= twenty; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipes[keyName] !== ''
          && recipes[keyName] !== undefined
          && recipes[keyName] !== null
      ) {
        console.log(recipes[keyName]);
        const obj = {
          name: recipes[keyName],
          measure: recipes[measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    ingredientsNumber = i;
    return ingredients;
  };

  const resumeProgress = (ingredients) => {
    ingredients.forEach((ingredient) => {
      const checkIngredient = document.getElementById(ingredient.name);
      if (selectedIngredient(id, ingredient.name)) {
        checkIngredient.classList.add('selected');
        checkIngredient.children[0].checked = true;
      } else {
        checkIngredient.classList.remove('selected');
        checkIngredient.children[0].checked = false;
      }
    });
  };

  useEffect(() => {
    setIngredientAndMeasure();
    if (document.getElementById('renderizado') !== null) {
      resumeProgress(setIngredientAndMeasure());
      verifyChecked();
    }
  }, [recipes]);

  if (Object.keys(recipes).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  function selectItem(event) {
    const completedItem = event.target.parentNode;
    addRecipeProgress(id, completedItem.id);
    console.log(id, completedItem.id);
    if (completedItem.classList.contains('selected')) {
      completedItem.classList.remove('selected');
      verifyChecked();
    } else {
      completedItem.classList.add('selected');
      verifyChecked();
    }
  }

  function verifyChecked() {
    const listCheckbox = document.querySelectorAll('input[type=checkbox]');
    const btnFinalizar = document.getElementById('btnFinalizar');
    let count = 0;
    for (const item of listCheckbox) {
      if (item.checked === true) {
        count += 1;
      }
    }
    if (count === listCheckbox.length) {
      btnFinalizar.disabled = false;
    } else {
      btnFinalizar.disabled = true;
    }
  }

  return (
    <div id="renderizado">
      <div>
        <SecondaryHeader
          name={ recipes.strDrink }
          img={ recipes.strDrinkThumb }
          category={ recipes.strCategory }
        />
      </div>
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        <ul>
          {setIngredientAndMeasure().map((ingredient, index) => {
            if (index < ingredientsNumber) {
              return (
                <div>
                  <li>
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      forHtml={ ingredient.name }
                      name={ ingredient.name }
                      id={ ingredient.name }
                    >
                      <input
                        name={ ingredient.name }
                        checked="false"
                        type="checkbox"
                        key={ index }
                        onClick={ (e) => selectItem(e) }
                      />
                      { `${ingredient.name} - ${ingredient.measure || 'as you like'}` }
                    </label>
                  </li>
                  <br />
                </div>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      <div className="button-container">
        <Link to="/receitas-feitas">
          <button
            id="btnFinalizar"
            type="button"
            className="start-recipe"
            data-testid="finish-recipe-btn"
            disabled="true"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </div>
  );
}
