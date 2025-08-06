import { createSlice } from '@reduxjs/toolkit';
import { registerProvider } from './providerThunks';

const initialState = {
  loading: false,
  success: false,
  error: null,
  provider: null,
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    resetProviderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.provider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.provider = action.payload;
      })
      .addCase(registerProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        state.success = false;
      });
  },
});

export const { resetProviderState } = providerSlice.actions;
export default providerSlice.reducer;
