import React, { useState } from 'react';
import { loginRestaurant } from '../api/restaurant';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

const RestaurantLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const restaurant = await loginRestaurant(form.email, form.password);
      localStorage.setItem('restaurant', JSON.stringify(restaurant));
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">Fdelivery</div>
        <h1>Restaurant Login</h1>
        {error && <div className="auth-error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-redirect">
          Don't have a restaurant account? <Link to="/restaurant/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLoginPage; 