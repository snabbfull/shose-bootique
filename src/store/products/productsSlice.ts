import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  topSalesRequested,
  topSalesSucceeded,
  topSalesFailed,
  catalogItemsRequested,
  catalogItemsSucceeded,
  catalogItemsFailed,
  productDetailsRequested,
  productDetailsSucceeded,
  productDetailsFailed,
  catalogReset,
  catalogLoadMore,
  categoriesRequested,
  categoriesSucceeded,
  categoriesFailed,
  categorySelected,
} from "../actions";

import type { TopSalesItems, CatalogItems, ProductDetails } from "../actions";

export interface ProductsState {
  topSales: {
    data: TopSalesItems;
    loading: boolean;
    error: string | null;
  };
  catalog: {
    data: CatalogItems;
    loading: boolean;
    loadingMore: boolean; // кнопка "Загрузить ещё"
    error: string | null;
  };
  details: {
    data: ProductDetails;
    loading: boolean;
    error: string | null;
  };
}

export const initialState: ProductsState = {
  topSales: {
    data: { data: [] },
    loading: false,
    error: null,
  },
  catalog: {
    data: {
      items: [],
      categories: [],
      selectedCategory: "Все",
      search: "",
      offset: 0,
      hasMore: true,
    },
    loading: false,
    loadingMore: false,
    error: null,
  },
  details: {
    data: { item: null },
    loading: false,
    error: null,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---- Top Sales ----
    builder
      .addCase(topSalesRequested, (state) => {
        state.topSales.loading = true;
        state.topSales.error = null;
      })
      .addCase(
        topSalesSucceeded,
        (state, action: PayloadAction<TopSalesItems>) => {
          state.topSales.data = action.payload;
          state.topSales.loading = false;
        },
      )
      .addCase(topSalesFailed, (state, action: PayloadAction<string>) => {
        state.topSales.loading = false;
        state.topSales.error = action.payload;
      });

    // ---- Catalog ----
    builder
      .addCase(catalogItemsRequested, (state) => {
        state.catalog.loading = true;
        state.catalog.loadingMore = false;
        state.catalog.error = null;
        state.catalog.data.items = [];
        state.catalog.data.offset = 0;
        state.catalog.data.hasMore = true;
      })
      .addCase(
        catalogItemsSucceeded,
        (state, action: PayloadAction<CatalogItems>) => {
          state.catalog.data = {
            ...state.catalog.data,
            ...action.payload,
            items:
              action.payload.offset === 0
                ? action.payload.items
                : [...state.catalog.data.items, ...action.payload.items],
          };
          state.catalog.loading = false;
          state.catalog.loadingMore = false;
        },
      )
      .addCase(catalogItemsFailed, (state, action: PayloadAction<string>) => {
        state.catalog.loading = false;
        state.catalog.loadingMore = false;
        state.catalog.error = action.payload;
      })
      .addCase(catalogReset, (state) => {
        state.catalog.data = {
          items: [],
          categories: [],
          selectedCategory: "Все",
          search: "",
          offset: 0,
          hasMore: true,
        };
        state.catalog.loading = false;
        state.catalog.error = null;
      })
      .addCase(catalogLoadMore, (state) => {
        state.catalog.loadingMore = true;
      });

    // ---- Product Details ----
    builder
      .addCase(productDetailsRequested, (state) => {
        state.details.loading = true;
        state.details.error = null;
      })
      .addCase(
        productDetailsSucceeded,
        (state, action: PayloadAction<ProductDetails>) => {
          state.details.data = action.payload;
          state.details.loading = false;
        },
      )
      .addCase(productDetailsFailed, (state, action: PayloadAction<string>) => {
        state.details.loading = false;
        state.details.error = action.payload;
      });

      builder
        .addCase(categoriesRequested, (state) => {
          state.catalog.error = null;
        })

        .addCase(categoriesSucceeded, (state, action) => {
          state.catalog.data.categories = action.payload;
        })

        .addCase(categoriesFailed, (state, action) => {
          state.catalog.error = action.payload;
        })

        .addCase(categorySelected, (state, action) => {
          state.catalog.data.selectedCategory = action.payload;

          // сбрасываем каталог
          state.catalog.data.items = [];
          state.catalog.data.offset = 0;
          state.catalog.data.hasMore = true;
        });
  },
});

export default productsSlice.reducer;
