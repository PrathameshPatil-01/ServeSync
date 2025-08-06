import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookings/bookingSlice';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import providerReducer from './provider/providerSlice';
import searchReducer from './search/searchSlice';
import serviceReducer from './services/serviceSlice';

export const store = configureStore({
  reducer: {
    providerAuth: providerAuthReducer,
    provider: providerReducer,
    bookings: bookingReducer,
    services: serviceReducer,
    search: searchReducer, 
  },
});
