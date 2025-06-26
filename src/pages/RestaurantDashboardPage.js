import React, { useState, useEffect } from 'react';
import { updateRestaurant, deleteRestaurant } from '../api/restaurant';
import { useNavigate } from 'react-router-dom';

const RestaurantDashboardPage = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('restaurant');
    if (!stored) {
      navigate('/restaurant/login');
      return;
    }
    const rest = JSON.parse(stored);
    setRestaurant(rest);
    setForm({ ...rest, cuisines: (rest.cuisines || []).join(', ') });
  }, [navigate]);

  if (!form) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...form,
        starRating: parseFloat(form.starRating),
        cuisines: form.cuisines.split(',').map(c => c.trim()),
      };
      const updated = await updateRestaurant(form.resId, payload);
      setSuccess('Update successful!');
      setRestaurant(updated);
      localStorage.setItem('restaurant', JSON.stringify(updated));
    } catch (err) {
      setError('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteRestaurant(form.resId);
      localStorage.removeItem('restaurant');
      navigate('/restaurant/login');
    } catch (err) {
      setError('Delete failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Restaurant Dashboard</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="rname" placeholder="Restaurant Name" value={form.rname} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="pno" placeholder="Phone Number" value={form.pno} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input type="number" step="0.1" name="starRating" placeholder="Star Rating" value={form.starRating} onChange={handleChange} required />
        <input type="text" name="cuisines" placeholder="Cuisines (comma separated)" value={form.cuisines} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="text" name="openingHours" placeholder="Opening Hours" value={form.openingHours} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: '1rem', color: 'red' }} disabled={loading}>Delete Restaurant</button>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default RestaurantDashboardPage; 