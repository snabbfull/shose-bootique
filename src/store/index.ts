import createSagaMiddleware from "redux-saga";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { rootSaga } from "./rootSaga";
import productsReducer from "./products/productsSlice";
import {cartReducer} from "./cart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage для веба

const sagaMiddleware = createSagaMiddleware();

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "totalCount", "totalPrice"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: 
    rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

// подключаем только rootSaga
sagaMiddleware.run(rootSaga);

// Настраиваем persistor для хранения состояния в localStorage
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
