import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedSize } = action.payload;
      const existingItem = state.items.find(
        item => item.name === product.name && item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
      } else {
        state.items.push({
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          sizes: product.sizes,
          quantity: Math.min(quantity, 10),
          selectedSize
        });
      }

      // Recalculer les totaux
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },

    removeFromCart: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);

      // Recalculer les totaux
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = Math.min(Math.max(quantity, 1), 10);

        // Recalculer les totaux
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
