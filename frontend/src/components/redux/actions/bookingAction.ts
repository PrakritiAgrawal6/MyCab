import { FETCH_BOOKINGS, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, ADD_BOOKING, DELETE_BOOKING, ADD_BOOKING_SUCCESS, ADD_BOOKING_FAILURE, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAILURE, UPDATE_BOOKING_STATUS_FAILURE, UPDATE_BOOKING_STATUS_SUCCESS, UPDATE_BOOKING_STATUS } from "../../../utility";
import { IBooking } from "../../interface";

export const fetchBookings = () => {
    return {
      type: FETCH_BOOKINGS
    };
  };
  
  export const fetchBookingsSuccess = (booking: Array<IBooking>) => {
    return {
      type: FETCH_BOOKINGS_SUCCESS,
      payload: booking
    };
  };
  
  export const fetchBookingsfailure = () => {
    return {
      type: FETCH_BOOKINGS_FAILURE,
      payload: []
    };
  };

  export const addBookings = (booking: IBooking) =>{
    return{
      type: ADD_BOOKING,
      payload: booking
    }
  }

  export const addBookingSuccess = (booking: IBooking) => ({
    type: ADD_BOOKING_SUCCESS,
    payload: booking
  });
  
  export const addBookingFailure = (error: string) => ({
    type: ADD_BOOKING_FAILURE,
    payload: error
  });
  
  export const updateBookingStatus = (id: string, status: string) => ({
    type: UPDATE_BOOKING_STATUS,
    payload: { id, status }
  });
  
  export const updateBookingStatusSuccess = (booking: IBooking) => ({
    type: UPDATE_BOOKING_STATUS_SUCCESS,
    payload: booking,
  });
  
  export const updateBookingStatusFailure = () => ({
    type: UPDATE_BOOKING_STATUS_FAILURE,
  });

  export const deleteBookings = (booking: IBooking) =>{
    return{
      type: DELETE_BOOKING,
      payload: booking
    }
  }
  
export const deleteBookingSuccess = (bookingId: string) => ({
  type: DELETE_BOOKING_SUCCESS,
  payload: bookingId
});

export const deleteBookingFailure = (error: string) => ({
  type: DELETE_BOOKING_FAILURE,
  payload: error
});