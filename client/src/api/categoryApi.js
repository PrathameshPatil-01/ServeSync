// categoryApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/services';

// ✅ This must be named exactly like what you're importing
export const getAllCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
