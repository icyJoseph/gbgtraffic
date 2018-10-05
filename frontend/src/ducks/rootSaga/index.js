import { all, fork } from "redux-saga/effects";

import { authSaga } from "../auth/saga";
import { geoSaga } from "../geoLocation/saga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(geoSaga)]);
}
