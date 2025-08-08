import { configureStore } from '@reduxjs/toolkit';
import providerAuthReducer from './provider/auth/providerAuthSlice';
import earningReducer from './provider/earnings/earningSlice';
import orderReducer from './provider/orders/orderSlice';
import providerReducer from './provider/providerSlice';
import reviewReducer from './provider/reviews/reviewSlice';
import scheduleReducer from './provider/schedule/scheduleSlice';
import providerServiceOfferReducer from './provider/services/providerServiceOfferSlice';
import searchReducer from './search/searchSlice';
import customerServiceReducer from './services/serviceSlice'; // Renamed to avoid conflict


export const store = configureStore({
  reducer: {
    search: searchReducer,
    providerAuth: providerAuthReducer,
    provider: providerReducer,
    providerServiceOffer: providerServiceOfferReducer,
    order: orderReducer,
    schedule: scheduleReducer,
    earning: earningReducer,
    review : reviewReducer,
    customerServices: customerServiceReducer, // For customer-facing service list
  },
});
