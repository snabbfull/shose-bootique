import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addItem, removeItem, clearCart, updateItem, orderSucceeded } from "../actions";
import type { CartItem } from "../actions";

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

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
        },
      )
      .addCase(clearCart, (state) => {
        state.items = [];
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
        },
      )
      .addCase(orderSucceeded, (state) => {
        // Очищаем корзину после успешного оформления заказа
        state.items = [];
      });
  },
});

export const cartReducer = cartSlice.reducer;
