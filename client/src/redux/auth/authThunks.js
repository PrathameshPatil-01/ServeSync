// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await authService.login(data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const signupUser = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
    try {
        const res = await authService.signup(data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const forgotPassword = createAsyncThunk('auth/forgot', async (email, { rejectWithValue }) => {
    try {
        const res = await authService.forgotPassword(email);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});
