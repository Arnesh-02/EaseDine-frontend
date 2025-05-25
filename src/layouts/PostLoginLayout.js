import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoggedInNavbar from '../components/Navbar/LoggedInNavbar';
import Footer from '../components/Footer/Footer'; // Can be a different or simplified footer
import CartSidebar from '../components/Cart/CartSidebar';

const PostLoginLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isCartSidebarOpen } = useSelector((state) => state.ui);

  // TEMPORARY: Forcing login via DashboardPage's useEffect.
  // In a real app, this layout should strictly redirect if !isAuthenticated.
  // For now, we let DashboardPage handle the mock login.
  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <LoggedInNavbar />
      {isCartSidebarOpen && <CartSidebar />} {/* Render CartSidebar based on Redux state */}
      <main className={`post-login-main ${isCartSidebarOpen ? 'sidebar-open-padding' : ''}`}> {/* Add class for potential specific styling */}
        <Outlet /> {/* Renders components like DashboardPage, ProfilePage etc. */}
      </main>
      <Footer /> {/* Or a different footer for logged-in users */}
    </>
  );
};

export default PostLoginLayout;