import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Explorar.css';
import { requestApiMealSurprise } from '../services/requestFood';

function ExplorarComidas({ history }) {
  async function handleRandomMealPage() {
    const response = await requestApiMealSurprise();
    const id = response[0].idMeal;
    const randomMealEndpoint = `/comidas/${id}`;
    console.log(randomMealEndpoint);
    history.push(randomMealEndpoint);
  }

  return (
    <>
      <Header name="Explorar Comidas" button={ false } />
      <div className="explore-btn">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleRandomMealPage() }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidas;
