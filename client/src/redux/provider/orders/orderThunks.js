// src/features/order/orderThunks.js
import axiosInstance from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// ---------------------------
// CREATE ORDER (Customer)
// ---------------------------
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/orders', orderData);
      toast.success('Order created successfully!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// GET ORDER BY ID
// ---------------------------
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// UPDATE ORDER (Customer)
// ---------------------------
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, orderData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}`, orderData);
      toast.success(`Order #${orderId} updated successfully!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// DELETE ORDER (Customer)
// ---------------------------
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
      toast.success(`Order #${orderId} deleted successfully!`);
      return orderId;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// UPDATE ORDER STATUS (Generic)
// ---------------------------
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, null, {
        params: { status: status.toUpperCase() },
      });
      toast.success(`Order #${orderId} status updated to ${status}!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update order status';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// PROVIDER ACTIONS
// ---------------------------
export const acceptOrder = createAsyncThunk(
  'order/acceptOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/accept`);
      toast.success(`Order #${orderId} accepted!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to accept order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const rejectOrder = createAsyncThunk(
  'order/rejectOrder',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/reject`, null, {
        params: { reason },
      });
      toast.success(`Order #${orderId} rejected!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to reject order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const markOrderInProgress = createAsyncThunk(
  'order/markInProgress',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/start`);
      toast.success(`Order #${orderId} marked as In Progress!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to mark as in progress';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const markOrderCompleted = createAsyncThunk(
  'order/markCompleted',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/complete`);
      toast.success(`Order #${orderId} marked as Completed!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to mark as completed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// CUSTOMER ACTIONS
// ---------------------------
export const cancelOrderByCustomer = createAsyncThunk(
  'order/cancelByCustomer',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/cancel`, null, {
        params: { reason },
      });
      toast.success(`Order #${orderId} canceled!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to cancel order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const requestOrderModification = createAsyncThunk(
  'order/requestModification',
  async ({ orderId, orderData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/modify`, orderData);
      toast.success(`Order #${orderId} modification requested!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to request modification';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// ADMIN ACTIONS
// ---------------------------
export const reassignOrder = createAsyncThunk(
  'order/reassignOrder',
  async ({ orderId, newProviderId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/reassign`, null, {
        params: { newProviderId },
      });
      toast.success(`Order #${orderId} reassigned successfully!`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to reassign order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forceCancelOrder = createAsyncThunk(
  'order/forceCancelOrder',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/orders/${orderId}/force-cancel`, null, {
        params: { reason },
      });
      toast.success(`Order #${orderId} force-canceled successfully!`);
      return orderId;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to force cancel order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ---------------------------
// LIST ORDERS
// ---------------------------
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
      const message = error.response?.data?.message || error.message || 'Failed to fetch provider orders';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCustomerOrders = createAsyncThunk(
  'order/fetchCustomerOrders',
  async ({ customerId, status, pageable }, { rejectWithValue }) => {
    try {
      const params = { ...pageable };
      if (status && status !== 'all') {
        params.status = status.toUpperCase();
      }
      const response = await axiosInstance.get(`/orders/customer/${customerId}`, { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch customer orders';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const searchOrders = createAsyncThunk(
  'order/searchOrders',
  async ({ keyword, status, pageable }, { rejectWithValue }) => {
    try {
      const params = { keyword, ...pageable };
      if (status && status !== 'all') {
        params.status = status.toUpperCase();
      }
      const response = await axiosInstance.get('/orders/search', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to search orders';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ status, pageable }, { rejectWithValue }) => {
    try {
      const params = { ...pageable };
      if (status && status !== 'all') {
        params.status = status.toUpperCase();
      }
      const response = await axiosInstance.get('/orders', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch all orders';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
