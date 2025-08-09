import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPassword,
  loginUser,
  signupUser,
} from '@/services/authService';
import { getAddress } from '@/services/addressService';

export const login = createAsyncThunk(
  'customer/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await loginUser(credentials);
      localStorage.setItem('token', userData.token);
      
      // Fetch address and merge with user data
      const addresses = await getAddress(userData.token);
      const primaryAddress = addresses?.[0] || {};
      
      return { 
        ...userData,
        ...primaryAddress, // Flatten address fields
        addresses // Keep addresses array
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

export const signup = createAsyncThunk(
  'customer/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await signupUser(userData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'customer/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const result = await forgotPassword(email);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);