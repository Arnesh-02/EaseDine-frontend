import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css'; // Global styles

// Layouts
import PreLoginLayout from './layouts/PreLoginLayout';
import PostLoginLayout from './layouts/PostLoginLayout';

// Pre-Login Pages
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage'; // To be created
// import SignupPage from './pages/SignupPage'; // To be created

// Post-Login Pages
import DashboardPage from './pages/DashboardPage';
// import OrdersPage from './pages/OrdersPage'; // To be created
// import ProfilePage from './pages/ProfilePage'; // To be created
// import FavoritesPage from './pages/FavoritesPage'; // To be created
// import CategoriesPage from './pages/CategoriesPage'; // To be created
// import OffersPage from './pages/OffersPage'; // To be created
// import ItemDetailsPage from './pages/ItemDetailsPage'; // To be created
// import SearchResultsPage from './pages/SearchResultsPage'; // To be created
// import CheckoutPage from './pages/CheckoutPage'; // To be created


// A simple component to handle redirection based on auth state
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if (!isAuthenticated) {
    // Redirect them to the /login page, but if they're already on /
    // or other public pages, let them stay.
    // This specific ProtectedRoute is for routes that *require* login.
    return <Navigate to="/" replace />; // Or to a dedicated login page e.g. /login
  }
  return children;
};


function App() {
  return (
    <Router>
      <Routes>
        {/* Pre-Login Routes */}
        <Route element={<PreLoginLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* Add other public routes like /about, /contact here if they use PreLoginLayout */}
        </Route>

        {/* Post-Login Routes */}
        {/* Option 1: Using a layout that internally checks auth (as PostLoginLayout does) */}
        <Route element={<PostLoginLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/orders" element={<OrdersPage />} /> */}
          {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
          {/* <Route path="/account" element={<ProfilePage />} /> */}
          {/* <Route path="/categories" element={<CategoriesPage />} /> */}
          {/* <Route path="/offers" element={<OffersPage />} /> */}
          {/* <Route path="/item/:itemId" element={<ItemDetailsPage />} /> */}
          {/* <Route path="/search" element={<SearchResultsPage />} /> */}
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        </Route>
        
        {/* Option 2: Using a ProtectedRoute wrapper for each route if PostLoginLayout didn't handle auth */}
        {/* <Route path="/dashboard" element={<ProtectedRoute><PostLoginLayout><DashboardPage /></PostLoginLayout></ProtectedRoute>} /> */}

        {/* Catch-all for undefined routes (optional) */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;