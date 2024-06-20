import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      console.log("item added", JSON.parse(JSON.stringify(state.cartItems)));
      if (existingItem) {
        existingItem.productQuantity += 1;
        existingItem.productPrice = existingItem.productQuantity * price;
      } else {
        state.cartItems.push({
          ...action.payload,
          productQuantity: 1,
          productPrice: price,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
