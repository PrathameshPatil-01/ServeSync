import axios from '../../api/axios';
import { handleAuthError } from '../../utils/errorUtils';

const extractData = (response) => response?.data;

export const fetchProviderEarningsSummary = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}/earnings/summary`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const fetchProviderTransactions = async (providerId, filters = {}) => {
  try {
    const response = await axios.get(`/providers/${providerId}/earnings/transactions`, {
      params: filters,
    });
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const requestPayout = async (providerId, amount) => {
  try {
    const response = await axios.post(`/providers/${providerId}/payouts/request`, { amount });
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};
