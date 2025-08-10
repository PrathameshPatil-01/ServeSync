import cartReducer from '@/redux/customer/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import customerAuthReducer from './customer/auth/customerAuthSlice';
import productReducer from './customer/customerProvider/productSlice';
import orderReducer from './provider/orders/orderSlice';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import earningReducer from './provider/earnings/earningSlice';
import providerReducer from './provider/providerSlice';
import reviewReducer from './provider/reviews/reviewSlice';
import scheduleReducer from './provider/schedule/scheduleSlice';
import providerServiceOfferReducer from './provider/services/providerServiceOfferSlice';
import searchReducer from './search/searchSlice';
import serviceReducer from './services/serviceSlice';


export const store = configureStore({
  reducer: {
    providerAuth: providerAuthReducer,
search: searchReducer,
    provider: providerReducer,
    providerServiceOffer: providerServiceOfferReducer,
    order: orderReducer,
    schedule: scheduleReducer,
    earning: earningReducer,
    review : reviewReducer,
    services: serviceReducer,
    customerAuth : customerAuthReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
