import React from 'react';
import './Benefits.css';
import { FaShippingFast, FaUndoAlt, FaLock, FaHeadset } from 'react-icons/fa'; // Example icons

const Benefits = () => {
  const benefitsData = [
    {
      icon: <FaShippingFast />,
      title: 'Free Home Delivery',
      description: 'For all orders over $50, enjoy free and fast home delivery service.',
    },
    {
      icon: <FaUndoAlt />,
      title: 'Return & Refund',
      description: 'Not satisfied? We offer a hassle-free return and money-back guarantee.',
    },
    {
      icon: <FaLock />,
      title: 'Secure Payment',
      description: 'Your payments are 100% secure with our encrypted payment gateways.',
    },
    {
      icon: <FaHeadset />,
      title: 'Quality Support',
      description: 'Our dedicated support team is available 24/7 to assist you with any queries.',
    },
  ];

  return (
    <section className="benefits-section section-padding">
      <div className="container">
        <h2 className="section-title text-center">Take a look at the benefits we offer for you</h2>
        <div className="benefits-cards-container">
          {benefitsData.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-card-icon">{benefit.icon}</div>
              <h3 className="benefit-card-title">{benefit.title}</h3>
              <p className="benefit-card-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;