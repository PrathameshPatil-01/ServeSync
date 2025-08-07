import axios from '../api/axios';
import { handleAuthError } from '../utils/errorUtils';

const extractData = (response) => response?.data;

export const fetchProviderServices = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}/services`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const createProviderService = async (providerId, serviceData) => {
  try {
    const response = await axios.post(`/providers/${providerId}/services`, serviceData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateProviderService = async (serviceId, updateData) => {
  try {
    const response = await axios.put(`/services/${serviceId}`, updateData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const deleteProviderService = async (serviceId) => {
  try {
    const response = await axios.delete(`/services/${serviceId}`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};
