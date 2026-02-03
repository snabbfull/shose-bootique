import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.count, 0),
);
