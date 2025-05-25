import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'; // Existing Navbar
import Footer from '../components/Footer/Footer'; // Existing Footer

const PreLoginLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the specific page component like HomePage */}
      </main>
      <Footer />
    </>
  );
};

export default PreLoginLayout;