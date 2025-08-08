
import { createSlice } from '@reduxjs/toolkit';
import { fetchEarningsSummary, fetchPayoutHistory, fetchTransactions, requestPayout } from './earningThunks';


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

