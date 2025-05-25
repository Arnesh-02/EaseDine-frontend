import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null, // To store { name, email, lastOrders, preferences }
  isAuthenticated: false,
  // preferences: { vegetarian: false, favoriteCuisines: [] } // Can be part of profile
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    // Example for preferences, can be expanded
    toggleVegetarianPreference: (state) => {
      if (state.profile && state.profile.preferences) {
        state.profile.preferences.vegetarian = !state.profile.preferences.vegetarian;
      } else if (state.profile) {
        state.profile.preferences = { vegetarian: true, favoriteCuisines: [] };
      }
    },
  },
});

export const { loginUser, logoutUser, updateUserProfile, toggleVegetarianPreference } = userSlice.actions;
export default userSlice.reducer;