/* eslint-disable @typescript-eslint/no-explicit-any */

import { FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, ADD_BOOKING_SUCCESS, ADD_BOOKING_FAILURE, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAILURE, RESET_STORE, UPDATE_BOOKING_STATUS_SUCCESS, UPDATE_BOOKING_STATUS_FAILURE } from "../../../utility";
import { IBooking } from "../../interface";

const initialState = {
    booking: [],
    isDataLoaded: false,
    error: "",
  };
  export interface IAction {
    type: string;
    payload: any;
  }
  
  const bookingReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
      case FETCH_BOOKINGS_SUCCESS:
        return { ...state, data: action.payload, isDataLoaded: true, error: "" };
      case FETCH_BOOKINGS_FAILURE:
        return { ...state, data: [], isDataLoaded: false, error: action.payload };
        case ADD_BOOKING_SUCCESS:
          return {
            ...state,
            bookings: [...state.booking, action.payload],
            error: "",
          };
        case ADD_BOOKING_FAILURE:
          return {
            ...state,
            error: action.payload,
          };
        case UPDATE_BOOKING_STATUS_SUCCESS:
         return { ...state,
          bookings: state.booking.map((booking: IBooking) =>
            booking.bookingID === action.payload._id ? action.payload : booking
          ),
          error: null,};
          case UPDATE_BOOKING_STATUS_FAILURE:
            return {
              ...state,
              error: "Failed to update booking status",
            };
      case DELETE_BOOKING_SUCCESS:
        return { ...state, data: state.booking.filter((booking:IBooking) => booking.bookingID !== action.payload), error: "" };
      case DELETE_BOOKING_FAILURE:
        return { ...state, error: action.payload };
      case RESET_STORE:
        return { ...state, data: [], isDataLoaded: false, error: "" };
      default:
        return state;
    }
  };
  
  export default bookingReducer;