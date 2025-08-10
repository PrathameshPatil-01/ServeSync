// src/services/providerService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/providers';

// ✅ Call to /all-users-with-services
export const fetchAllUsersWithServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all-users-with-services`);
    console.log("All Users With Services API response:", response.data);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching users with services:', error);
    throw error;
  }
};
