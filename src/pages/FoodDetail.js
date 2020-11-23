import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import '../css/details.css';

function FoodDetail() {
  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h1 data-testid="recipe-title">titulo api</h1>
      <button data-testid="share-btn" type="button">{shareIcon}</button>
      <button data-testid="favorite-btn" type="button">{whiteHeartIcon}</button>
      <h4 data-testid="recipe-category">texto categoria</h4>
      <p data-testid="0-ingredient-name-and-measure">lista de ingredientes</p>
      <p data-testid="instructions">texto das instruções</p>
      <video
        data-testid="video"
        controls
        src="qualquer-coisa.mp4"
      >
        <track src="qualquer-coisa.vtt" kind="captions" srcLang="en" />
      </video>
      <span data-testid="0-recomendation-card">receitas recomendadas</span>
      <button
        data-testid="start-recipe-btn"
        className="button-position"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default FoodDetail;
