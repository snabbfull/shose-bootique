import { all } from "redux-saga/effects";
import { productsSaga } from "./products/productsSaga";
import { orderSaga } from "./order/orderSaga";

export function* rootSaga() {
  yield all([
    productsSaga(),
    orderSaga(),
  ]);
}

//Объединяем все саги в rootSaga для передачи в store