import React from 'react';
import './Hero.css';
// import HeroBackgroundImage from '../../assets/images/hero-background.jpg'; // Example: uncomment and replace with your image path

const Hero = () => {
  return (
    <section className="hero-section" /* style={{ backgroundImage: `url(${HeroBackgroundImage})` }} */>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="tagline">
          <span>M</span>
          <span>o</span>
          <span>r</span>
          <span>e</span>
          <span>&nbsp;</span>
          <span>t</span>
          <span>h</span>
          <span>a</span>
          <span>n</span>
          <span>&nbsp;</span>
          <span>F</span>
          <span>a</span>
          <span>s</span>
          <span>t</span>
          <span>e</span>
          <span>r</span>
        </div>
        <h1>Get your cuisine delivered right to your door</h1>
        <p className="supporting-text">
          Food that is delivered at the right time. The trendy food delivery partner. Good food is what we deliver. Your hunger companion.
        </p>
        <a href="#recipes" className="btn-primary hero-cta">
          Explore Food
        </a>
      </div>
    </section>
  );
};

export default Hero;