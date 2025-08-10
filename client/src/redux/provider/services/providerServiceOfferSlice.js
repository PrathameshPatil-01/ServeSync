import { createSlice } from '@reduxjs/toolkit';
import { addProviderServiceOffer, deleteProviderServiceOffer, fetchProviderServiceOffers, updateProviderServiceOffer } from './providerServiceOfferThunks.js';

// Slice
const providerServiceOfferSlice = createSlice({
  name: 'providerServiceOffer',
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceOfferError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProviderServiceOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderServiceOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchProviderServiceOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addProviderServiceOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProviderServiceOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers.push(action.payload);
      })
      .addCase(addProviderServiceOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateProviderServiceOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProviderServiceOffer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.offers.findIndex(offer => offer.id === action.payload.id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
      })
      .addCase(updateProviderServiceOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteProviderServiceOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProviderServiceOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = state.offers.filter(offer => offer.id !== action.payload);
      })
      .addCase(deleteProviderServiceOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearServiceOfferError } = providerServiceOfferSlice.actions;
export default providerServiceOfferSlice.reducer;

