import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],           // Cart items: each has subserviceId + providerId + quantity etc.
  totalQuantity: 0,    // Total quantity across all items
  totalPrice: 0,       // Total price across all items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      
      // Find existing cart item by both subserviceId and providerId
      const existingItem = state.items.find(
        (item) =>
          item.subserviceId === newItem.subserviceId &&
          item.providerId === newItem.providerId
      );

      if (existingItem) {
        // If found, increase quantity and update total price of that item
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      } else {
        // Else add new item, calculate totalPrice for it
        state.items.push({
          ...newItem,
          totalPrice: newItem.price * newItem.quantity,
        });
      }

      // Update total cart quantity and price
      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeFromCart(state, action) {
      const { subserviceId, providerId } = action.payload;

      // Find the index of the item to remove by both IDs
      const index = state.items.findIndex(
        (item) =>
          item.subserviceId === subserviceId &&
          item.providerId === providerId
      );

      if (index !== -1) {
        const item = state.items[index];
        // Update totals by removing item's quantity and price
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.totalPrice;

        // Remove item from array
        state.items.splice(index, 1);
      }
    },

    clearCart(state) {
      // Reset cart completely
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    updateQuantity(state, action) {
      const { subserviceId, providerId, quantity } = action.payload;

      // Find cart item by both IDs
      const item = state.items.find(
        (i) =>
          i.subserviceId === subserviceId &&
          i.providerId === providerId
      );

      if (item && quantity > 0) {
        // Update cart totals considering quantity change
        state.totalQuantity = state.totalQuantity - item.quantity + quantity;
        state.totalPrice =
          state.totalPrice - item.totalPrice + item.price * quantity;

        // Update item quantity and totalPrice
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
