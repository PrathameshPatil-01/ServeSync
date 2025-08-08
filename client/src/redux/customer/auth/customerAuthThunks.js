import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    forgotPassword,
    loginUser,
    signupUser,
} from '@/services/authService';

// LOGIN THUNK
export const login = createAsyncThunk(
  'customer/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const userData = await loginUser(credentials);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// REGISTER THUNK
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

// FORGOT PASSWORD THUNK
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
