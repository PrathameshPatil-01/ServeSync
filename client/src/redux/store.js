import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './users/userSlice';
import bookingReducer from './bookings/bookingSlice';
import serviceReducer from './services/serviceSlice';
import searchReducer from './search/searchSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    bookings: bookingReducer,
    services: serviceReducer,
    search: searchReducer, 
  },
});
