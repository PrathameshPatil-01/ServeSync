import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProviderServices,
  createProviderService,
  updateProviderService,
  deleteProviderService,
} from '@/services/serviceService';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (providerId, { rejectWithValue }) => {
    try {
      const services = await fetchProviderServices(providerId);
      return services;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch services');
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async ({ providerId, serviceData }, { rejectWithValue }) => {
    try {
      const newService = await createProviderService(providerId, serviceData);
      return newService;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ serviceId, updateData }, { rejectWithValue }) => {
    try {
      const updatedService = await updateProviderService(serviceId, updateData);
      return updatedService;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (serviceId, { rejectWithValue }) => {
    try {
      await deleteProviderService(serviceId);
      return serviceId; // Return the ID of the deleted service
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete service');
    }
  }
);
