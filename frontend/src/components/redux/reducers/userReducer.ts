import { LOGIN_SUCCESS, LOGIN_FAILURE, CREATE_NEW_USER, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAILURE, RESET_STORE } from "../../../utility";
import { IUser } from "../../interface";

// Initial state for the user reducer
const initialState = {
  data: [],
  isDataLoaded: false,
  error: '',
};

//Action TypeScript interface
export interface IAction {
  type: string,
  payload: Array<IUser>
}

// User reducer function to handle different action types
const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, data: action.payload, isDataLoaded: true };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, isDataLoaded: false };
    case CREATE_NEW_USER:
      return {
        ...state,
        isDataLoaded: false
      };
      case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        data: action.payload, isDataLoaded: true
      };
      case CREATE_NEW_USER_FAILURE:
      return {
        ...state,
        data:  action.payload, isDataLoaded: false
      };
    case RESET_STORE:
      return initialState; // Reset to the initial state
    default:
      return state;
  }
};

export default userReducer;