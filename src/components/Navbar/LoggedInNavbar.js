import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you'll use React Router
import './LoggedInNavbar.css';
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiList, FiHeart, FiSettings } from 'react-icons/fi';
import { logoutUser } from '../../store/userSlice';
import { toggleMobileMenu, toggleCartSidebar } from '../../store/uiSlice';

const LoggedInNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.user);
  const { totalQuantity: cartItemCount } = useSelector((state) => state.cart);
  const { isMobileMenuOpen } = useSelector((state) => state.ui);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    // Potentially clear other states like cart if not persisted for logged-out users
    navigate('/'); // Navigate to homepage or login page
  };

  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu());
  };

  const handleToggleCart = () => {
    dispatch(toggleCartSidebar());
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      // navigate(`/search?q=${searchTerm}`); // Example search navigation
      console.log("Searching for:", searchTerm);
    }
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
    <nav className={`li-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="li-navbar-container container">
        <Link to="/dashboard" className="li-navbar-logo"> {/* Assuming /dashboard is post-login home */}
          Fdelivery
        </Link>

        <div className={`li-navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Mobile Search */}
          <form className="li-navbar-search-mobile" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><FiSearch /></button>
          </form>
          {/* Main menu items can be added here if different from pre-login */}
          <ul className="li-navbar-links">
            <li><Link to="/dashboard" onClick={isMobileMenuOpen ? handleToggleMobileMenu : undefined}>Home</Link></li>
            <li><Link to="/categories" onClick={isMobileMenuOpen ? handleToggleMobileMenu : undefined}>Categories</Link></li>
            <li><Link to="/offers" onClick={isMobileMenuOpen ? handleToggleMobileMenu : undefined}>Offers</Link></li>
          </ul>
        </div>

        <div className="li-navbar-actions">
          {/* Desktop Search */}
          <form className="li-navbar-search-desktop" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><FiSearch /></button>
          </form>

          <button className="li-navbar-action-btn cart-btn" onClick={handleToggleCart}>
            <FiShoppingCart />
            {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
          </button>

          <div className="li-navbar-profile">
            <button 
              className="li-navbar-action-btn profile-btn" 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              {profile?.avatar ? <img src={profile.avatar} alt="User" className="profile-avatar-icon" /> : <FiUser />}
              <span className="profile-greeting">Hi, {profile?.name ? profile.name.split(' ')[0] : 'User'}!</span>
            </button>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-user-info">
                  {profile?.avatar ? <img src={profile.avatar} alt="User" className="dropdown-avatar" /> : <FiUser size={30} />}
                  <div>
                    <p className="dropdown-username">{profile?.name || 'Guest User'}</p>
                    <p className="dropdown-email">{profile?.email || ''}</p>
                  </div>
                </div>
                <ul>
                  <li><Link to="/orders" onClick={() => setIsProfileDropdownOpen(false)}><FiList /> My Orders</Link></li>
                  <li><Link to="/favorites" onClick={() => setIsProfileDropdownOpen(false)}><FiHeart /> Favorites</Link></li>
                  <li><Link to="/account" onClick={() => setIsProfileDropdownOpen(false)}><FiSettings /> Account Settings</Link></li>
                  <li><button onClick={handleLogout}><FiLogOut /> Logout</button></li>
                </ul>
              </div>
            )}
          </div>

          <div className="li-navbar-mobile-icon" onClick={handleToggleMobileMenu}>
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;