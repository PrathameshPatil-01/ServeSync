import axios from '../api/axios';

// LOGIN
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// SIGNUP
export const signupUser = async (userData) => {
  try {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

// ✅ Optional centralized error handler
const handleAuthError = (error) => {
  // Optionally log or customize error
  if (error.response) {
    // Server responded with a status code outside 2xx
    throw new Error(error.response.data.message || 'Authentication failed');
  } else if (error.request) {
    // No response received
    throw new Error('No response from server. Please check your connection.');
  } else {
    // Other errors
    throw new Error(error.message || 'An error occurred');
  }
};
