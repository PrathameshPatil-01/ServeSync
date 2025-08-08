import axiosInstance from '@/api/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks
export const registerProvider = createAsyncThunk(
  'providerAuth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', { ...userData, role: 'ROLE_PROVIDER' });
      toast.success('Registration successful! Please login.');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const loginProvider = createAsyncThunk(
  'providerAuth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      const { token, userId, roles, providerId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('roles', JSON.stringify(roles));
      if (providerId) {
        localStorage.setItem('providerId', providerId);
      }
      toast.success('Login successful!');
      return { token, userId, roles, providerId };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Slice
const providerAuthSlice = createSlice({
  name: 'providerAuth',
  initialState: {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    providerId: localStorage.getItem('providerId') || null, // Added providerId
    roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [],
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.providerId = null; // Clear providerId on logout
      state.roles = [];
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('providerId'); // Remove from local storage
      localStorage.removeItem('roles');
      toast.info('Logged out successfully.');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerProvider.fulfilled, (state) => {
        state.loading = false;
        // No token or auth status update on register, user needs to login
      })
      .addCase(registerProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.providerId = action.payload.providerId; // Set providerId
        state.roles = action.payload.roles;
        state.isAuthenticated = true;
      })
      .addCase(loginProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.userId = null;
        state.providerId = null; // Clear providerId on failed login
        state.roles = [];
      });
  },
});

export const { logout, clearAuthError } = providerAuthSlice.actions;

export default providerAuthSlice.reducer;

