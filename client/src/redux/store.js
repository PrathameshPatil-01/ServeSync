import { configureStore } from '@reduxjs/toolkit';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import customerAuthReducer from './customer/auth/customerAuthSlice';
import providerReducer from './provider/providerSlice';
import searchReducer from './search/searchSlice';
import serviceReducer from './services/serviceSlice';
import productReducer from './customer/customerProvider/productSlice';
import cartReducer from '@/redux/customer/cartSlice';



export const store = configureStore({
  reducer: {
    providerAuth: providerAuthReducer,
    customerAuth : customerAuthReducer,
    provider: providerReducer,
    services: serviceReducer,
    search: searchReducer, 
    products: productReducer,
    cart: cartReducer,
  },
});
