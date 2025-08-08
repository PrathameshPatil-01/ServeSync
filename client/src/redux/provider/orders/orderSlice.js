import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks for Orders
export const fetchProviderOrders = createAsyncThunk(
  'order/fetchProviderOrders',
  async ({ providerId, status, pageable }, { rejectWithValue }) => {
    try {
      const params = { ...pageable };
      if (status && status !== 'all') {
        params.status = status.toUpperCase();
      }
      const response = await axiosInstance.get(`/orders/provider/${providerId}`, { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch orders';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, null, { params: { status: status.toUpperCase() } });
      toast.success(`Order #${orderId} status updated to ${status}!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update order status';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    totalElements: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchProviderOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProviderOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;

