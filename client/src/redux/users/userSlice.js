// src/redux/users/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userList: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            state.userList = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer;
