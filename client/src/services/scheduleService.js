import axios from '../api/axios';
import { handleAuthError } from '../utils/errorUtils';

const extractData = (response) => response?.data;

export const fetchProviderSchedule = async (providerId, date) => {
  try {
    const response = await axios.get(`/providers/${providerId}/schedule`, {
      params: { date: date.toISOString().split('T')[0] }, // YYYY-MM-DD
    });
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const fetchProviderWorkingHours = async (providerId) => {
  try {
    const response = await axios.get(`/providers/${providerId}/working-hours`);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateProviderWorkingHours = async (providerId, workingHoursData) => {
  try {
    const response = await axios.put(`/providers/${providerId}/working-hours`, workingHoursData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};

export const addBlockedTimeSlot = async (providerId, slotData) => {
  try {
    const response = await axios.post(`/providers/${providerId}/blocked-slots`, slotData);
    return extractData(response);
  } catch (error) {
    handleAuthError(error);
  }
};
