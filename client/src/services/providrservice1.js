
// src/services/providerService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/providers';

export const fetchAllProviders = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Provider API response:", response.data);
    
    // If API response is { data: [...] }
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data.data)) return response.data.data;

    return []; // fallback if nothing is correct
  } catch (error) {
    console.error('Error fetching providers:', error);
    throw error;
  }
};
