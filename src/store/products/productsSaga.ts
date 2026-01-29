import { call, put, takeLatest, select } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  catalogItemsRequested,
  catalogItemsSucceeded,
  catalogItemsFailed,
  catalogLoadMore,
  topSalesRequested,
  topSalesSucceeded,
  topSalesFailed,
  productDetailsRequested,
  productDetailsSucceeded,
  productDetailsFailed,
  categoriesRequested,
  categoriesSucceeded,
  categoriesFailed,
} from "../actions";
import type { TopSalesItems, ProductDetails, Item } from "../actions";
import {
  fetchTopSales,
  fetchCatalogItems,
  fetchProductDetails,
  fetchCategories,
} from "../../api/productsApi";
import type { ProductsState } from "./productsSlice";

// -------------------------- TOP SALES --------------------------
function* handleTopSalesRequest(): SagaIterator {
  try {
    const items: Item[] = yield call(fetchTopSales);
    const payload: TopSalesItems = { data: items };
    yield put(topSalesSucceeded(payload));
  } catch (error) {
    yield put(topSalesFailed((error as Error).message));
  }
}

// -------------------------- CATALOG --------------------------
function* handleCatalogRequest(
  action: ReturnType<typeof catalogItemsRequested>,
): SagaIterator {
  try {
    const items: Item[] = yield call(fetchCatalogItems, {
      categoryId: action.payload?.categoryId ?? "Все",
      search: action.payload?.search ?? "",
      offset: 0,
      limit: 6,
    });

    yield put(
      catalogItemsSucceeded({
        items,
        offset: items.length,
        hasMore: items.length === 6,
      }),
    );
  } catch (error) {
    yield put(catalogItemsFailed((error as Error).message));
  }
}

function* handleCatalogLoadMore(
  action: ReturnType<typeof catalogLoadMore>,
): SagaIterator {
  try {
    const state: ProductsState = yield select((state) => state.products);
    const existingItems = state.catalog.data.items;

    const newItems: Item[] = yield call(fetchCatalogItems, {
      categoryId: action.payload.categoryId ?? "Все",
      search: action.payload.search,
      offset: action.payload.offset,
      limit: 6,
    });

    yield put(
      catalogItemsSucceeded({
        items: newItems,
        offset: existingItems.length + newItems.length,
        hasMore: newItems.length === 6,
      }),
    );
  } catch (error) {
    yield put(catalogItemsFailed((error as Error).message));
  }
}

// -------------------------- PRODUCT DETAILS --------------------------
function* handleProductDetailsRequest(
  action: ReturnType<typeof productDetailsRequested>,
): SagaIterator {
  try {
    const item: Item = yield call(fetchProductDetails, action.payload);
    const payload: ProductDetails = { item };
    yield put(productDetailsSucceeded(payload));
  } catch (error) {
    yield put(productDetailsFailed((error as Error).message));
  }
}

function* handleCategoriesRequest(): SagaIterator {
  try {
    const data: [] = yield call(fetchCategories);
    yield put(categoriesSucceeded(data));
  } catch (error) {
    yield put(categoriesFailed((error as Error).message));
  }
}

// -------------------------- WATCHERS --------------------------
export function* productsSaga(): SagaIterator {
  yield takeLatest(topSalesRequested.type, handleTopSalesRequest);
  yield takeLatest(catalogItemsRequested.type, handleCatalogRequest);
  yield takeLatest(catalogLoadMore.type, handleCatalogLoadMore);
  yield takeLatest(productDetailsRequested.type, handleProductDetailsRequest);
  yield takeLatest(categoriesRequested.type, handleCategoriesRequest);
}
