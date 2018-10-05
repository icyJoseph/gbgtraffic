import { takeLatest, call, put, select } from "redux-saga/effects";
import { getToken } from "./api";
import {
  selectToken,
  selectExpiry,
  UPDATE_TOKEN,
  SUCCESS_TOKEN,
  FAILED_TOKEN,
  FETCH_TOKEN
} from "./";

export function* loadToken() {
  try {
    const token = yield select(selectToken);
    const expiry = yield select(selectExpiry);
    const shouldFetch = expiry && new Date().getTime() > expiry;
    if (!token || shouldFetch) {
      const newToken = yield call(getToken);
      yield put({ type: UPDATE_TOKEN, payload: newToken });
    }
    yield put({ type: SUCCESS_TOKEN });
  } catch (error) {
    yield put({ type: FAILED_TOKEN, error });
  }
}

export function* authSaga() {
  yield takeLatest(FETCH_TOKEN, loadToken);
}
