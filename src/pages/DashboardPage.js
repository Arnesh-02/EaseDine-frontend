import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PersonalizedHero from '../components/Hero/PersonalizedHero';
import EnhancedFoodFilter from '../components/Filters/EnhancedFoodFilter';
import FoodGrid from '../components/FoodGrid/FoodGrid';
import RecommendationSections from '../components/Recommendations/RecommendationSections';
// Import other post-login components here as they are created
import { loginUser } from '../store/userSlice'; // For testing login flow

const DashboardPage = () => {
  const dispatch = useDispatch();

  // TEMPORARY: Simulate login for testing purposes
  // In a real app, this would happen after a login form submission
  useEffect(() => {
    // Mock user data - replace with actual data from your login process
    const mockUserProfile = {
      id: 'user123',
      name: 'Asha K.',
      email: 'asha.k@example.com',
      avatar: 'https://via.placeholder.com/100/FF6B00/FFFFFF?Text=A', // Orange bg, white text
      lastOrders: [
        { id: 'lo1', name: 'Veggie Delight Pizza', image: 'https://via.placeholder.com/100x80.png?text=Pizza' },
        { id: 'lo2', name: 'Paneer Tikka Masala', image: 'https://via.placeholder.com/100x80.png?text=Paneer' },
      ],
      preferences: {
        vegetarian: true,
        favoriteCuisines: ["Indian", "Italian"]
      },
      seasonalSpecials: [ // Added this to match PersonalizedHero's expectation
        { id: 'ss1', name: 'Monsoon Special Thali', link: '/item/ss1' },
        { id: 'ss2', name: 'Summer Cooler Mocktail', link: '/item/ss2' },
      ]
    };
    dispatch(loginUser(mockUserProfile));
  }, [dispatch]);


  return (
    <div className="dashboard-page">
      <PersonalizedHero />
      <EnhancedFoodFilter />
      <FoodGrid />
      <RecommendationSections />
      {/* Placeholder for other sections if any */}
      {/* <div className="container section-padding">
        <h2>More Content</h2>
        <p>Additional dashboard content can go here.</p>
      </div> */}
    </div>
  );
};

export default DashboardPage;