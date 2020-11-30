import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Perfil.css';

const Perfil = () => {
  const [storageEmail, setStorageEmail] = useState([]);

  const localStorageEmail = localStorage.getItem('user');

  useEffect(() => {
    if (localStorageEmail !== null) {
      const emailJSON = JSON.parse(localStorageEmail);
      const emailObject = Object.values(emailJSON);
      setStorageEmail(emailObject);
    }
  }, [localStorageEmail]);

  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <section>
      <Header title="Perfil" />
      <div className="col mt-5 h-100">
        <div className="row justify-content-center py-3">
          <span data-testid="profile-email">{storageEmail}</span>
        </div>
        <div className="row align-items-center h-50">
          <div className="col">
            <Link to="/receitas-feitas">
              <button
                type="button"
                className="btn btn-lg btn-block"
                style={ { background: '#7ed95e' } }
                data-testid="profile-done-btn"
              >
                Receitas Feitas
              </button>
            </Link>
            <Link to="/receitas-favoritas">
              <button
                className="btn btn-lg btn-block"
                type="button"
                data-testid="profile-favorite-btn"
                style={ { background: '#7ed95e' } }
              >
                Receitas Favoritas
              </button>
            </Link>
            <Link to="/">
              <button
                type="button"
                onClick={ handleClick }
                data-testid="profile-logout-btn"
                className="btn btn-lg btn-block my-4"
                style={ { background: '#7ed95e' } }
              >
                Sair
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Perfil;
