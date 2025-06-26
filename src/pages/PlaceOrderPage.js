import React, { useState } from 'react';
import { placeOrder } from '../api/orders';

const PlaceOrderPage = () => {
  const [form, setForm] = useState({ /* Add your order fields here */ });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // You may need to adjust the payload structure to match your backend
      const response = await placeOrder(form);
      setSuccess('Order placed successfully!');
    } catch (err) {
      setError('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your order fields here, e.g. */}
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={form.itemName || ''}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity || ''}
          onChange={handleChange}
          required
        />
        {/* Add more fields as needed */}
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default PlaceOrderPage; 