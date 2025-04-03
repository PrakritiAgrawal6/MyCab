import { CREATE_NEW_USER, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAILURE, LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_STORE } from "../../../utility";
import { ICredentials, IUser } from "../../interface";

// Action creator for creating a new user
export const createNewUser = (user: IUser) => {
  return {
    type: CREATE_NEW_USER,
    payload: user
  };
};

export const createNewUserSuccess = (user: IUser) => {
  return {
    type: CREATE_NEW_USER_SUCCESS,
    payload: user
  };
};

export const createNewUserFailure = (error: string) => {
  return {
    type: CREATE_NEW_USER_FAILURE,
    payload: error
  };
};

// Action creator for logging in a user
export const loginUser = (credentials: ICredentials) => {
  return {
    type: LOGIN_USER,
    payload: credentials
  };
};

// Action creator for successful login
export const loginUserSuccess = (credentials: ICredentials) => {
  return {
    type: LOGIN_SUCCESS,
    payload: credentials
  };
};

// Action creator for login failure
export const loginUserfailure = (error: string) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

// Action creator for logging out
export const logout = () => {
  return {
    type: RESET_STORE,
    payload: []
  };
};