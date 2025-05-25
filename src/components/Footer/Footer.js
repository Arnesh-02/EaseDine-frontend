import React from 'react';
import './Footer.css';
import { FaWhatsapp, FaRocketchat } from 'react-icons/fa'; // Example icons for contact

const Footer = () => {
  return (
    <footer className="footer-section section-padding">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#shop">All Products</a></li>
              <li><a href="#locations">Locations Map</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#tracking">Order tracking</a></li>
              <li><a href="#wishlist">Wish List</a></li>
              <li><a href="#account">My account</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#policy">Policy</a></li>
              <li><a href="#business">Business</a></li>
              <li><a href="#career">Support Career</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li><a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> WhatsApp</a></li>
              <li><a href="#support24">Support 24/7</a></li>
              <li><a href="#chat"><FaRocketchat /> Quick Chat</a></li>
            </ul>
            {/* You can add social media icons here if needed */}
          </div>
        </div>
        <div className="footer-copyright">
          <p>Copyright © 2021 Pixency. All Rights Reserved.</p>
          <p>Created by Asha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;