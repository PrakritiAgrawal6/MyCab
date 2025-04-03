const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phno: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, 
  enum: ["employee", "manager"], 
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

export const User = mongoose.model("User", userSchema);
