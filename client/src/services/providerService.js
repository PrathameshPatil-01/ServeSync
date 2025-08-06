import axios from '../api/axios';

const extractData = (response) => response?.data;

const extractErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'An unexpected provider service error occurred'
  );
};

export const registerProvider = async (providerData) => {
  try {
    const response = await axios.post('/providers', providerData);
    return extractData(response);
  } catch (error) {
    // Optionally you can centralize error logging here
    throw new Error(extractErrorMessage(error));
  }
};

// Example extras you might need later
export const fetchProvider = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}`);
    return extractData(response);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateProvider = async (providerId, updateData) => {
  try {
    const response = await axios.put(`/providers/${providerId}`, updateData);
    return extractData(response);
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
