// src/store/orderSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { sendOrder } from "../../api/orderApi";
import { orderRequested, orderSucceeded, orderFailed } from "../actions";
import type { Order } from "../actions";

// Сага для обработки оформления заказа
function* handleOrderRequest(
  action: ReturnType<typeof orderRequested>,
): SagaIterator {
  try {
    // Вызываем API
    yield call(sendOrder, action.payload as Order);

    // Успешно — диспатчим succeeded
    yield put(orderSucceeded());
  } catch (error) {
    // Ошибка — диспатчим failed
    yield put(orderFailed((error as Error).message));
  }
}

// Watcher saga
export function* orderSaga(): SagaIterator {
  yield takeLatest(orderRequested.type, handleOrderRequest);
}
