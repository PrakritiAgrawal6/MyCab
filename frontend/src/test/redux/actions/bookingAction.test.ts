import { fetchBookings, fetchBookingsSuccess, fetchBookingsfailure, addBookings, addBookingSuccess, addBookingFailure, deleteBookings, deleteBookingSuccess, deleteBookingFailure } from "../../../components/redux/actions/bookingAction";
import { FETCH_BOOKINGS, FETCH_BOOKINGS_SUCCESS, FETCH_BOOKINGS_FAILURE, ADD_BOOKING, ADD_BOOKING_SUCCESS, ADD_BOOKING_FAILURE, DELETE_BOOKING, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAILURE } from "../../../utility";

  describe("Booking Action Creators", () => {
    it("should create an action to fetch bookings", () => {
      const booking = {
        _id: "1",
        approver: "John Doe",
        bookingID: "B123",
        status: 1,
        cabType: "Sedan",
        date: "2025-03-05",
        dropLocation: "Location A",
        endTime: "18:00",
        frequency: "Daily",
        mobileNumber: "1234567890",
        pickupLocation: "Location B",
        projectCode: "P123",
        reason: "Business",
        startTime: "09:00"
      };
      const expectedAction = {
        type: FETCH_BOOKINGS,
        payload: booking
      };
      expect(fetchBookings(booking)).toEqual(expectedAction);
    });
  
    it("should create an action for successful bookings fetch", () => {
      const bookings = [
        {
          _id: "1",
          approver: "John Doe",
          bookingID: "B123",
          status: 1,
          cabType: "Sedan",
          date: "2025-03-05",
          dropLocation: "Location A",
          endTime: "18:00",
          frequency: "Daily",
          mobileNumber: "1234567890",
          pickupLocation: "Location B",
          projectCode: "P123",
          reason: "Business",
          startTime: "09:00"
        },
        {
          _id: "2",
          approver: "Jane Doe",
          bookingID: "B124",
          status: 2,
          cabType: "SUV",
          date: "2025-03-06",
          dropLocation: "Location C",
          endTime: "19:00",
          frequency: "Weekly",
          mobileNumber: "0987654321",
          pickupLocation: "Location D",
          projectCode: "P124",
          reason: "Meeting",
          startTime: "10:00"
        }
      ];
      const expectedAction = {
        type: FETCH_BOOKINGS_SUCCESS,
        payload: bookings
      };
      expect(fetchBookingsSuccess(bookings)).toEqual(expectedAction);
    });
  
    it("should create an action for bookings fetch failure", () => {
      const expectedAction = {
        type: FETCH_BOOKINGS_FAILURE,
        payload: []
      };
      expect(fetchBookingsfailure()).toEqual(expectedAction);
    });
  
    it("should create an action to add a booking", () => {
      const booking = {
        _id: "1",
        approver: "John Doe",
        bookingID: "B123",
        status: 1,
        cabType: "Sedan",
        date: "2025-03-05",
        dropLocation: "Location A",
        endTime: "18:00",
        frequency: "Daily",
        mobileNumber: "1234567890",
        pickupLocation: "Location B",
        projectCode: "P123",
        reason: "Business",
        startTime: "09:00"
      };
      const expectedAction = {
        type: ADD_BOOKING,
        payload: booking
      };
      expect(addBookings(booking)).toEqual(expectedAction);
    });
  
    it("should create an action for successful booking addition", () => {
      const booking = {
        _id: "1",
        approver: "John Doe",
        bookingID: "B123",
        status: 1,
        cabType: "Sedan",
        date: "2025-03-05",
        dropLocation: "Location A",
        endTime: "18:00",
        frequency: "Daily",
        mobileNumber: "1234567890",
        pickupLocation: "Location B",
        projectCode: "P123",
        reason: "Business",
        startTime: "09:00"
      };
      const expectedAction = {
        type: ADD_BOOKING_SUCCESS,
        payload: booking
      };
      expect(addBookingSuccess(booking)).toEqual(expectedAction);
    });
  
    it("should create an action for booking addition failure", () => {
      const error = "Error adding booking";
      const expectedAction = {
        type: ADD_BOOKING_FAILURE,
        payload: error
      };
      expect(addBookingFailure(error)).toEqual(expectedAction);
    });
  
    it("should create an action to delete a booking", () => {
      const booking = {
        _id: "1",
        approver: "John Doe",
        bookingID: "B123",
        status: 1,
        cabType: "Sedan",
        date: "2025-03-05",
        dropLocation: "Location A",
        endTime: "18:00",
        frequency: "Daily",
        mobileNumber: "1234567890",
        pickupLocation: "Location B",
        projectCode: "P123",
        reason: "Business",
        startTime: "09:00"
      };
      const expectedAction = {
        type: DELETE_BOOKING,
        payload: booking
      };
      expect(deleteBookings(booking)).toEqual(expectedAction);
    });
  
    it("should create an action for successful booking deletion", () => {
      const bookingId = "1";
      const expectedAction = {
        type: DELETE_BOOKING_SUCCESS,
        payload: bookingId
      };
      expect(deleteBookingSuccess(bookingId)).toEqual(expectedAction);
    });
  
    it("should create an action for booking deletion failure", () => {
      const error = "Error deleting booking";
      const expectedAction = {
        type: DELETE_BOOKING_FAILURE,
        payload: error
      };
      expect(deleteBookingFailure(error)).toEqual(expectedAction);
    });
  });