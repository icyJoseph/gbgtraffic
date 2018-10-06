import { all, fork, takeLatest, call, put, select } from "redux-saga/effects";
import { checkPermission, reportGeolocation, getMapToken } from "./api";
import {
  selectPermission,
  selectMapToken,
  selectMapTokenExpiry,
  GET_GEO_PERMISSION,
  SET_GEO_PERMISSION,
  FETCH_MAP_TOKEN,
  UPDATE_MAP_TOKEN,
  SUCCESS_MAP_TOKEN,
  FAILED_MAP_TOKEN,
  GET_CURRENT_POSITION,
  SET_CURRENT_POSITION,
  FAILED_GEO
} from "./";

export function* getGeoPermission() {
  try {
    const permission = yield call(checkPermission);
    yield put({ type: SET_GEO_PERMISSION, payload: permission });
  } catch (error) {
    yield put({ type: FAILED_GEO, error });
  }
}

export function* getCurrentPosition() {
  try {
    const permission = yield select(selectPermission);
    if (permission === "granted") {
      const coords = yield call(reportGeolocation);
      yield put({ type: SET_CURRENT_POSITION, payload: coords });
    }
  } catch (error) {
    yield put({ type: FAILED_GEO, error });
  }
}

export function* loadMapToken() {
  try {
    const token = yield select(selectMapToken);
    const expiry = yield select(selectMapTokenExpiry);
    const shouldFetch = expiry && new Date().getTime() > expiry;
    if (!token || shouldFetch) {
      const newToken = yield call(getMapToken);
      yield put({ type: UPDATE_MAP_TOKEN, payload: newToken });
    }
    yield put({ type: SUCCESS_MAP_TOKEN });
  } catch (error) {
    yield put({ type: FAILED_MAP_TOKEN, error });
  }
}

export function* geoSaga() {
  yield all([
    fork(takeLatest, GET_GEO_PERMISSION, getGeoPermission),
    fork(takeLatest, GET_CURRENT_POSITION, getCurrentPosition),
    fork(takeLatest, FETCH_MAP_TOKEN, loadMapToken)
  ]);
}
