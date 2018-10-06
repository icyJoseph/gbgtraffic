import { takeLatest, call, put, select } from "redux-saga/effects";
import { getNearbyStops } from "./api";
import { selectCoords } from "../geoLocation";
import { selectToken } from "../auth";
import {
  FETCH_NEARBY_STOPS,
  SUCCESS_NEARBY_STOPS,
  FAILED_NEARBY_STOPS
} from "./";

export function* loadNearbyStops() {
  try {
    const token = yield select(selectToken);
    const { lat, lng } = yield select(selectCoords);
    const payload = yield call(getNearbyStops, token, lat, lng);
    yield put({ type: SUCCESS_NEARBY_STOPS, payload });
  } catch (error) {
    yield put({ type: FAILED_NEARBY_STOPS, error });
  }
}

export function* trafficSaga() {
  yield takeLatest(FETCH_NEARBY_STOPS, loadNearbyStops);
}
