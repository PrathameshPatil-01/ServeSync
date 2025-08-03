import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser,
  signupUser,
  forgotPassword,
} from '../../services/authService';

// LOGIN THUNK
export const login = createAsyncThunk(
  'auth/login',
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
  'auth/register',
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
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const result = await forgotPassword(email);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
