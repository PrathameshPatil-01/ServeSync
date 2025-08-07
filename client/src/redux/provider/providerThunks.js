import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerProvider as registerProviderService,
  fetchProvider as fetchProviderService,
  updateProvider as updateProviderService,
  fetchProviderDashboardStats,
} from '@/services/providerService.js';

export const registerProvider = createAsyncThunk(
  'provider/register',
  async (providerData, { rejectWithValue }) => {
    try {
      const response = await registerProviderService(providerData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Provider registration failed');
    }
  }
);

export const fetchProvider = createAsyncThunk(
  'provider/fetch',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await fetchProviderService(providerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Fetching provider failed');
    }
  }
);

export const updateProvider = createAsyncThunk(
  'provider/update',
  async ({ providerId, updateData }, { rejectWithValue }) => {
    try {
      const response = await updateProviderService(providerId, updateData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Updating provider failed');
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'provider/fetchDashboardStats',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await fetchProviderDashboardStats(providerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard stats');
    }
  }
);
