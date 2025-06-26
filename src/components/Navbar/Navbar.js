import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'; // Using Feather Icons

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          Fdelivery
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><Link to="/" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Home</Link></li>
            <li><a href="#about" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>About</a></li>
            <li><a href="#shop" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Shop</a></li>
            <li><a href="#food" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Food</a></li>
            <li><a href="#recipes" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Recipes</a></li>
            <li><a href="#contact" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Contact</a></li>
            <li className="navbar-dropdown">
              <span>For Restaurants ▾</span>
              <ul className="navbar-dropdown-menu">
                <li><Link to="/restaurant/register" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Register Restaurant</Link></li>
                <li><Link to="/restaurant/login" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Restaurant Login</Link></li>
                <li><Link to="/restaurant/dashboard" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Dashboard</Link></li>
                <li><Link to="/restaurant/all" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>All Restaurants</Link></li>
              </ul>
            </li>
          </ul>
          <div className="navbar-search-mobile">
            <input type="text" placeholder="Search food..." />
            <button type="submit"><FiSearch /></button>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="navbar-search-desktop">
            <input type="text" placeholder="Search..." />
            <button type="submit"><FiSearch /></button>
          </div>
          <div className="navbar-mobile-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;