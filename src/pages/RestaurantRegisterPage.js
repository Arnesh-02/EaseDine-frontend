import React, { useState } from 'react';
import { registerRestaurant } from '../api/restaurant';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

const RestaurantRegisterPage = () => {
  const [form, setForm] = useState({
    rname: '',
    address: '',
    email: '',
    password: '',
    pno: '',
    category: '',
    starRating: '',
    cuisines: '',
    description: '',
    openingHours: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      await registerRestaurant(payload);
      setSuccess('Registration successful! Redirecting to homepage...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">Fdelivery</div>
        <h1>Restaurant Registration</h1>
        {success && <div style={{ color: 'green' }}>{success}</div>}
        {error && <div className="auth-error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="rname" placeholder="Restaurant Name" value={form.rname} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="pno" placeholder="Phone Number" value={form.pno} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="number" step="0.1" name="starRating" placeholder="Star Rating" value={form.starRating} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="cuisines" placeholder="Cuisines (comma separated)" value={form.cuisines} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="openingHours" placeholder="Opening Hours" value={form.openingHours} onChange={handleChange} required />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <div className="auth-redirect">
          Already have a restaurant account? <Link to="/restaurant/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegisterPage; 