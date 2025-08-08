import axiosInstance from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks for Earnings
export const fetchEarningsSummary = createAsyncThunk(
  'earning/fetchSummary',
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/earnings/provider/${providerId}/summary`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch earnings summary';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'earning/fetchTransactions',
  async ({ providerId, startDate, endDate, pageable }, { rejectWithValue }) => {
    try {
      const params = { ...pageable };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      const response = await axiosInstance.get(`/earnings/provider/${providerId}/transactions`, { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch transactions';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestPayout = createAsyncThunk(
  'earning/requestPayout',
  async ({ providerId, amount }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/earnings/provider/${providerId}/payout-requests`, { amount });
      toast.success('Payout request submitted successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to request payout';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchPayoutHistory = createAsyncThunk(
  'earning/fetchPayoutHistory',
  async ({ providerId, pageable }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/earnings/provider/${providerId}/payout-history`, { params: pageable });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch payout history';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);