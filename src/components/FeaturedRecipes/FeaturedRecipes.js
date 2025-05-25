import React, { useState } from 'react';
import './FeaturedRecipes.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

// Placeholder images - replace with your actual image paths or URLs
const placeholderImage1 = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'; // Pizza
const placeholderImage2 = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'; // Salad
const placeholderImage3 = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80'; // Breakfast
const placeholderImage4 = 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'; // Pasta

const initialRecipes = [
  {
    id: 1,
    name: 'Crispy Fried Chicken',
    price: 13.00,
    image: placeholderImage1, // Replace with actual image
    category: 'Fast Food',
    rating: null,
  },
  {
    id: 2,
    name: 'Burger Patty Recipe',
    price: 15.00,
    image: placeholderImage2, // Replace with actual image
    category: 'Fast Food',
    rating: null,
  },
  {
    id: 3,
    name: 'Must-Try Dishes',
    price: 12.00,
    image: placeholderImage3, // Replace with actual image
    category: 'Rice Menu', // Example category
    rating: 5,
  },
  {
    id: 4,
    name: 'Tasty French Fries',
    price: 17.00,
    image: placeholderImage4, // Replace with actual image
    category: 'Fast Food',
    rating: 5,
  },
  // Add more recipes for other categories if needed for filtering demo
];

const categories = ["See All", "Fast Food", "Rice Menu", "Desserts", "Coffee", "Pizza"];

const FeaturedRecipes = () => {
  const [activeCategory, setActiveCategory] = useState('See All');
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes.slice(0, 4)); // Show 4 initially

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'See All') {
      setFilteredRecipes(initialRecipes.slice(0, 4)); // Or all if you prefer
    } else {
      setFilteredRecipes(initialRecipes.filter(recipe => recipe.category === category).slice(0, 4));
    }
  };

  return (
    <section className="featured-recipes-section section-padding">
      <div className="container">
        <h2 className="section-title text-center">Try Our Special Recipes</h2>
        <div className="recipe-filter-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="recipe-cards-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <div className="recipe-card-image-container">
                  <img src={recipe.image} alt={recipe.name} className="recipe-card-image" loading="lazy" />
                  <button className="add-to-cart-btn">
                    Add To Cart <FaShoppingCart />
                  </button>
                </div>
                <div className="recipe-card-content">
                  <h3 className="recipe-card-title">{recipe.name}</h3>
                  <div className="recipe-card-footer">
                    <p className="recipe-card-price">${recipe.price.toFixed(2)}</p>
                    {recipe.rating && (
                      <div className="recipe-card-rating">
                        {[...Array(recipe.rating)].map((_, i) => (
                          <FaStar key={i} color="var(--secondary-color)" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-recipes-message text-center">No recipes found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;