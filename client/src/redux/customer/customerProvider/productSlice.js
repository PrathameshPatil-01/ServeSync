// src/redux/products/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],           // All products (used for search, etc.)
    liked: [],          // Array of liked product IDs
    likedProducts: [],  // Array of full liked product objects
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
    toggleLike: (state, action) => {
      const id = action.payload;
      const isLiked = state.liked.includes(id);

      if (isLiked) {
        // Remove from liked
        state.liked = state.liked.filter(item => item !== id);
        state.likedProducts = state.likedProducts.filter(product => product.id !== id);
      } else {
        // Add to liked
        state.liked.push(id);
        const product = state.list.find(p => p.id === id);
        if (product) {
          state.likedProducts.push(product);
        }
      }
    },
  },
});

export const { setProducts, toggleLike } = productSlice.actions;
export default productSlice.reducer;
