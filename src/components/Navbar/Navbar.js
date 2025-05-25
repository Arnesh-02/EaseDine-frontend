import React, { useState, useEffect } from 'react';
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
        <a href="/" className="navbar-logo">
          Fdelivery
        </a>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><a href="#home" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Home</a></li>
            <li><a href="#about" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>About</a></li>
            <li><a href="#shop" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Shop</a></li>
            <li><a href="#food" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Food</a></li>
            <li><a href="#recipes" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Recipes</a></li>
            <li><a href="#contact" onClick={() => isMobileMenuOpen && toggleMobileMenu()}>Contact</a></li>
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