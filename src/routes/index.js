import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
// import RecipeDrink from '../pages/RecipeDrink';
import RecipeFoodDetails from '../pages/RecipeFoodDetails';
import RecipeDrinkDetails from '../pages/RecipeDrinkDetails';
import RecipeFoodProcess from '../pages/RecipeFoodProcess';
import RecipeDrinkProcess from '../pages/RecipeDrinkProcess';
import Explore from '../pages/Explore';
import ExploreMealsOrDrinks from '../pages/ExploreMealsOrDrinks';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreFoodSourcePlace from '../pages/ExploreFoodSourcePlace';
import Profile from '../pages/Profile';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/comidas" exact render={ () => <Home title="Comidas" /> } />
      <Route path="/bebidas" exact render={ () => <Home title="Bebidas" /> } />
      <Route
        path="/comidas/:id"
        render={ (props) => <RecipeFoodDetails { ...props } /> }
      />
      <Route
        path="/bebidas/:id"
        render={ (props) => <RecipeDrinkDetails { ...props } /> }
      />
      <Route path="/comidas/:id/in-progress" exact component={ RecipeFoodProcess } />
      <Route path="/bebidas/:id/in-progress" exact component={ RecipeDrinkProcess } />
      <Route path="/explorar" exact component={ Explore } />
      <Route path="/explorar/comidas" exact render={ () => <ExploreMealsOrDrinks type="comidas" /> } />
      <Route path="/explorar/bebidas" exact render={ () => <ExploreMealsOrDrinks type="bebidas" /> } />
      <Route
        path="/explorar/comidas/ingredientes"
        exact
        component={ ExploreFoodIngredients }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        exact
        component={ ExploreDrinkIngredients }
      />
      <Route path="/explorar/comidas/area" exact component={ ExploreFoodSourcePlace } />
      <Route path="/perfil" exact component={ Profile } />
      <Route path="/receitas-feitas" exact component={ RecipesMade } />
      <Route path="/receitas-favoritas" exact component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
