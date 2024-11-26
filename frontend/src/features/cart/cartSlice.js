import { createSlice } from '@reduxjs/toolkit';

const SHIPPING_COSTS = {
  standard: 5,
  express: 15
};

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  shippingMethod: 'standard',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        item => item.name === product.name && item.selectedSize === selectedSize
      );

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, 10);
        existingItem.quantity = newQuantity;
      } else {
        state.items.push({
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          sizes: product.sizes,
          selectedSize,
          quantity: Math.min(quantity, 10)
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

    updateSize: (state, action) => {
      const { name, size } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.selectedSize = size;
      }
    },

    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.shippingMethod = 'standard';
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateSize,
  setShippingMethod,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartTotalQuantity = state => state.cart.totalQuantity;
export const selectCartTotalAmount = state => state.cart.totalAmount;
export const selectShippingMethod = state => state.cart.shippingMethod;

// Sélecteur pour les frais d'expédition
export const selectShippingCosts = () => SHIPPING_COSTS;

// Sélecteur pour le montant final
export const selectFinalAmount = state => {
  const totalAmount = state.cart.totalAmount;
  const shippingMethod = state.cart.shippingMethod;
  return totalAmount + SHIPPING_COSTS[shippingMethod];
};

export default cartSlice.reducer;
