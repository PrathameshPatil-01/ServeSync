import { fetchProviderOrders, updateOrderStatus } from '@/services/provider/orderService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ providerId, status, searchTerm }, { rejectWithValue }) => {
    try {
      const orders = await fetchProviderOrders(providerId, status, searchTerm);
      return orders;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      return updatedOrder;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update order status');
    }
  }
);
