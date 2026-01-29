import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addItem, removeItem, clearCart, updateItem, orderSucceeded } from "../actions";
import type { CartItem } from "../actions";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[],
};

const saveCart = (items: CartItem[]) =>
  localStorage.setItem("cart", JSON.stringify(items));


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem, (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(
          (item) =>
            item.id === action.payload.id && item.size === action.payload.size,
        );
        if (existingItem) {
          existingItem.count += action.payload.count;
        } else {
          state.items.push(action.payload);
        }
        saveCart(state.items);
      })
      .addCase(
        removeItem,
        (state, action: PayloadAction<{ id: number; size: string }>) => {
          state.items = state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.size === action.payload.size
              ),
          );
          saveCart(state.items);
        },
      )
      .addCase(clearCart, (state) => {
        state.items = [];
        localStorage.removeItem("cart");
      })
      .addCase(
        updateItem,
        (
          state,
          action: PayloadAction<{ id: number; size: string; count: number }>,
        ) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === action.payload.id &&
              item.size === action.payload.size,
          );

          if (existingItem) {
            existingItem.count = action.payload.count;
          }
          saveCart(state.items);
        },
      )
      .addCase(orderSucceeded, (state) => {
        // Очищаем корзину после успешного оформления заказа
        state.items = [];
        localStorage.removeItem("cart");
      });
  },
});

export const cartReducer = cartSlice.reducer;
