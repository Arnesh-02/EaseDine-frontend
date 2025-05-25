import React from 'react';
import './ValueProposition.css';
import { FaUtensils, FaMotorcycle, FaStar } from 'react-icons/fa'; // Example icons

const ValueProposition = () => {
  const values = [
    {
      icon: <FaUtensils />,
      title: 'Choose your favorite food',
      description: 'Select from a wide variety of delicious meals from top-rated local restaurants.',
    },
    {
      icon: <FaMotorcycle />,
      title: 'Get delivery at your door step',
      description: 'Fast and reliable delivery, bringing your favorite food directly to you.',
    },
    {
      icon: <FaStar />,
      title: 'We have 400+ Reviews On our app',
      description: 'Trusted by hundreds of customers, with consistently high ratings for quality and service.',
    },
  ];

  return (
    <section className="value-proposition-section section-padding">
      <div className="container">
        <h2 className="section-title text-center">Why we are Best in our Town</h2>
        <p className="section-subtitle text-center">
          We are committed to providing healthy and delicious food options, prepared with the freshest ingredients. Our focus is on quality, convenience, and customer satisfaction.
        </p>
        <div className="value-cards-container">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <div className="value-card-icon">{value.icon}</div>
              <h3 className="value-card-title">{value.title}</h3>
              <p className="value-card-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;