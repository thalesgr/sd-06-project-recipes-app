import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DrinksPage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Bebidas"
      />
      <h1>Página de Bebidas</h1>
      <Footer />
    </div>
  );
}
