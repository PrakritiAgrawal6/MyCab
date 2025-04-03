import { all } from "redux-saga/effects";
import { userWatcherSaga } from "./userSaga";
import { bookingWatcherSaga } from "./bookingSaga";

function* rootsaga() {
  yield all([userWatcherSaga(), bookingWatcherSaga()])
}

export default rootsaga;