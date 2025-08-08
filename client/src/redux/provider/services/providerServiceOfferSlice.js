import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

