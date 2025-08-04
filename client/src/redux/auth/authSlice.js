// src/features/auth/authSlice.js
import { createSlice, isRejected } from '@reduxjs/toolkit';
import { login, signup, requestPasswordReset } from './authThunks';

// Action groups for cleaner matchers
const asyncActions = [login, signup, requestPasswordReset];

const initialState = {
    userId: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    signupSuccess: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthMessages: (state) => {
            state.error = null;
            state.signupSuccess = false;
            state.loading = false;
        },
        logout: (state) => {
            state.userId = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        resetAuthState: (state) => {
            state.signupSuccess = false; // ✅ Custom reset after redirect
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ LOGIN success
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId || null;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })

            // ✅ SIGNUP success
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.signupSuccess = true;
            })

            // ✅ PASSWORD RESET success
            .addCase(requestPasswordReset.fulfilled, (state) => {
                state.loading = false;
            })

            // ✅ Handle all .pending cases
            .addMatcher(
                (action) => asyncActions.some((thunk) => thunk.pending.match(action)),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.signupSuccess = false;
                }
            )

            // ✅ Handle all .rejected cases
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

// ✅ Export actions
export const { logout, clearAuthMessages, resetAuthState } = authSlice.actions;

// ✅ Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectAuthUserId = (state) => state.auth.userId;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectSignupSuccess = (state) => state.auth.signupSuccess;

// ✅ Export reducer
export default authSlice.reducer;
