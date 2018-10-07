import { all, fork, takeLatest, call, put, select } from "redux-saga/effects";
import { getNearbyStops, getDepartureBoard, getArrivalBoard } from "./api";
import { selectStopId } from "../map";
import { selectCoords } from "../geoLocation";
import { FETCH_TOKEN, selectToken } from "../auth";
import {
  FETCH_NEARBY_STOPS,
  SUCCESS_NEARBY_STOPS,
  FAILED_NEARBY_STOPS,
  FETCH_BOARD,
  SUCCESS_BOARD,
  FAILED_BOARD
} from "./";

export function* loadNearbyStops() {
  try {
    const token = yield select(selectToken);
    const { lat, lng } = yield select(selectCoords);
    const payload = yield call(getNearbyStops, token, lat, lng);
    yield put({ type: SUCCESS_NEARBY_STOPS, payload });
  } catch (error) {
    yield put({ type: FETCH_TOKEN });
    yield put({ type: FAILED_NEARBY_STOPS, error });
  }
}

export function* loadBoard() {
  try {
    const token = yield select(selectToken);
    const stopId = yield select(selectStopId);
    const [departure, arrival] = yield all([
      call(getDepartureBoard, token, stopId),
      call(getArrivalBoard, token, stopId)
    ]);
    yield put({ type: SUCCESS_BOARD, payload: { ...departure, ...arrival } });
  } catch (error) {
    yield put({ type: FAILED_BOARD, error });
  }
}

export function* trafficSaga() {
  yield all([
    fork(takeLatest, FETCH_NEARBY_STOPS, loadNearbyStops),
    fork(takeLatest, FETCH_BOARD, loadBoard)
  ]);
}
