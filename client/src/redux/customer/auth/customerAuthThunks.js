// customerAuthThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser, forgotPassword } from '@/services/authService';
import { getAddress } from '@/services/addressService';

export const login = createAsyncThunk(
  'customer/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Step 1: Login API
      const userData = await loginUser(credentials);
      localStorage.setItem('token', userData.token);
      console.log("🔹 Raw userData from login API:", userData);

      let addresses = [];

      // Step 2: Try fetching address
      try {
        const addressResponse = await getAddress(userData.token);
        console.log("🔹 Raw addressResponse from API:", addressResponse);

        if (Array.isArray(addressResponse) && addressResponse.length > 0) {
          addresses = addressResponse;
        } else if (addressResponse && typeof addressResponse === 'object') {
          addresses = [addressResponse];
        }
      } catch (err) {
        // If address API fails or no address found, skip without breaking login
        console.warn("⚠️ No address found for this user. Setting empty address fields.");
        addresses = [];
      }

      console.log("🔹 Final normalized addresses:", addresses);

      // Step 3: Return combined payload
      return {
        ...userData,
        addresses,
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
