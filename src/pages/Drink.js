import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../components';
import { drinksCategoriesOnRender,
  drinksOnRender, filterDrinksByCategory } from '../services';

class Drink extends React.Component {
  constructor() {
    super();
    this.state = {
      Drinks: [],
      Categories: [],
      CategoryFilter: '',
    };
    this.setCategory = this.setCategory.bind(this);
    this.allButtonHandler = this.allButtonHandler.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
  }

  async componentDidMount() {
    const drinksRender = await drinksOnRender();
    const Categories = await drinksCategoriesOnRender();
    this.setInitialState(drinksRender, Categories);
  }

  async setCategory({ strCategory }) {
    const { CategoryFilter } = this.state;
    if (CategoryFilter !== strCategory) {
      const drinksCategory = await filterDrinksByCategory(strCategory);
      this.setState({ Drinks: drinksCategory, CategoryFilter: strCategory });
    } else {
      const initialDrinks = await drinksOnRender();
      this.setState({ Drinks: initialDrinks, CategoryFilter: '' });
    }
  }

  setInitialState(drinksRender, Categories) {
    this.setState({ Drinks: drinksRender, Categories });
  }

  async allButtonHandler() {
    const initialDrinks = await drinksOnRender();
    this.setState({ Drinks: initialDrinks, CategoryFilter: '' });
  }

  redirectOnImage(recipe) {
    const { history } = this.props;
    history.push(`/bebidas/${recipe.idDrink}`);
  }

  render() {
    const { history } = this.props;
    const { Drinks, Categories } = this.state;
    const INITIAL_VALUE = 0;
    return (
      <div className="food-drink-container">
        <div className="category-buttons">
          <Header history={ history } />
          {Categories ? Categories.map((element, index) => (
            <div key={ index } data-testid={ `${element.strCategory}-category-filter` }>
              <button type="button" onClick={ () => this.setCategory(element) }>
                {element.strCategory}
              </button>
            </div>
          )) : ''}
          {Categories.length > INITIAL_VALUE
          && (
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => this.allButtonHandler() }
            >
              All
            </button>
          )}
        </div>
        <div className="cards-container">
          {Drinks ? Drinks.map((recipe, index) => (
            <div className="card" key={ index } data-testid={ `${index}-recipe-card` }>
              <input
                type="image"
                width="100%"
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="recipe"
                onClick={ () => this.redirectOnImage(recipe) }
              />
              <hr className="card-hr" />
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
              <hr className="card-hr" />
            </div>
          )) : null}
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Drink.propTypes = {
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  stateDrinks: state.menu.drinks,
});

export default connect(mapStateToProps, null)(Drink);
