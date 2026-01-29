import { createAction } from "@reduxjs/toolkit";

// ---- Основные типы ----
export interface Item {
  id: number;
  category: "Все" | { id: number; title: string };
  title: string;
  price: number;
  images: string[];
  sku: string;
  sizes?: {
    size: string;
    // API BosaNoga использует поле "avalible", поэтому поддерживаем оба варианта
    available?: boolean;
    avalible?: boolean;
  }[];
  manufacturer?: string;
  color?: string;
  material?: string;
  season?: string;
  reason?: string;
}

export interface TopSalesItems {
  data: Item[];
}

export interface CatalogItems {
  items: Item[];
  categories?: [];
  selectedCategory?: string;
  search?: string;
  offset: number;
  hasMore: boolean;
}

export interface ProductDetails {
  item: Item | null;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  size: string;
}

export interface Order {
  owner: {
    phone: string;
    address: string;
  };
  items: {
    id: number;
    price: number;
    count: number;
  }[];
}

// ---- Products actions ----
export const topSalesRequested = createAction("products/topSalesRequested");
export const topSalesSucceeded = createAction<TopSalesItems>(
  "products/topSalesSucceeded",
);
export const topSalesFailed = createAction<string>("products/topSalesFailed");

export const catalogItemsRequested = createAction<{
  categoryId?: number | string;
  search?: string;
}>("products/catalogItemsRequested");
export const catalogItemsSucceeded = createAction<CatalogItems>(
  "products/catalogItemsSucceeded",
);
export const catalogItemsFailed = createAction<string>(
  "products/catalogItemsFailed",
);

export const productDetailsRequested = createAction<number>(
  "products/productDetailsRequested",
); // payload = id
export const productDetailsSucceeded = createAction<ProductDetails>(
  "products/productDetailsSucceeded",
);
export const productDetailsFailed = createAction<string>(
  "products/productDetailsFailed",
);

export const catalogReset = createAction("products/catalogReset");

export const catalogLoadMore = createAction<{
  categoryId?: number | string;
  search: string;
  offset: number;
}>("products/catalogLoadMore");

// ---- Cart actions ----
export const addItem = createAction<CartItem>("cart/addItem");
export const removeItem = createAction<{ id: number; size: string }>(
  "cart/removeItem",
); // payload = id
export const clearCart = createAction("cart/clearCart");
export const updateItem = createAction<{ id: number; size: string; count: number }>(
  "cart/updateItem",
);

// ---- Order actions ----
export const orderRequested = createAction<Order>("order/requested");
export const orderSucceeded = createAction("order/succeeded");
export const orderFailed = createAction<string>("order/failed");

// ---- Categories actions ----
export const categoriesRequested = createAction("products/categoriesRequested");

export const categoriesSucceeded = createAction<[]>(
  "products/categoriesSucceeded",
);

export const categoriesFailed = createAction<string>(
  "products/categoriesFailed",
);

export const categorySelected = createAction<string | "Все">(
  "products/categorySelected",
);
