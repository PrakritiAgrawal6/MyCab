import { Router } from "express";
import userRoutes from "./userRoutes";
import bookingRoutes from "./bookingRoutes";

const routes = Router();

//Adding all the routes here
routes.use("/users", userRoutes)
routes.use("/bookings", bookingRoutes)

export default routes;