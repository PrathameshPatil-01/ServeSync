import axios from '../api/axios';
import { handleAuthError } from '../utils/errorUtils';

const extractData = (response) => response?.data;

export const registerProvider = async (providerData) => {
  try {
    const response = await axios.post('/providers', providerData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const fetchProvider = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateProvider = async (providerId, updateData) => {
  try {
    const response = await axios.put(`/providers/${providerId}`, updateData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const fetchProviderDashboardStats = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}/dashboard-stats`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};
