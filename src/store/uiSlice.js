import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobileMenuOpen: false,
  isCartSidebarOpen: false,
  filters: {
    vegetarian: null, // null (all), true (veg), false (non-veg)
    categories: [], // array of selected category names
    priceRange: [0, 100], // min, max price
    searchTerm: '',
  },
  sortOptions: {
    sortBy: 'rating', // 'rating', 'priceLowToHigh', 'priceHighToLow', 'name'
    sortOrder: 'desc', // 'asc', 'desc'
  },
  // Potentially add loading states, error messages etc.
  // isLoading: false,
  // error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    toggleCartSidebar: (state) => {
      state.isCartSidebarOpen = !state.isCartSidebarOpen;
    },
    setFilter: (state, action) => {
      // action.payload should be an object like { filterName: 'vegetarian', value: true }
      state.filters[action.payload.filterName] = action.payload.value;
    },
    setSortOption: (state, action) => {
      // action.payload should be an object like { sortBy: 'price', sortOrder: 'asc' }
      state.sortOptions = { ...state.sortOptions, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    // Add more UI related actions as needed
  },
});

export const {
  toggleMobileMenu,
  toggleCartSidebar,
  setFilter,
  setSortOption,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;