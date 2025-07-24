// src/redux/bookings/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        fetchBookingsStart: (state) => {
            state.loading = true;
        },
        fetchBookingsSuccess: (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        },
        fetchBookingsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchBookingsStart, fetchBookingsSuccess, fetchBookingsFailure } = bookingSlice.actions;
export default bookingSlice.reducer;
