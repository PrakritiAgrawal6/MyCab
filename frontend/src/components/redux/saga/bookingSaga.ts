/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { IAction } from "../reducers/bookingReducer";
import { IBooking } from "../../interface";
import { ADD_BOOKING, ADD_BOOKING_FAILURE, ADD_BOOKING_SUCCESS, FETCH_BOOKINGS, UPDATE_BOOKING_STATUS } from "../../../utility";
import { fetchBookingsfailure, fetchBookingsSuccess, updateBookingStatusFailure, updateBookingStatusSuccess } from "../actions/bookingAction";

//Get bookings async function with WorkerSaga
export async function getBooking(): Promise<Array<IBooking>> {
  const response = await fetch(`http://localhost:8080/api/v1/bookings`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const res = await response.json();
  return res;
}

export function* getBookingWorkerSaga() {
  try {
    const bookings: Array<IBooking> = yield call(getBooking);
    if (bookings.length !== 0) {
      yield put(fetchBookingsSuccess(bookings));
    } else {
      yield put(fetchBookingsfailure());
    }
  } catch (err) {
    console.error("Error fetching bookings:", err);
    yield put(fetchBookingsfailure());
  }
}
  //Add bookings async function with WorkerSaga
  export async function addBooking(booking: IBooking) {
    const exist1 = await fetch(`http://localhost:8080/api/v1/bookings`, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await exist1.json();
    return res;
  }
  
  // add a new Booking
  export function* addBookingWorkerSaga(action: IAction) {
    try {
      const booking: IBooking = yield call(addBooking, action.payload);
      yield put({ type: ADD_BOOKING_SUCCESS, payload: booking });
    } catch (error) {
      yield put({ type: ADD_BOOKING_FAILURE, payload: error });
    }
  }
// Update the status of booking
async function updateBookingStatus(id: string, status: string): Promise<IBooking> {
  const response = await fetch(`http://localhost:8080/api/v1/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update booking status");
  }

  const res = await response.json();
  return res;
}

function* updateBookingStatusWorkerSaga(action: IAction) {
  try {
    const { id, status } = action.payload;
    const updatedBooking: IBooking = yield call(updateBookingStatus, id, status);
    yield put(updateBookingStatusSuccess(updatedBooking));
  } catch (error) {
    console.error("Error updating booking status:", error);
    yield put(updateBookingStatusFailure());
  }
}
  
  //Bookings watcher saga
  export function* bookingWatcherSaga() {
    yield takeLatest(FETCH_BOOKINGS, getBookingWorkerSaga);
    yield takeLatest(ADD_BOOKING, addBookingWorkerSaga);
    yield takeLatest(UPDATE_BOOKING_STATUS, updateBookingStatusWorkerSaga)
  }