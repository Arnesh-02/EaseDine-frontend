import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/orders'; // Change base URL if needed

export const placeOrder = async (orderRequestDTO) => {
  const response = await axios.post(`${API_BASE_URL}/placeOrder`, orderRequestDTO);
  return response.data;
};

export const getOrdersByUserId = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/${userId}`);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.delete(`${API_BASE_URL}/cancelOrder/${orderId}`);
  return response.data;
}; 