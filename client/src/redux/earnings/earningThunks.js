import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProviderEarningsSummary, fetchProviderTransactions, requestPayout } from '@/services/earningService';

export const fetchEarningsSummary = createAsyncThunk(
  'earnings/fetchSummary',
  async (providerId, { rejectWithValue }) => {
    try {
      const summary = await fetchProviderEarningsSummary(providerId);
      return summary;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch earnings summary');
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'earnings/fetchTransactions',
  async ({ providerId, filters }, { rejectWithValue }) => {
    try {
      const transactions = await fetchProviderTransactions(providerId, filters);
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  }
);

export const requestProviderPayout = createAsyncThunk(
  'earnings/requestPayout',
  async ({ providerId, amount }, { rejectWithValue }) => {
    try {
      const result = await requestPayout(providerId, amount);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to request payout');
    }
  }
);
