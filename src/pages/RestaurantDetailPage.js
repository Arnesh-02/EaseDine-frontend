import React, { useEffect, useState } from 'react';
import { getRestaurantById } from '../api/restaurant';
import { useParams } from 'react-router-dom';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        setError('Failed to load restaurant.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!restaurant) return <div>Not found.</div>;

  return (
    <div>
      <h2>{restaurant.rname}</h2>
      <div><strong>Address:</strong> {restaurant.address}</div>
      <div><strong>Email:</strong> {restaurant.email}</div>
      <div><strong>Phone:</strong> {restaurant.pno}</div>
      <div><strong>Category:</strong> {restaurant.category}</div>
      <div><strong>Star Rating:</strong> {restaurant.starRating}</div>
      <div><strong>Cuisines:</strong> {(restaurant.cuisines || []).join(', ')}</div>
      <div><strong>Description:</strong> {restaurant.description}</div>
      <div><strong>Opening Hours:</strong> {restaurant.openingHours}</div>
    </div>
  );
};

export default RestaurantDetailPage; 