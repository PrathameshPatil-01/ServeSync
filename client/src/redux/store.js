import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookings/bookingSlice';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import providerReducer from './provider/providerSlice';
import searchReducer from './search/searchSlice';
import customerServiceReducer from './services/serviceSlice'; // Renamed to avoid conflict
import orderReducer from './orders/orderSlice'; // New
import scheduleReducer from './schedule/scheduleSlice'; // New
import earningReducer from './earnings/earningSlice'; // New
import providerServiceReducer from './services/serviceSlice'; // New, for provider's services

export const store = configureStore({
  reducer: {
    providerAuth: providerAuthReducer,
    provider: providerReducer,
    bookings: bookingReducer,
    customerServices: customerServiceReducer, // For customer-facing service list
    search: searchReducer,
    orders: orderReducer, // Provider orders
    schedule: scheduleReducer, // Provider schedule
    earnings: earningReducer, // Provider earnings
    providerServices: providerServiceReducer, // Provider's own services
  },
});
