import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/address';

// Get all addresses for the logged-in user
export const getAddress = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // array of addresses
};

const API_URL_UPDATE = 'http://localhost:8080/api/address';

// Update user address
export const updateAddress = async (addressData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL_UPDATE, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
