/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IBooking } from "../interface";
import { useSelector } from "react-redux";

// Stepper labels as an array of strings
const steps = ["Pending", "Approved"];

const BookingHistory: React.FC = () => {
  const navigate = useNavigate();

  // Initialize bookings state
  const [bookings, setBookings] = useState<Array<IBooking>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const empsapid = useSelector((state: any)=> state.user.data.data.empsapid)

  // Fetch booking data from the URL
    const fetchBookings = async (empsapid: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/bookings?empsapid=${empsapid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setBookings(result.map((booking: any) => ({
          ...booking,
          isCancelled: false,
        })));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchBookings(empsapid);
  }, []);

  // Navigate back to the cab booking page
  const handleBack = () => {
    navigate("/cab");
  };

  const handleCancelRequest = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedBookings = bookings.map(booking =>
        booking.booking_id === id ? { ...booking, status: 'Cancelled', isCancelled: true } : booking
      );
      setBookings(updatedBookings);

      toast.info("Booking Cancelled!");
    } catch (error: any) {
      toast.error(`Failed to cancel booking: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col p-4">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md m-2 relative flex justify-between items-center"
        >
          <div>
            {/* Display booking details */}
            <p className="text-lg font-bold">{booking.date}</p>
            <p className="text-md text-gray-600">{booking.booking_id}</p>
            <p className="text-md text-gray-600">
              {booking.cabType} - {booking.approver}
            </p>
            <p className="text-sm">{booking.pickupLocation}</p>
            <p className="text-sm mb-4">{booking.dropLocation}</p>
            {/* Display booking status using a stepper */}
            <Stepper activeStep={steps.indexOf(booking.status)} alternativeLabel>
              {steps.map((label, stepIndex) => (
                <Step key={stepIndex}>
                  <StepLabel
                    style={{
                      color: booking.status === "Approved" && stepIndex === 1 ? "green" : "inherit",
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="flex flex-col items-end">
            {/* Display current status */}
            <p className={`text-md font-bold absolute top-2 right-2 ${booking.status === 'Approved' ? 'text-green-600' : booking.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
              {booking.status}
            </p>
            {/* Button to cancel the booking */}
            <Button
              variant="contained"
              color="primary"
              className="mt-2"
              onClick={() => handleCancelRequest(booking.booking_id)}
              disabled={booking.status === 'Cancelled'}
            >
              Cancel Request
            </Button>
          </div>
        </div>
      ))}
      {/* Button to navigate back */}
      <div className="flex justify-center mt-4">
        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingHistory;