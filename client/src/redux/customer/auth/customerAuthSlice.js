import { createSlice, isRejected } from '@reduxjs/toolkit';
import { login, signup, requestPasswordReset } from './customerAuthThunks';

const asyncActions = [login, signup, requestPasswordReset];

const initialState = {
  // Auth
  token: localStorage.getItem('token') || null,
  userId: null,

  // User Profile Info
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  profilePic: '',
  roles: [],

  // Address Info
  houseNo: '',
  area: '',
  landmark: '',
  postalCode: '',
  city: '',
  state: '',

  // Complete address object
  addresses: {},

  // Base Metadata
  isDeleted: false,
  createdAt: null,
  updatedAt: null,
  version: null,

  // UI
  loading: false,
  error: null,
  signupSuccess: false,
};

const customerAuthSlice = createSlice({
  name: 'customerAuth',
  initialState,

  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.signupSuccess = false;
      state.loading = false;
    },

    logout: (state) => {
      state.token = null;
      state.userId = null;
      Object.assign(state, initialState);
      localStorage.removeItem('token');
    },

    resetAuthState: (state) => {
      state.signupSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { addresses = {}, ...payload } = action.payload;
        
        state.loading = false;
        state.token = payload.token || null;
        localStorage.setItem('token', payload.token || '');

        // User Info
        state.userId = payload.userId || null;
        state.firstName = payload.firstName || '';
        state.lastName = payload.lastName || '';
        state.email = payload.email || '';
        state.phoneNumber = payload.phoneNumber || '';
        state.profilePic = payload.profilePic || '';
        state.roles = payload.roles || [];

        // Map address data - use direct fields first, fallback to addresses object
        state.houseNo = payload.houseNo || addresses.houseNo || '';
        state.area = payload.area || addresses.area || '';
        state.landmark = payload.landmark || addresses.landmark || '';
        state.postalCode = payload.postalCode || addresses.postalCode || '';
        state.city = payload.city || addresses.city || '';
        state.state = payload.state || addresses.state || '';
        state.addresses = addresses;

        // Metadata
        state.isDeleted = payload.isDeleted || false;
        state.createdAt = payload.createdAt || null;
        state.updatedAt = payload.updatedAt || null;
        state.version = payload.version || null;
      })

      .addCase(signup.fulfilled, (state, action) => {
        const { addresses = {}, ...payload } = action.payload;

        state.loading = false;
        state.signupSuccess = true;

        // Map address data for signup
        state.houseNo = payload.houseNo || addresses.houseNo || '';
        state.area = payload.area || addresses.area || '';
        state.landmark = payload.landmark || addresses.landmark || '';
        state.postalCode = payload.postalCode || addresses.postalCode || '';
        state.city = payload.city || addresses.city || '';
        state.state = payload.state || addresses.state || '';
        state.addresses = addresses;
      })

      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
      })

      .addMatcher(
        (action) => asyncActions.some((thunk) => thunk.pending.match(action)),
        (state) => {
          state.loading = true;
          state.error = null;
          state.signupSuccess = false;
        }
      )

      .addMatcher(isRejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || 'Something went wrong';
      });
  },
});

export const { logout, clearAuthMessages, resetAuthState } = customerAuthSlice.actions;
export default customerAuthSlice.reducer;