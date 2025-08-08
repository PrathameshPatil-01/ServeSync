import axiosInstance from '@/api/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

// Slice
const earningSlice = createSlice({
  name: 'earning',
  initialState: {
    summary: null,
    transactions: [],
    payoutHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearEarningError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Summary
      .addCase(fetchEarningsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEarningsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchEarningsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.content;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Request Payout
      .addCase(requestPayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        state.loading = false;
        state.payoutHistory.unshift(action.payload); // Add new payout to history
        // Optionally update availableForPayout in summary
        if (state.summary) {
          state.summary.availableForPayout = state.summary.availableForPayout.minus(action.payload.amount);
          state.summary.pendingPayouts = state.summary.pendingPayouts.plus(action.payload.amount);
        }
      })
      .addCase(requestPayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Payout History
      .addCase(fetchPayoutHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayoutHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payoutHistory = action.payload.content;
      })
      .addCase(fetchPayoutHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEarningError } = earningSlice.actions;
export default earningSlice.reducer;

