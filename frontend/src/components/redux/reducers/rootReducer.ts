/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer";

const rootReducer: any = combineReducers({
   user: userReducer,
   booking: bookingReducer
})

export default rootReducer;