import React from 'react';
import './AppPromotion.css';
// You'll need to source these images or use placeholders
import AppStoreBadge from '../../assets/images/app-store-badge.png'; // Replace with actual path
import GooglePlayBadge from '../../assets/images/google-play-badge.png'; // Replace with actual path
import AppMockup from '../../assets/images/app-mockup.png'; // Replace with actual path or use a generic phone image

const AppPromotion = () => {
  // Using placeholder URLs if local assets are not yet available
  const finalAppStoreBadge = AppStoreBadge.startsWith('/') ? AppStoreBadge : 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg';
  const finalGooglePlayBadge = GooglePlayBadge.startsWith('/') ? GooglePlayBadge : 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
  const finalAppMockup = AppMockup.startsWith('/') ? AppMockup : 'https://via.placeholder.com/350x600.png?text=App+Mockup';


  return (
    <section className="app-promotion-section section-padding">
      <div className="container app-promotion-container">
        <div className="app-promotion-image">
          <img src={finalAppMockup} alt="Fdelivery Mobile App" loading="lazy"/>
        </div>
        <div className="app-promotion-content">
          <h2 className="section-title">Never Feel Hungry! Download Our Mobile App Order Delicious Food</h2>
          <p>
            Experience the convenience of ordering your favorite meals anytime, anywhere. Our app offers exclusive deals,
            real-time order tracking, and a seamless user experience. Get started today and satisfy your cravings with Fdelivery!
          </p>
          <div className="app-download-badges">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={finalAppStoreBadge} alt="Download on the App Store" className="app-badge" />
            </a>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
              <img src={finalGooglePlayBadge} alt="Get it on Google Play" className="app-badge" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;