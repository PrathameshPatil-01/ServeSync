import axiosInstance from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Async Thunks
export const signup = createAsyncThunk(
  'provider/signup',
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

export const login = createAsyncThunk(
  'provider/login',
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

export const forgotPassword = createAsyncThunk(
    'provider/forgotPassword',
    async (email, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/users/forgot-password', { email });
        toast.success('Password reset link sent to your email.');
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to send password reset link';
        toast.error(message);
        return rejectWithValue(message);
      }
    }
);  

// update user details
export const updateUserDetails = createAsyncThunk(
    'provider/updateUserDetails',
    async (id, userDetails, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/users/user/${id}`, userDetails);
        toast.success('User details updated successfully!');
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to update user details';
        toast.error(message);
        return rejectWithValue(message);
      }
    }
);  

