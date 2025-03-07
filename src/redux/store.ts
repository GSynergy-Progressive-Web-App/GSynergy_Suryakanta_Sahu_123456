import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './Slice/storeSlice';
import skuReducer from './Slice/skuSlice';
import dataReducer from './Slice/dataSlice';
import authReducer from './Slice/authSlice';

const store = configureStore({
  reducer: {
    stores: storeReducer,
    sku: skuReducer,
    data: dataReducer,
    auth: authReducer,
  },
});

// ✅ Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// ✅ Export AppDispatch type (optional, but useful)
export type AppDispatch = typeof store.dispatch;

export default store;
