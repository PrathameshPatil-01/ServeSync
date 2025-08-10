import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/address';

// ✅ Get all addresses for the logged-in user
export const getAddress = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // should be an array or single object
};

// ✅ Save or update address (auto-decides POST or PUT)
export const saveOrUpdateAddress = async (addressData, existingAddressId = null) => {
  const token = localStorage.getItem('token');

  // If we have an existing address ID → PUT (update), else → POST (create)
  if (existingAddressId) {
    // Update existing address
    const response = await axios.put(`${API_BASE_URL}/${existingAddressId}`, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } else {
    // Create new address
    const response = await axios.post(API_BASE_URL, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
};
