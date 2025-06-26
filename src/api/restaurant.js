import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/restaurant'; // Adjust if needed

export const registerRestaurant = async (restaurantData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, restaurantData);
  return response.data;
};

export const loginRestaurant = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, null, {
    params: { email, password },
  });
  return response.data;
};

export const getAllRestaurants = async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateRestaurant = async (id, restaurantData) => {
  const response = await axios.put(`${API_BASE_URL}/update/${id}`, restaurantData);
  return response.data;
};

export const deleteRestaurant = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data;
}; 