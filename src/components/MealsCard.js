import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MealsCard({ food, index }) {
  return (
    <Link to={ `/comidas/${food.idMeal}` }>
      <div className="food-card" data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ food.strMealThumb }
          alt={ food.strMeal }
          className="food-img"
        />
        <h3 className="food-name" data-testid={ `${index}-card-name` }>
          {food.strMeal}
        </h3>
      </div>
    </Link>
  );
}

MealsCard.propTypes = {
  food: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealsCard;
