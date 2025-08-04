import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
