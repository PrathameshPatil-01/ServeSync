// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, forgotPassword } from './authThunks';

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthDialogOpen: false,
    authMode: 'login', // 'signup' | 'forgot'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openAuthDialog: (state, action) => {
            state.isAuthDialogOpen = true;
            state.authMode = action.payload || 'login';
        },
        closeAuthDialog: (state) => {
            state.isAuthDialogOpen = false;
            state.error = null;
        },
        setAuthMode: (state, action) => {
            state.authMode = action.payload;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, signupUser.pending, forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthDialogOpen = false;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthDialogOpen = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.isAuthDialogOpen = false;
            })
            .addMatcher(
                (action) => action.type.endsWith('rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'Something went wrong';
                }
            );
    },
});

export const { openAuthDialog, closeAuthDialog, setAuthMode, logout } = authSlice.actions;
export default authSlice.reducer;
