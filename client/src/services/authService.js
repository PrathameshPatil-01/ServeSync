// src/services/authService.js
import axios from 'axios';

const BASE_URL = '/api/auth';

export default {
  login: (data) => axios.post(`${BASE_URL}/login`, data),
  signup: (data) => axios.post(`${BASE_URL}/signup`, data),
  forgotPassword: (email) => axios.post(`${BASE_URL}/forgot-password`, { email }),
};


// // src/services/authService.js
// import axios from '../api/axios';

// export const loginUser = async (credentials) => {
//   const res = await axios.post('/auth/login', credentials);
//   return res.data;
// };

// export const registerUser = async (userData) => {
//   const res = await axios.post('/auth/signup', userData);
//   return res.data;
// };

// export const forgotPassword = async (email) => {
//   const res = await axios.post('/auth/forgot-password', { email });
//   return res.data;
// };
