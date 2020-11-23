import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';
import renderWithRouter from '../renderWithRouter';
import { drinkIcon, mealIcon, exploreIcon } from '../images';
import App from '../App';

describe('renders footer correctly', () => {
  // afterEach(cleanup);
  it('expect data-testid="footer" to be in the document', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const FOOTER = getByTestId('footer');
    expect(FOOTER).toBeInTheDocument();
  });

  it('expect "drinkIcon.svg, exploreIcon.svg and mealIcon.svg" in the document', () => {
    const { getAllByRole } = renderWithRouter(<Footer />);
    const FOOTER_PICS = getAllByRole('img');
    const FOOTER_PICS_NBR = 3;
    expect(FOOTER_PICS.length).toBe(FOOTER_PICS_NBR);
    expect(FOOTER_PICS[0]).toHaveAttribute('src', `${drinkIcon}`);
    expect(FOOTER_PICS[1]).toHaveAttribute('src', `${mealIcon}`);
    expect(FOOTER_PICS[2]).toHaveAttribute('src', `${exploreIcon}`);
  });

  it('expect picture links to redirect correctly', async () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const { pathname } = history.location;
    const DRINK = getByText(/Drinks/i);
    fireEvent.click(DRINK);
    expect(DRINK).toBeInTheDocument();
    await waitFor(() => getByText('Página principal de Drinks'));
    expect(pathname).toBe('/bebidas');
  });
});
