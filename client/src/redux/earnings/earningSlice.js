import { createSlice } from '@reduxjs/toolkit';
import { fetchEarningsSummary, fetchTransactions, requestProviderPayout } from './earningThunks';

const initialState = {
  summary: {
    todayEarnings: 0,
    weekEarnings: 0,
    monthEarnings: 0,
    totalEarnings: 0,
  },
  transactions: [],
  loading: false,
  error: null,
  payoutSuccess: false,
};

const earningSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    clearEarningError: (state) => {
      state.error = null;
    },
    clearPayoutSuccess: (state) => {
      state.payoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Earnings Summary
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
        state.error = action.payload || 'Failed to fetch earnings summary';
      })
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch transactions';
      })
      // Request Payout
      .addCase(requestProviderPayout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.payoutSuccess = false;
      })
      .addCase(requestProviderPayout.fulfilled, (state) => {
        state.loading = false;
        state.payoutSuccess = true;
      })
      .addCase(requestProviderPayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to request payout';
        state.payoutSuccess = false;
      });
  },
});

export const { clearEarningError, clearPayoutSuccess } = earningSlice.actions;
export default earningSlice.reducer;
