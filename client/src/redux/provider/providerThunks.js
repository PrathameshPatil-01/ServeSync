import axiosInstance from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch current provider's profile
export const fetchProvider = createAsyncThunk(
  'provider/fetchProvider',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/providers/current');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch provider profile';
      return rejectWithValue(message);
    }
  }
);

// Update provider's profile
export const updateProvider = createAsyncThunk(
  'provider/updateProvider',
  async ({ providerId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/providers/${providerId}`, updateData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update provider profile';
      return rejectWithValue(message);
    }
  }
);

// Fetch provider dashboard statistics
export const fetchProviderDashboardStats = createAsyncThunk(
  'provider/fetchDashboardStats',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/earnings/provider/${providerId}/summary`); // Using earnings summary for now
      // The backend endpoint for dashboard stats is /api/providers/{providerId}/dashboard-stats
      // Let's use that if it's available, otherwise, adapt.
      // Assuming the backend provides a dedicated dashboard stats endpoint:
      console.log(response.data);
      const dashboardResponse = await axiosInstance.get(`/providers/${providerId}/dashboard-stats`);
      return dashboardResponse.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch dashboard stats';
      return rejectWithValue(message);
    }
  }
);

