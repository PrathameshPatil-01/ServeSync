import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust based on your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
