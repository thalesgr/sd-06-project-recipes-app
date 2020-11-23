import React, {
  useCallback, useRef, useState, useMemo,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from '../../hooks/auth';
import { useSearch } from '../../hooks/search';

import userIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

import './styles.css';

function Header({ pageName, showSearch = false }) {
  const searchInputRef = useRef();

  const [searchBarShowing, setSearchBarShowing] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const { userToken } = useAuth();
  const { appSearch } = useSearch();
  const { push } = useHistory();

  const handleSearchIconClick = useCallback(() => {
    setSearchBarShowing((oldSearchBarShowingValue) => !oldSearchBarShowingValue);
  }, []);

  const handleRadioChange = useCallback(({ target }) => {
    setRadioValue(target.value);
  }, []);

  const handleRecipeSearch = useCallback(async (formEvent) => {
    formEvent.preventDefault();

    const search = searchInputRef.current.value;
    const option = radioValue;

    if (!search || !option) {
      return;
    }

    if (option === 'first_letter' && search.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');

      return;
    }

    const infoToSearch = { option, value: search, token: userToken };

    const singleResponseID = await appSearch(pageName, infoToSearch);

    if (singleResponseID) {
      push(`${pageName}/${singleResponseID}`);
    }
  }, [push, appSearch, searchInputRef, radioValue, userToken, pageName]);

  const parsedTitle = useMemo(() => {
    const headerWords = pageName.split(' ');

    const namesCapitalized = headerWords.map((word) => (
      word.charAt(0).toUpperCase() + word.slice(1)
    ));

    const wordsCapitalized = namesCapitalized.join(' ');

    return wordsCapitalized;
  }, [pageName]);

  return (
    <header className="app-header">
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={userIcon} alt="user info" />
      </Link>

      <span data-testid="page-title">{ parsedTitle }</span>

      {showSearch
        ? (
          <button type="button" onClick={handleSearchIconClick}>
            <img data-testid="search-top-btn" src={searchIcon} alt="search icon" />
          </button>
        ) : (<div />)}

      {searchBarShowing && (
      <div className="search-bar-container">
        <form onSubmit={handleRecipeSearch}>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Palavra-chave"
            ref={searchInputRef}
          />

          <div className="radio-type-container">
            <div className="radio-container">
              <label htmlFor="ingredients">Ingredientes</label>
              <input
                type="radio"
                onChange={handleRadioChange}
                name="searchOption"
                id="ingredients"
                value="ingredients"
                data-testid="ingredient-search-radio"
              />
            </div>
            <div className="radio-container">
              <label htmlFor="name">Nome</label>
              <input
                type="radio"
                onChange={handleRadioChange}
                name="searchOption"
                id="name"
                value="name"
                data-testid="name-search-radio"
              />
            </div>
            <div className="radio-container">
              <label htmlFor="first_letter">Primeira Letra</label>
              <input
                type="radio"
                onChange={handleRadioChange}
                name="searchOption"
                id="first_letter"
                value="first_letter"
                data-testid="first-letter-search-radio"
              />
            </div>

            <button
              type="submit"
              data-testid="exec-search-btn"
            >
              Buscar

            </button>
          </div>
        </form>
      </div>
      )}
    </header>
  );
}

Header.defaultProps = {
  showSearch: false,
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  showSearch: PropTypes.bool,
};

export default Header;
