import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["Pending", "Cancelled", "Approved", "Rejected"],
    required: true
  },
  approver: {
    type: String,
    required: true
  },
  cabType: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: false
  },
  frequency: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  projectCode: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  rmsapid:{
    type: Number,
    required: true,
  },
  empsapid:{
    type: Number,
    required: true,
  }
});

export const Booking = mongoose.model('Booking', BookingSchema);