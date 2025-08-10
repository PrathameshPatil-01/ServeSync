import axios from 'axios';

const API_URL = 'http://localhost:8080/api/address';

// Fetch the user's address
export const getAddress = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};

// Save or update the user's address
export const saveAddress = async (token, addressData) => {
  try {
    const response = await axios.post(API_URL, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // If API returns array, pick first; else return object
    if (Array.isArray(response.data)) {
      return response.data[0] || {};
    }
    return response.data || {};
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};
