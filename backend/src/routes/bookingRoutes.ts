import { Router } from "express";
import { BookingController } from "../controllers/bookingController";

const bookingRoutes = Router();

//Booking page routes
bookingRoutes.get("/", BookingController.getBooking)
bookingRoutes.post("/", BookingController.saveBooking)
bookingRoutes.patch("/:id", BookingController.updateBookingStatus)

export default bookingRoutes;