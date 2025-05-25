import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaStar, FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';
import { addItemToCart } from '../../store/cartSlice';
// import { toggleFavoriteItem } from '../../store/userSlice'; // Or a dedicated foodSlice
import './FoodGrid.css';

// Mock data - replace with API call and Redux state for actual food items
const allFoodItems = [
  { id: 'f1', name: 'Margherita Pizza', price: 12.99, rating: 4.5, image: 'https://via.placeholder.com/300x200/FF6B00/FFFFFF?Text=Pizza+M', category: 'Pizza', isVegetarian: true, tags: ['Veg', 'Classic'] },
  { id: 'f2', name: 'Pepperoni Pizza', price: 14.50, rating: 4.7, image: 'https://via.placeholder.com/300x200/FF9500/FFFFFF?Text=Pizza+P', category: 'Pizza', isVegetarian: false, tags: ['Non-Veg', 'Spicy'] },
  { id: 'f3', name: 'Chicken Burger', price: 9.75, rating: 4.2, image: 'https://via.placeholder.com/300x200/D0021B/FFFFFF?Text=Burger', category: 'Burger', isVegetarian: false, tags: ['Non-Veg', 'Grilled'] },
  { id: 'f4', name: 'Veggie Burger', price: 8.99, rating: 4.0, image: 'https://via.placeholder.com/300x200/00A651/FFFFFF?Text=VegBurger', category: 'Burger', isVegetarian: true, tags: ['Veg', 'Healthy'] },
  { id: 'f5', name: 'Caesar Salad', price: 7.50, rating: 4.3, image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?Text=Salad', category: 'Salad', isVegetarian: true, tags: ['Veg', 'Light'] },
  { id: 'f6', name: 'Spaghetti Carbonara', price: 13.25, rating: 4.8, image: 'https://via.placeholder.com/300x200/FF6B00/FFFFFF?Text=Pasta', category: 'Pasta', isVegetarian: false, tags: ['Non-Veg', 'Creamy'] },
  { id: 'f7', name: 'Paneer Tikka', price: 11.00, rating: 4.6, image: 'https://via.placeholder.com/300x200/FF9500/FFFFFF?Text=Paneer', category: 'Indian', isVegetarian: true, tags: ['Veg', 'Spicy', 'Tandoori'] },
  { id: 'f8', name: 'Sushi Platter', price: 18.99, rating: 4.9, image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?Text=Sushi', category: 'Sushi', isVegetarian: false, tags: ['Non-Veg', 'Fresh', 'Seafood'] },
  { id: 'f9', name: 'Chocolate Lava Cake', price: 6.50, rating: 4.7, image: 'https://via.placeholder.com/300x200/D0021B/FFFFFF?Text=Cake', category: 'Desserts', isVegetarian: true, tags: ['Veg', 'Sweet'] },
  { id: 'f10', name: 'Butter Chicken', price: 15.00, rating: 4.8, image: 'https://via.placeholder.com/300x200/FF6B00/FFFFFF?Text=ButterC', category: 'Indian', isVegetarian: false, tags: ['Non-Veg', 'Rich'] },
];


const FoodGrid = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.ui.filters);
  const sortOptions = useSelector((state) => state.ui.sortOptions);
  // const userFavorites = useSelector((state) => state.user.profile?.favorites || []); // Assuming favorites are stored in user profile

  // Mock favorites state for now
  const [localFavorites, setLocalFavorites] = useState(['f1', 'f5']);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ id: item.id, name: item.name, price: item.price, image: item.image }));
  };

  const handleToggleFavorite = (itemId) => {
    // dispatch(toggleFavoriteItem(itemId)); // This would be the Redux action
    setLocalFavorites(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...allFoodItems];

    // Apply filters
    if (filters.searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    if (filters.vegetarian !== null) {
      items = items.filter(item => item.isVegetarian === filters.vegetarian);
    }
    if (filters.categories && filters.categories.length > 0) {
      items = items.filter(item => filters.categories.includes(item.category));
    }
    if (filters.priceRange) {
      items = items.filter(item => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]);
    }

    // Apply sorting
    // Example: sort by rating desc
    if (sortOptions.sortBy === 'rating' && sortOptions.sortOrder === 'desc') {
        items.sort((a, b) => b.rating - a.rating);
    } else if (sortOptions.sortBy === 'price' && sortOptions.sortOrder === 'asc') {
        items.sort((a, b) => a.price - b.price);
    } else if (sortOptions.sortBy === 'price' && sortOptions.sortOrder === 'desc') {
        items.sort((a, b) => b.price - a.price);
    } else if (sortOptions.sortBy === 'name' && sortOptions.sortOrder === 'asc') {
        items.sort((a,b) => a.name.localeCompare(b.name));
    }
    // Add more sort options as needed

    return items;
  }, [filters, sortOptions]);

  if (filteredAndSortedItems.length === 0) {
    return <p className="no-items-message container">No food items match your current filters. Try adjusting them!</p>;
  }

  return (
    <div className="food-grid-container container section-padding">
      <div className="food-grid">
        {filteredAndSortedItems.map(item => (
          <div className="food-card" key={item.id}>
            <div className="food-card-image-wrapper">
              <img src={item.image} alt={item.name} loading="lazy" />
              <button 
                className={`favorite-btn ${localFavorites.includes(item.id) ? 'favorited' : ''}`}
                onClick={() => handleToggleFavorite(item.id)}
                aria-label={localFavorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {localFavorites.includes(item.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <div className={`dietary-tag ${item.isVegetarian ? 'veg' : 'non-veg'}`}>
                {item.isVegetarian ? 'VEG' : 'NON-VEG'}
              </div>
            </div>
            <div className="food-card-content">
              <h4 className="food-card-name">{item.name}</h4>
              <div className="food-card-info">
                <span className="food-card-price">${item.price.toFixed(2)}</span>
                <div className="food-card-rating">
                  <FaStar /> {item.rating.toFixed(1)}
                </div>
              </div>
              {item.tags && item.tags.length > 0 && (
                <div className="food-card-tags">
                  {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              )}
              <button className="add-to-cart-quick-btn" onClick={() => handleAddToCart(item)}>
                <FaCartPlus /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGrid;