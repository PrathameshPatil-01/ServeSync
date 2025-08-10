// src/redux/products/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load saved likes from localStorage
const savedLikedIds = JSON.parse(localStorage.getItem("liked")) || [];
const savedLikedProducts =
  JSON.parse(localStorage.getItem("likedProducts")) || [];

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [], // All products
    liked: savedLikedIds, // Liked product IDs
    likedProducts: savedLikedProducts, // Liked product objects
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;

      // Sync likedProducts from IDs if needed
      if (state.liked.length > 0) {
        const updatedLiked = state.liked
          .map((id) => action.payload.find((p) => p.id === id))
          .filter(Boolean);

        state.likedProducts = updatedLiked;
        localStorage.setItem(
          "likedProducts",
          JSON.stringify(state.likedProducts)
        );
      }
    },

    toggleLike: (state, action) => {
      const product = action.payload; // full product object
      const id = product.id;
      const isLiked = state.liked.includes(id);

      if (isLiked) {
        // Remove from liked
        state.liked = state.liked.filter((item) => item !== id);
        state.likedProducts = state.likedProducts.filter(
          (p) => p.id !== id
        );
      } else {
        // Add to liked
        state.liked.push(id);
        state.likedProducts.push(product); // store actual card data
      }

      // Persist
      localStorage.setItem("liked", JSON.stringify(state.liked));
      localStorage.setItem(
        "likedProducts",
        JSON.stringify(state.likedProducts)
      );
    },
  },
});

export const { setProducts, toggleLike } = productSlice.actions;
export default productSlice.reducer;
