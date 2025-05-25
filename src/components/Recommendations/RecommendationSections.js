import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus } from 'react-icons/fa';
import './RecommendationSections.css';

// Mock data - replace with API calls
const mockRecommendations = {
  continueTaste: [
    { id: 'f3', name: 'Chicken Burger', price: 9.75, image: 'https://via.placeholder.com/200x150/D0021B/FFFFFF?Text=Burger' },
    { id: 'f6', name: 'Spaghetti Carbonara', price: 13.25, image: 'https://via.placeholder.com/200x150/FF6B00/FFFFFF?Text=Pasta' },
    { id: 'f1', name: 'Margherita Pizza', price: 12.99, image: 'https://via.placeholder.com/200x150/FF9500/FFFFFF?Text=Pizza+M' },
    { id: 'f9', name: 'Chocolate Lava Cake', price: 6.50, image: 'https://via.placeholder.com/200x150/D0021B/FFFFFF?Text=Cake' },
  ],
  recommendedForYou: [
    { id: 'f7', name: 'Paneer Tikka', price: 11.00, image: 'https://via.placeholder.com/200x150/FF9500/FFFFFF?Text=Paneer', rating: 4.6 },
    { id: 'f4', name: 'Veggie Burger', price: 8.99, image: 'https://via.placeholder.com/200x150/00A651/FFFFFF?Text=VegBurger', rating: 4.0 },
    { id: 'f10', name: 'Butter Chicken', price: 15.00, image: 'https://via.placeholder.com/200x150/FF6B00/FFFFFF?Text=ButterC', rating: 4.8 },
    { id: 'f5', name: 'Caesar Salad', price: 7.50, image: 'https://via.placeholder.com/200x150/007AFF/FFFFFF?Text=Salad', rating: 4.3 },
  ],
  newTryOuts: [
    { id: 'f11', name: 'Avocado Sushi Roll', price: 10.50, image: 'https://via.placeholder.com/200x150/00A651/FFFFFF?Text=SushiNew' },
    { id: 'f12', name: 'Quinoa Salad Bowl', price: 9.00, image: 'https://via.placeholder.com/200x150/007AFF/FFFFFF?Text=Quinoa' },
    { id: 'f13', name: 'Matcha Latte', price: 5.50, image: 'https://via.placeholder.com/200x150/FF9500/FFFFFF?Text=Matcha' },
    { id: 'f14', name: 'Korean BBQ Wings', price: 12.00, image: 'https://via.placeholder.com/200x150/D0021B/FFFFFF?Text=Wings' },
  ],
  popularNearYou: [ // Assuming location data would filter this
    { id: 'f2', name: 'Pepperoni Pizza', price: 14.50, image: 'https://via.placeholder.com/200x150/FF9500/FFFFFF?Text=Pizza+P', distance: '1.2km' },
    { id: 'f8', name: 'Sushi Platter', price: 18.99, image: 'https://via.placeholder.com/200x150/007AFF/FFFFFF?Text=Sushi', distance: '0.8km' },
    { id: 'f3', name: 'Chicken Burger', price: 9.75, image: 'https://via.placeholder.com/200x150/D0021B/FFFFFF?Text=Burger', distance: '2.1km' },
    { id: 'f7', name: 'Paneer Tikka', price: 11.00, image: 'https://via.placeholder.com/200x150/FF9500/FFFFFF?Text=Paneer', distance: '1.5km' },
  ]
};

const RecommendationRow = ({ title, items, onAddToCart }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="recommendation-row">
      <h3 className="recommendation-title">{title}</h3>
      <div className="recommendation-scroll-container">
        {items.map(item => (
          <div className="reco-item-card" key={item.id}>
            <Link to={`/item/${item.id}`} className="reco-item-image-link"> {/* Assuming /item/:id route */}
              <img src={item.image} alt={item.name} loading="lazy" />
            </Link>
            <div className="reco-item-content">
              <Link to={`/item/${item.id}`}>
                <h4 className="reco-item-name">{item.name}</h4>
              </Link>
              <div className="reco-item-details">
                <span className="reco-item-price">${item.price.toFixed(2)}</span>
                {item.rating && <span className="reco-item-rating"><FaStar /> {item.rating.toFixed(1)}</span>}
                {item.distance && <span className="reco-item-distance">{item.distance}</span>}
              </div>
              <button className="reco-add-to-cart-btn" onClick={() => onAddToCart(item)}>
                <FaCartPlus /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const RecommendationSections = () => {
  // In a real app, fetch data using useEffect and dispatch to Redux or use local state
  // const dispatch = useDispatch();
  // const recommendations = useSelector(state => state.food.recommendations); // Example

  const handleAddToCart = (item) => {
    // dispatch(addItemToCart({ id: item.id, name: item.name, price: item.price, image: item.image }));
    console.log("Adding to cart (from reco):", item);
  };

  return (
    <div className="recommendation-sections-container container section-padding">
      <RecommendationRow title="Continue Your Taste Journey" items={mockRecommendations.continueTaste} onAddToCart={handleAddToCart} />
      <RecommendationRow title="Recommended For You" items={mockRecommendations.recommendedForYou} onAddToCart={handleAddToCart} />
      <RecommendationRow title="New Try-Outs" items={mockRecommendations.newTryOuts} onAddToCart={handleAddToCart} />
      <RecommendationRow title="Popular Near You" items={mockRecommendations.popularNearYou} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default RecommendationSections;