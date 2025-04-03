/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IBooking } from "../interface";
import { useSelector } from "react-redux";

const Requests: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const empsapid = useSelector((state: any)=> state.user.data.data.empsapid)

  const navigate = useNavigate();
      // Navigate back to the cab booking page
  const handleBack = () => {
    navigate("/cab");
  };

  useEffect(() => {
    const fetchBookings = async (empsapid: string) => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/bookings?rmsapid=${empsapid}`);
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

    fetchBookings(empsapid);
  }, []);

  const handleApprovalChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/bookings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update booking status locally
      const updatedBookings = bookings.map((booking: IBooking) =>
        booking.booking_id === id
          ? { ...booking, status: newStatus }
          : booking
      );

      setBookings(updatedBookings);

      toast.info(`Booking ${newStatus}!`);
    } catch (error) {
      toast.error(`Failed to update booking: ${error}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>No requests pending</div>;

  return (
    <div className="flex flex-col p-4">
      {bookings.map((booking: IBooking) => (
        <div
          key={booking._id}
          className="bg-white p-4 rounded-lg shadow-md m-2 relative flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-bold">{booking.date}</p>
            <p className="text-md text-gray-600">{booking.booking_id}</p>
            <p className="text-md text-gray-600">
              {booking.cabType}
            </p>
            <p className="text-sm">{booking.pickupLocation}</p>
            <p className="text-sm mb-4">{booking.dropLocation}</p>
          </div>
          <div className="flex flex-col items-end">
            {/* Display current status */}
            <p
              className={`text-md font-bold absolute top-2 right-2 ${
                booking.status === "Approved"
                  ? "text-green-600"
                  : booking.status === "Cancelled"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {booking.status}
            </p>
            <div className="flex gap-5 space-x-2 mt-2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApprovalChange(booking.booking_id, "Approved")}
                disabled={booking.status !== "Pending"}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleApprovalChange(booking.booking_id, "Cancelled")}
                disabled={booking.status !== "Pending"}
              >
                Reject
              </Button>
            </div>
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

export default Requests;