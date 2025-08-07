import { createSlice } from '@reduxjs/toolkit';
import { registerProvider, fetchProvider, updateProvider, fetchDashboardStats } from './providerThunks';

const initialState = {
  loading: false,
  success: false,
  error: null,
  provider: null,
  dashboardStats: {
    totalBookings: 0,
    pendingOrders: 0,
    totalEarnings: 0,
    upcomingAppointments: 0,
  },
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    resetProviderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.provider = null;
      state.dashboardStats = initialState.dashboardStats;
    },
    clearProviderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Provider
      .addCase(registerProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.provider = action.payload;
      })
      .addCase(registerProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      })
      // Fetch Provider
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
        state.error = action.payload || 'Failed to fetch provider data';
      })
      // Update Provider
      .addCase(updateProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.provider = action.payload;
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update provider data';
        state.success = false;
      })
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dashboard stats';
      });
  },
});

export const { resetProviderState, clearProviderError } = providerSlice.actions;
export default providerSlice.reducer;
