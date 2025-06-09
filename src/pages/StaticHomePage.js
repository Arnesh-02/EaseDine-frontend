import React from 'react';
import { Link } from 'react-router-dom';
import './StaticHomePage.css';

const StaticHomePage = () => {
  return (
    <div className="static-home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Fdelivery</h1>
          <p className="hero-subtitle">Delicious food delivered to your doorstep</p>
          <div className="hero-buttons">
            <Link to="/login" className="hero-button primary">Login</Link>
            <Link to="/signup" className="hero-button secondary">Sign Up</Link>
          </div>
        </div>
      </div>
      
      <div className="info-section">
        <div className="info-card">
          <div className="info-icon">🍔</div>
          <h3>Wide Selection</h3>
          <p>Choose from thousands of restaurants and dishes</p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Get your food delivered in under 30 minutes</p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">💰</div>
          <h3>Best Deals</h3>
          <p>Exclusive offers and discounts every day</p>
        </div>
      </div>
      
      <footer className="static-footer">
        <p>© 2025 Fdelivery. All rights reserved.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default StaticHomePage;