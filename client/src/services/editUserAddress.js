import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/users/addresses';

// ✅ Get all addresses for the logged-in user
export const getAddress = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // returns address array
};

// ✅ Update a specific address for the logged-in user
export const updateAddress = async (addressId, addressData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_BASE_URL}/${addressId}`, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // updated address
};
