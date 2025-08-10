import { createSlice, isRejected } from '@reduxjs/toolkit';
import { login, signup, requestPasswordReset } from './customerAuthThunks';

const asyncActions = [login, signup, requestPasswordReset];

// Load from localStorage
const savedAuth = JSON.parse(localStorage.getItem('authData')) || {};

const initialState = {
  token: savedAuth.token || null,
  userId: savedAuth.userId || null,

  firstName: savedAuth.firstName || '',
  lastName: savedAuth.lastName || '',
  email: savedAuth.email || '',
  phoneNumber: savedAuth.phoneNumber || '',
  profilePic: savedAuth.profilePic || '',
  roles: savedAuth.roles || [],

  houseNo: savedAuth.houseNo || '',
  area: savedAuth.area || '',
  landmark: savedAuth.landmark || '',
  postalCode: savedAuth.postalCode || '',
  city: savedAuth.city || '',
  state: savedAuth.state || '',

  addresses: savedAuth.addresses || [],

  isDeleted: savedAuth.isDeleted || false,
  createdAt: savedAuth.createdAt || null,
  updatedAt: savedAuth.updatedAt || null,
  version: savedAuth.version || null,

  loading: false,
  error: null,
  signupSuccess: false,
};

const saveAuthData = (state) => {
  const { loading, error, signupSuccess, ...dataToSave } = state;
  localStorage.setItem('authData', JSON.stringify(dataToSave));
};

const setUserDataFromPayload = (state, payload) => {
  const addresses = Array.isArray(payload.addresses) ? payload.addresses : [];
  const primaryAddress = addresses[0] || {};

  state.token = payload.token || null;
  localStorage.setItem('token', payload.token || '');

  state.userId = payload.userId || null;
  state.firstName = payload.firstName || '';
  state.lastName = payload.lastName || '';
  state.email = payload.email || '';
  state.phoneNumber = payload.phoneNumber || '';
  state.profilePic = payload.profilePic || '';
  state.roles = payload.roles || [];

  // Prefer primaryAddress values, fallback to root fields
  state.houseNo = primaryAddress.houseNo || payload.houseNo || '';
  state.area = primaryAddress.area || payload.area || '';
  state.landmark = primaryAddress.landmark || payload.landmark || '';
  state.postalCode = primaryAddress.postalCode || payload.postalCode || '';
  state.city = primaryAddress.city || payload.city || '';
  state.state = primaryAddress.state || payload.state || '';

  state.addresses = addresses;

  state.isDeleted = payload.isDeleted || false;
  state.createdAt = payload.createdAt || null;
  state.updatedAt = payload.updatedAt || null;
  state.version = payload.version || null;

  saveAuthData(state);

  console.log("✅ Stored Redux state after auth:", {
    houseNo: state.houseNo,
    area: state.area,
    city: state.city,
    state: state.state,
    addresses: state.addresses
  });
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
      Object.assign(state, { ...initialState, token: null, userId: null });
      localStorage.removeItem('token');
      localStorage.removeItem('authData');
    },

    resetAuthState: (state) => {
      state.signupSuccess = false;
    },

    updateAddress: (state, action) => {
      const { houseNo, area, landmark, postalCode, city, state: stateName } = action.payload;

      state.houseNo = houseNo || '';
      state.area = area || '';
      state.landmark = landmark || '';
      state.postalCode = postalCode || '';
      state.city = city || '';
      state.state = stateName || '';

      state.addresses = [
        { houseNo, area, landmark, postalCode, city, state: stateName },
      ];

      saveAuthData(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.loading = false;
        setUserDataFromPayload(state, payload);
      })

      .addCase(signup.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.loading = false;
        state.signupSuccess = true;
        setUserDataFromPayload(state, payload);
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

export const { logout, clearAuthMessages, resetAuthState, updateAddress } = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
