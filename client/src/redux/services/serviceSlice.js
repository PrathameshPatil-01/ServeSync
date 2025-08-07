import { createSlice } from '@reduxjs/toolkit';
import { fetchServices, createService, updateService, deleteService } from './serviceThunks';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch services';
      })
      // Create Service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create service';
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedService = action.payload;
        state.services = state.services.map((service) =>
          service.id === updatedService.id ? updatedService : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update service';
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter((service) => service.id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete service';
      });
  },
});

export const { clearServiceError } = serviceSlice.actions;
export default serviceSlice.reducer;
