import { createNewUser, createNewUserSuccess, createNewUserFailure, loginUser, loginUserSuccess, loginUserfailure, logout } from "../../../components/redux/actions/userAction";
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_FAILURE,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_STORE
} from "../../../utility";

describe("Action Creators", () => {
  it("should create an action to create a new user", () => {
    const user = {
      _id: "REQ_987987",
      name: "Prakriti Agrawal",
      email: "prakriti.agrawal@hcltech.com",
      phno: "9873687677",
      password: "prakriti123",
      address: {},
      role: 'manager',
      empsapid: 52297842,
      rmsapid: 51422999
    };
    const expectedAction = {
      type: CREATE_NEW_USER,
      payload: user
    };
    expect(createNewUser(user)).toEqual(expectedAction);
  });

  it("should create an action for successful user creation", () => {
    const user = {
      _id: "REQ_987987",
      name: "Prakriti Agrawal",
      email: "prakriti.agrawal@hcltech.com",
      phno: "9873687677",
      password: "prakriti123",
      address: {},
      role: 'manager',
      empsapid: 52297842,
      rmsapid: 51422999
    };
    const expectedAction = {
      type: CREATE_NEW_USER_SUCCESS,
      payload: user
    };
    expect(createNewUserSuccess(user)).toEqual(expectedAction);
  });
  
    it("should create an action for user creation failure", () => {
      const error = "Error creating user";
      const expectedAction = {
        type: CREATE_NEW_USER_FAILURE,
        payload: error
      };
      expect(createNewUserFailure(error)).toEqual(expectedAction);
    });
  
    it("should create an action to login a user", () => {
      const credentials = { email: "prakriti.agrawal@hcltech.com", password: "prakriti123" };
      const expectedAction = {
        type: LOGIN_USER,
        payload: credentials
      };
      expect(loginUser(credentials)).toEqual(expectedAction);
    });
  
    it("should create an action for successful login", () => {
      const credentials = { email: "prakriti.agrawal@hcltech.com", password: "prakriti123" };
      const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: credentials
      };
      expect(loginUserSuccess(credentials)).toEqual(expectedAction);
    });
  
    it("should create an action for login failure", () => {
      const error = "Login failed";
      const expectedAction = {
        type: LOGIN_FAILURE,
        payload: error
      };
      expect(loginUserfailure(error)).toEqual(expectedAction);
    });
  
    it("should create an action to logout", () => {
      const expectedAction = {
        type: RESET_STORE,
        payload: []
      };
      expect(logout()).toEqual(expectedAction);
    });
  });