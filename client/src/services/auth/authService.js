
import axios from '../../api/axios';
import { handleAuthError } from '../../utils/errorUtils';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post('/users/register', userData);
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};
