/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { createNewUserFailure, createNewUserSuccess, loginUserfailure, loginUserSuccess, logout } from "../actions/userAction";
import { IAction } from "../reducers/userReducer";
import { toast } from "react-toastify";
import { CREATE_NEW_USER, LOGIN_USER, RESET_STORE } from "../../../utility";
import { IUser } from "../../interface";

export async function putUser(val: any): Promise<any> {
  const response = await fetch(`http://localhost:8080/api/v1/users/register`, {
    method: "POST",
    body: JSON.stringify(val),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return await response.json();
}

export async function validateUser(val: any): Promise<any> {
  const response = await fetch(`http://localhost:8080/api/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(val),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to validate user");
  }
  return await response.json();
}

function* createUserWorkerSaga(action: IAction): Generator<any, void, IUser> {
  try {
    const data = yield call(putUser, action.payload);
    yield put(createNewUserSuccess(data));
    toast.success("User added successfully!");
  } catch (error: any) {
    yield put(createNewUserFailure(error.message));
    toast.error("Error adding user: " + error.message);
  }
}

function* loginWorkerSaga(action: IAction) {
  try {
    const data: IUser = yield call(validateUser, action.payload);
    if (data) {
      yield put(loginUserSuccess(data));
    } else {
      yield put(loginUserfailure("Invalid login credentials"));
    }
  } catch (error) {
    yield put(loginUserfailure("An error occurred during login"));
    toast.error("Error adding user: " + error);
  }
}

function* resetStoreSaga() {
  yield put(logout());
}

export function* userWatcherSaga() {
  yield takeLatest(CREATE_NEW_USER, createUserWorkerSaga);
  yield takeLatest(LOGIN_USER, loginWorkerSaga);
  yield takeLatest(RESET_STORE, resetStoreSaga);
}