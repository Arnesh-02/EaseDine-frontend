import React, { useEffect, useState } from 'react';
import { getAllRestaurants } from '../api/restaurant';
import { Link } from 'react-router-dom';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>All Restaurants</h2>
      <ul>
        {restaurants.map(r => (
          <li key={r.resId}>
            <Link to={`/restaurant/${r.resId}`}>{r.rname}</Link> - {r.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantListPage; 