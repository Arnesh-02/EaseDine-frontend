import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { toggleMobileMenu, toggleCartSidebar } from '../../store/uiSlice';
import { logoutUser } from '../../store/userSlice';
import './LoggedInNavbar.css';

const LoggedInNavbar = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state) => state.ui);
  const { profile } = useSelector((state) => state.user);
  const { items, totalQuantity } = useSelector((state) => state.cart);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu());
  };

  const handleToggleCart = () => {
    dispatch(toggleCartSidebar());
  };

  const handleToggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // Redirect to home page
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
    // You could dispatch an action to update filters
    // dispatch(setFilter({ filterName: 'searchTerm', value: searchTerm }));
  };

  return (
    <nav className={`logged-in-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-logo">
            Fdelivery
          </Link>
          <div className="navbar-search-desktop">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search for food..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><FiSearch /></button>
            </form>
          </div>
        </div>

        <div className="navbar-right">
          <div className="cart-icon" onClick={handleToggleCart}>
            <FiShoppingCart />
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </div>
          
          <div className="profile-dropdown">
            <div className="profile-icon" onClick={handleToggleProfileDropdown}>
              {profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <FiUser />
              )}
            </div>
            
            {showProfileDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p>Hello, {profile?.name?.split(' ')[0] || 'User'}</p>
                </div>
                <ul>
                  <li><Link to="/orders">My Orders</Link></li>
                  <li><Link to="/account">Account Settings</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="mobile-menu-toggle" onClick={handleToggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><FiSearch /></button>
          </form>
        </div>
        
        <ul className="mobile-nav-links">
          <li><Link to="/dashboard" onClick={handleToggleMobileMenu}>Home</Link></li>
          <li><Link to="/orders" onClick={handleToggleMobileMenu}>My Orders</Link></li>
          <li><Link to="/account" onClick={handleToggleMobileMenu}>Account</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;