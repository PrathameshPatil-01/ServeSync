// src/redux/services/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
    loading: false,
    error: null,
};

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        fetchServicesStart: (state) => {
            state.loading = true;
        },
        fetchServicesSuccess: (state, action) => {
            state.services = action.payload;
            state.loading = false;
        },
        fetchServicesFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchServicesStart, fetchServicesSuccess, fetchServicesFailure } = serviceSlice.actions;
export default serviceSlice.reducer;
