import { createSlice, isRejected } from '@reduxjs/toolkit';
import { login, signup, requestPasswordReset } from './customerAuthThunks';

const asyncActions = [login, signup, requestPasswordReset];

// Load from localStorage
const savedAuth = JSON.parse(localStorage.getItem('authData')) || {};

const initialState = {
  // Auth
  token: savedAuth.token || null,
  userId: savedAuth.userId || null,

  // User Profile Info
  firstName: savedAuth.firstName || '',
  lastName: savedAuth.lastName || '',
  email: savedAuth.email || '',
  phoneNumber: savedAuth.phoneNumber || '',
  profilePic: savedAuth.profilePic || '',
  roles: savedAuth.roles || [],

  // Address Info
  houseNo: savedAuth.houseNo || '',
  area: savedAuth.area || '',
  landmark: savedAuth.landmark || '',
  postalCode: savedAuth.postalCode || '',
  city: savedAuth.city || '',
  state: savedAuth.state || '',

  // Complete address object
  addresses: savedAuth.addresses || {},

  // Base Metadata
  isDeleted: savedAuth.isDeleted || false,
  createdAt: savedAuth.createdAt || null,
  updatedAt: savedAuth.updatedAt || null,
  version: savedAuth.version || null,

  // UI
  loading: false,
  error: null,
  signupSuccess: false,
};

const saveAuthData = (state) => {
  const { loading, error, signupSuccess, ...dataToSave } = state;
  localStorage.setItem('authData', JSON.stringify(dataToSave));
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
      Object.assign(state, {
        ...initialState,
        token: null,
        userId: null,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('authData');
    },

    resetAuthState: (state) => {
      state.signupSuccess = false;
    },

    // ✅ NEW reducer for updating address
    updateAddress: (state, action) => {
      const { houseNo, area, landmark, postalCode, city, stateName } = action.payload;
      state.houseNo = houseNo || '';
      state.area = area || '';
      state.landmark = landmark || '';
      state.postalCode = postalCode || '';
      state.city = city || '';
      state.state = stateName || '';
      state.addresses = {
        houseNo,
        area,
        landmark,
        postalCode,
        city,
        state: stateName,
      };

      saveAuthData(state); // Save after updating
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { addresses = {}, ...payload } = action.payload;

        state.loading = false;
        state.token = payload.token || null;
        localStorage.setItem('token', payload.token || '');

        state.userId = payload.userId || null;
        state.firstName = payload.firstName || '';
        state.lastName = payload.lastName || '';
        state.email = payload.email || '';
        state.phoneNumber = payload.phoneNumber || '';
        state.profilePic = payload.profilePic || '';
        state.roles = payload.roles || [];

        state.houseNo = payload.houseNo || addresses.houseNo || '';
        state.area = payload.area || addresses.area || '';
        state.landmark = payload.landmark || addresses.landmark || '';
        state.postalCode = payload.postalCode || addresses.postalCode || '';
        state.city = payload.city || addresses.city || '';
        state.state = payload.state || addresses.state || '';
        state.addresses = addresses;

        state.isDeleted = payload.isDeleted || false;
        state.createdAt = payload.createdAt || null;
        state.updatedAt = payload.updatedAt || null;
        state.version = payload.version || null;

        saveAuthData(state);
      })

      .addCase(signup.fulfilled, (state, action) => {
        const { addresses = {}, ...payload } = action.payload;

        state.loading = false;
        state.signupSuccess = true;

        state.houseNo = payload.houseNo || addresses.houseNo || '';
        state.area = payload.area || addresses.area || '';
        state.landmark = payload.landmark || addresses.landmark || '';
        state.postalCode = payload.postalCode || addresses.postalCode || '';
        state.city = payload.city || addresses.city || '';
        state.state = payload.state || addresses.state || '';
        state.addresses = addresses;

        saveAuthData(state);
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
        state.error =
          action.payload?.message || action.payload || 'Something went wrong';
      });
  },
});

export const { logout, clearAuthMessages, resetAuthState, updateAddress } =
  customerAuthSlice.actions;
export default customerAuthSlice.reducer;
