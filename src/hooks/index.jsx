import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './auth';
import { SearchProvider } from './search';
import { RecipeProvider } from './recipes';
import { SingleRecipeProvider } from './singleRecipe';
import { CookProvider } from './cook';

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <RecipeProvider>
        <SingleRecipeProvider>
          <SearchProvider>
            <CookProvider>
              {children}
            </CookProvider>
          </SearchProvider>
        </SingleRecipeProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

export default AppProvider;
