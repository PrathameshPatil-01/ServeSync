import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login, signup } from './providerAuthThunks';

// Utility: safely load user from localStorage
const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

// Utility: store user to localStorage
const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Utility: remove user from localStorage
const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};

const initialState = {
  user: loadUserFromStorage(),
  loading: false,
  error: null,
  isAuthenticated: !!loadUserFromStorage(),
  signupSuccess: false,
};

const providerAuthSlice = createSlice({
  name: 'providerAuth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeUserFromStorage();
      toast.info('Logged out successfully.');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    clearAuthMessages: (state) => {
      state.signupSuccess = false;
      state.error = null;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.signupSuccess = false;
      removeUserFromStorage();
    },

  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.signupSuccess = true;
        toast.success('Signup successful. Please log in.');
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Signup failed');
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload;

        state.loading = false;
        state.user = user;
        state.isAuthenticated = true;
        saveUserToStorage(user);

        toast.success('Login successful.');
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        removeUserFromStorage();

        toast.error(action.payload || 'Login failed');
      });
  },
});

export const { logout, clearAuthError, clearAuthMessages, resetAuthState } = providerAuthSlice.actions;

export default providerAuthSlice.reducer;
