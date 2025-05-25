import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './PersonalizedHero.css';
// Placeholder for API service
// import { getUserProfile } from '../../services/apiService'; 

// Placeholder images - replace with your actual image paths or URLs
const heroBg1 = 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80';
const heroBg2 = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80';
const heroBg3 = 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80';

const backgroundImages = [heroBg1, heroBg2, heroBg3];

const PersonalizedHero = () => {
  const { profile } = useSelector((state) => state.user);
  // const [userData, setUserData] = useState(null); // For API fetched data
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Mock user data for now, replace with API call
  const mockUserData = {
    name: profile?.name || 'Valued Customer',
    lastOrders: [
      { id: 'lo1', name: 'Spicy Chicken Ramen', image: 'https://via.placeholder.com/100x80.png?text=Ramen' },
      { id: 'lo2', name: 'Avocado Toast Deluxe', image: 'https://via.placeholder.com/100x80.png?text=Toast' },
    ],
    seasonalSpecials: [
      { id: 'ss1', name: 'Summer Berry Salad', link: '/item/ss1' },
      { id: 'ss2', name: 'Mango Lassi Special', link: '/item/ss2' },
    ]
  };
  
  const userData = mockUserData; // Using mock data

  useEffect(() => {
    // Example: Fetch user data
    // const fetchProfile = async () => {
    //   try {
    //     const data = await getUserProfile(); // Replace with actual API call
    //     setUserData(data);
    //   } catch (error) {
    //     console.error("Failed to fetch user profile", error);
    //   }
    // };
    // if (profile?.id) fetchProfile(); // Fetch if user is logged in

    const intervalId = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [/* profile */]);


  return (
    <section 
      className="p-hero-section" 
      style={{ backgroundImage: `url(${backgroundImages[currentBgIndex]})` }}
    >
      <div className="p-hero-overlay"></div>
      <div className="container p-hero-content">
        <h1>Welcome back, {userData.name.split(' ')[0]}!</h1>
        <p className="p-hero-subtitle">Ready for your next delicious meal?</p>

        {userData.lastOrders && userData.lastOrders.length > 0 && (
          <div className="p-hero-last-ordered">
            <h2>Still thinking about these?</h2>
            <div className="last-ordered-items">
              {userData.lastOrders.map(item => (
                <div key={item.id} className="last-ordered-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <Link to="/reorder" className="btn-primary p-hero-cta">Quick Reorder</Link>
          </div>
        )}

        {userData.seasonalSpecials && userData.seasonalSpecials.length > 0 && (
           <div className="p-hero-seasonal">
            <h3>Seasonal Specials Just For You!</h3>
            <ul>
              {userData.seasonalSpecials.map(special => (
                <li key={special.id}><Link to={special.link}>{special.name}</Link></li>
              ))}
            </ul>
          </div>
        )}
         {!userData.lastOrders?.length && !userData.seasonalSpecials?.length && (
            <Link to="/categories" className="btn-primary p-hero-cta explore-now">Explore Menu</Link>
        )}
      </div>
    </section>
  );
};

export default PersonalizedHero;