import { createSlice } from '@reduxjs/toolkit';
import { login, signup, requestPasswordReset } from './authThunks';

const initialState = {
    user: null,
    token: null,
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
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user || null;
                state.token = action.payload.token;
                state.isAuthDialogOpen = false;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signup.fulfilled, (state) => {
                state.loading = false;
                state.isAuthDialogOpen = false;
            })
            .addCase(requestPasswordReset.fulfilled, (state) => {
                state.loading = false;
                state.isAuthDialogOpen = false;
            })
            .addMatcher(
                (action) =>
                    [login.pending.type, signup.pending.type, requestPasswordReset.pending.type].includes(
                        action.type
                    ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
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
