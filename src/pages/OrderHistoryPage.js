import React, { useEffect, useState } from 'react';
import { getOrdersByUserId, cancelOrder } from '../api/orders';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Adjust as needed for your auth

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId(userId);
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setOrders(orders.filter(order => order.orderId !== orderId));
    } catch (err) {
      alert('Failed to cancel order');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.orderId} style={{ marginBottom: '1rem' }}>
              <div>Order ID: {order.orderId}</div>
              <div>Status: {order.status}</div>
              {/* Add more order details as needed */}
              <button onClick={() => handleCancel(order.orderId)} disabled={order.status === 'CANCELLED'}>
                Cancel Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage; 