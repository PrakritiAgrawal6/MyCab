import { Request, Response } from "express";
import logger from "../../logger";
import { Booking } from "../models/bookingModel";

// Async function to handle the getBooking request
const getBooking = async(req: Request, res: Response) => {
  try {
    const {rmsapid,empsapid} = req.query;
    let res1;
    if(rmsapid)  res1 = await Booking.find({rmsapid});
    if(empsapid) res1 = await Booking.find({empsapid});
    res.status(200).send(res1);
    logger.info("Booking data is fetched!");
  } catch {
    res.status(500).send("Something went wrong, try again!");
    logger.warn("Something went wrong in fetching data")
  }
};

// Function to handle the saveBooking request
const saveBooking = async (req: Request, res: Response) => {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.send(booking)
      logger.info("Booking created!");
    } catch (error: any) {
        res.status(500).send("Something went wrong, try again!");
        logger.warn("Something went wrong in saving Booking data: ", error);
      }
    }

// Function to handle the deleteBooking request
const deleteBooking = (_req: Request, res: Response) => {
  try {
    res.send("deleteBooking data!");
    logger.info("Data deleted!")
  } catch {
    res.status(500).send("Something went wrong, try again!");
    logger.warn("Data deletion failed")
  }
};


// Function to handle the updateBooking status request
const updateBookingStatus = async (req: Request, res: Response) => {
  console.log('first', req.params, req.body)
  const bookingID = req.params.id;
  const { status } = req.body;

  try {
    const booking = await Booking.findOneAndUpdate({booking_id: bookingID}, { status }, { new: true });

    if (!booking) {
      res.status(404).send("Booking not found");
      logger.warn(`Booking with id ${bookingID} not found`);
      return;
    }

    res.send(booking);
    logger.info(`Booking with id ${bookingID} updated to status ${status}`);
  } catch (error) {
    res.status(500).send("Something went wrong, try again!");
    logger.error("Data updation failed", error);
  }
};

export const BookingController = { getBooking, saveBooking, deleteBooking, updateBookingStatus };