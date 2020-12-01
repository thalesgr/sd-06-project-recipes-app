export function mealsToken(token) {
  const temp = localStorage.getItem('mealsToken');
  localStorage.setItem('mealsToken', token);
  return temp;
}

export function cocktailsToken(token) {
  const temp = localStorage.getItem('cocktailsToken');
  localStorage.setItem('cocktailsToken', token);
  return temp;
}

export function getValue(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setValue(value) {
  return localStorage.setItem(JSON.stringify({ user: { email: value } }));
}

export function setValueUser(key, value) {
  return localStorage.setItem(key, JSON.stringify({ email: value }));
}

export function treatRecipe(recipe) {
  let treatedRecipe = {};
  if ('idMeal' in recipe) {
    treatedRecipe = {
      id: recipe.idMeal,
      type: 'meal',
      name: recipe.strMeal,
      category: recipe.strCategory,
      image: recipe.strMealThumb,
      tags: recipe.strTags,
      doneDate: '',
      area: recipe.strArea,
      instructions: recipe.strInstructions,
      youtube: recipe.strYoutube,
      source: recipe.strSource,
    };
  } else if ('idDrink' in recipe) {
    treatedRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      name: recipe.strDrink,
      category: recipe.strCategory,
      image: recipe.strDrinkThumb,
      tags: recipe.strTags,
      doneDate: '',
      alcoholic: recipe.strAlcoholic,
      glass: recipe.strGlass,
      instructions: recipe.strInstructions,
    };
  }

  return treatedRecipe;
}

export function convertTreatedRecipe(recipe) {
  let convertedRecipe = {};
  if (recipe.type === 'meal') {
    convertedRecipe = {
      idMeal: recipe.id,
      strMeal: recipe.name,
      strCategory: recipe.category,
      strMealThumb: recipe.image,
      strTags: recipe.tags,
      strArea: recipe.area,
      strInstructions: recipe.instructions,
      strYoutube: recipe.youtube,
      strSource: recipe.source,
    };
  } else if (recipe.type === 'drink') {
    convertedRecipe = {
      idDrink: recipe.id,
      strDrink: recipe.name,
      strCategory: recipe.category,
      strDrinkThumb: recipe.image,
      strTags: recipe.tags,
      strInstructions: recipe.instructions,
      strAlcoholic: recipe.alcoholic,
      strGlass: recipe.glass,
    };
  }

  return convertedRecipe;
}

export function addDoneRecipe(object) {
  const obj = {
    id: object.id,
    type: object.type,
    area: object.strArea,
    category: object.strCategory,
    alcoholicOrNot: object.alcoholic,
    name: object.name,
    image: object.image,
    doneDate: object.doneDate,
    tags: object.tags,
  };
  const temp = JSON.parse(localStorage.getItem('done_recipes'));
  temp.push(obj);
  localStorage.setItem('done_recipes', JSON.stringify(temp));
}

export function getDoneRecipes() {
  const temp = JSON.parse(localStorage.getItem('done_recipes'));
  return temp;
}

export function createFavoriteRecipesDatabase() {
  const recipes = [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export function getFavoriteRecipes() {
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return recipes;
}

export function checkFavoriteRecipesDatabase() {
  const recipes = getFavoriteRecipes();
  if (!recipes) createFavoriteRecipesDatabase();
}

export function updateFavoriteRecipes(recipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export function recipeIsFavorite(recipe) {
  checkFavoriteRecipesDatabase();
  const recipes = getFavoriteRecipes();
  console.log('receitas recipeIsFavorite', recipes);
  recipe = treatRecipe(recipe);
  const match = recipes.find((item) => item.id === recipe.id);
  if (match) return true;
  return false;
}

export function favoriteRecipe(recipe) {
  checkFavoriteRecipesDatabase();
  recipe = treatRecipe(recipe);
  if (recipe.type === 'drink') recipe.category = recipe.alcoholic;
  const temp = getFavoriteRecipes();
  let recipeIndex;
  if (!temp.length < 1) recipeIndex = temp.findIndex((item) => item.id === recipe.id);
  const minusOne = -1;
  if (recipeIndex > minusOne) temp.splice(recipeIndex, 1);
  else temp.push(recipe);
  updateFavoriteRecipes(temp);
}

export function createRecipesProgress() {
  let obj = {
    cocktails: {},
    meals: {},
  };
  obj = JSON.parse(localStorage.getItem(''));
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}

export function getInProgressRecipes() {
  const temp = JSON.parse(localStorage.getItem('in_progress_recipes'));
  return temp;
}

export function addCocktailIngredient(cocktailID, ingredientID) {
  let obj = JSON.parse(localStorage.getItem('in_progress_recipes'));
  if (!obj.cocktails[cocktailID]) {
    const temp = { [cocktailID]: [ingredientID] };
    obj = {
      cocktails: { ...obj.cocktails, ...temp },
      meals: { ...obj.meals },
    };
  } else {
    obj.cocktails[cocktailID].push(ingredientID);
  }
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}

export function addMealIngredient(mealID, ingredientID) {
  let obj = JSON.parse(localStorage.getItem('in_progress_recipes'));
  if (!obj.meals[mealID]) {
    const temp = { [mealID]: [ingredientID] };
    obj = {
      cocktails: { ...obj.cocktails },
      meals: { ...obj.meals, ...temp },
    };
  } else {
    obj.meals[mealID].push(ingredientID);
  }
  localStorage.setItem('in_progress_recipes', JSON.stringify(obj));
}
