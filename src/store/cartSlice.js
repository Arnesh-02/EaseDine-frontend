import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, name, price, quantity, image }
  totalQuantity: 0,
  totalAmount: 0,
  // discounts: null, // Could be an object { code, percentage, amount }
};

// Helper function to persist cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('fdeliveryCart', serializedCart);
  } catch (e) {
    console.warn('Could not save cart to localStorage', e);
  }
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('fdeliveryCart');
    if (serializedCart === null) {
      return undefined; // No cart in localStorage
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn('Could not load cart from localStorage', e);
    return undefined;
  }
};

const persistedCart = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState: persistedCart || initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload; // expects { id, name, price, image }
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      saveCartToLocalStorage(state);
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload; // expects item id
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      }
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToLocalStorage(state);
    },
    // Add more reducers like updateItemQuantity, applyDiscount etc.
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;