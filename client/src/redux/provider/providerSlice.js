import { createSlice } from '@reduxjs/toolkit';
import { fetchProvider, fetchProviderDashboardStats, updateProvider } from './providerThunks';

const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    provider: null,
    dashboardStats: null, // Added for dashboard stats
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProviderError: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Provider Profile
      .addCase(fetchProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
      })
      .addCase(fetchProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Provider Profile
      .addCase(updateProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
        state.success = true;
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Fetch Provider Dashboard Stats
      .addCase(fetchProviderDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchProviderDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProviderError } = providerSlice.actions;
export default providerSlice.reducer;

