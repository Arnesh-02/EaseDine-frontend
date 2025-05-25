import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  // Middleware can be added here if needed, e.g., for async actions with thunks
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;