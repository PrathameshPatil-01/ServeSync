import axios from '../../api/axios';
import { handleAuthError } from '../../utils/errorUtils';

const extractData = (response) => response?.data;

export const fetchProviderOrders = async (providerId, status = 'all', searchTerm = '') => {
  try {
    const response = await axios.get(`/providers/${providerId}/orders`, {
      params: { status, searchTerm },
    });
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.patch(`/orders/${orderId}/status`, { status: newStatus });
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};
