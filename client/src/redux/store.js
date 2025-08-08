import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookings/bookingSlice';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import customerAuthReducer from './customer/auth/customerAuthSlice';
import providerReducer from './provider/providerSlice';
import searchReducer from './search/searchSlice';
import serviceReducer from './services/serviceSlice';
import productReducer from './customer/customerProvider/productSlice';



export const store = configureStore({
  reducer: {
    providerAuth: providerAuthReducer,
    customerAuth : customerAuthReducer,
    provider: providerReducer,
    bookings: bookingReducer,
    services: serviceReducer,
    search: searchReducer, 
    products: productReducer,
  },
});
