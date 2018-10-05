import { all, fork, takeLatest, call, put, select } from "redux-saga/effects";
import { checkPermission, reportGeolocation } from "./api";
import {
  selectPermission,
  GET_GEO_PERMISSION,
  SET_GEO_PERMISSION,
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

export function* geoSaga() {
  yield all([
    fork(takeLatest, GET_GEO_PERMISSION, getGeoPermission),
    fork(takeLatest, GET_CURRENT_POSITION, getCurrentPosition)
  ]);
}
