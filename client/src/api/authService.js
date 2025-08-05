// src/services/authService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users'; // ✅ Correct base URL

const authService = {
  login: async (credentials) => {
    const res = await axios.post(`${API_BASE_URL}/login`, credentials); // ✅ /login endpoint
    return res;
  },
  signup: async (userData) => {
    const res = await axios.post(`${API_BASE_URL}/register`, userData); // ✅ /register endpoint
    return res;
  },
};

export default authService;
