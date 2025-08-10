import axiosInstance from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks for Provider Service Offers
export const fetchProviderServiceOffers = createAsyncThunk(
  'providerServiceOffer/fetchOffers',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/provider-service-offers/provider/${providerId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch service offers';
      return rejectWithValue(message);
    }
  }
);

export const addProviderServiceOffer = createAsyncThunk(
  'providerServiceOffer/addOffer',
  async ({ providerId, offerData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/provider-service-offers/provider/${providerId}`, offerData);
      toast.success('Service offer added successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to add service offer';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateProviderServiceOffer = createAsyncThunk(
  'providerServiceOffer/updateOffer',
  async ({ offerId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/provider-service-offers/${offerId}`, updateData);
      toast.success('Service offer updated successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update service offer';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteProviderServiceOffer = createAsyncThunk(
  'providerServiceOffer/deleteOffer',
  async (offerId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/provider-service-offers/${offerId}`);
      toast.success('Service offer deleted successfully!');
      return offerId; // Return the ID of the deleted item
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete service offer';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);