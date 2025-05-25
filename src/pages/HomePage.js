import React from 'react';
import Hero from '../components/Hero/Hero';
import ValueProposition from '../components/ValueProposition/ValueProposition';
import Benefits from '../components/Benefits/Benefits';
import FeaturedRecipes from '../components/FeaturedRecipes/FeaturedRecipes';
import AppPromotion from '../components/AppPromotion/AppPromotion';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Benefits />
      <FeaturedRecipes />
      <AppPromotion />
    </>
  );
};

export default HomePage;