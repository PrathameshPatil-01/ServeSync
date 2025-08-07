import { createSlice, isRejected } from '@reduxjs/toolkit';
import { login, requestPasswordReset, signup } from './providerAuthThunks';

const asyncActions = [login, signup, requestPasswordReset];

// Initial global auth state
const initialState = {
    // User Auth Data
    token: localStorage.getItem('token') || null,
    userId: null,

    // User Profile Info
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePic: '',
    roles: [],

    // Base Metadata
    isDeleted: false,
    createdAt: null,
    updatedAt: null,
    version: null,

    // UI State
    loading: false,
    error: null,
    signupSuccess: false,
};

const providerAuthSlice = createSlice({
    name: 'providerAuth',
    initialState,

    reducers: {
        /**
         * Clears transient messages and resets loading.
         */
        clearAuthMessages: (state) => {
            state.error = null;
            state.signupSuccess = false;
            state.loading = false;
        },

        /**
         * Logs out the user and clears all auth data.
         */
        logout: (state) => {
            state.token = null;
            state.userId = null;

            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.phoneNumber = '';
            state.profilePic = '';
            state.roles = [];

            state.isDeleted = false;
            state.createdAt = null;
            state.updatedAt = null;
            state.version = null;

            localStorage.removeItem('token');
        },

        /**
         * Resets only the signup success state.
         */
        resetAuthState: (state) => {
            state.signupSuccess = false;
        },
    },

    extraReducers: (builder) => {
        builder

            //  Handle successful login
            .addCase(login.fulfilled, (state, action) => {
                const payload = action.payload;

                state.loading = false;

                // Auth data
                state.token = payload.token || null;
                localStorage.setItem('token', payload.token || '');

                // User data
                state.userId = payload.userId || null;
                state.firstName = payload.firstName || '';
                state.lastName = payload.lastName || '';
                state.email = payload.email || '';
                state.phoneNumber = payload.phoneNumber || '';
                state.profilePic = payload.profilePic || '';
                state.roles = payload.roles || [];

                // Metadata
                state.isDeleted = payload.isDeleted || false;
                state.createdAt = payload.createdAt || null;
                state.updatedAt = payload.updatedAt || null;
                state.version = payload.version || null;
            })

            // Handle successful signup
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.signupSuccess = true;
            })

            // ✅ Handle successful password reset request
            .addCase(requestPasswordReset.fulfilled, (state) => {
                state.loading = false;
            })

            // ✅ Handle all .pending actions
            .addMatcher(
                (action) =>
                    asyncActions.some((thunk) => thunk.pending.match(action)),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.signupSuccess = false;
                }
            )

            // ✅ Handle all .rejected actions
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message ||
                    action.payload ||
                    'Something went wrong';
            });
    },
});

// ✅ Export actions
export const { logout, clearAuthMessages, resetAuthState } = providerAuthSlice.actions;

// ✅ Export reducer
export default providerAuthSlice.reducer;
