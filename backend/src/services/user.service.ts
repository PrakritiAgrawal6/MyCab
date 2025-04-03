import express, { Request, Response } from "express";
const {saveUser, loginUser, getUser} = require('../controllers/userController')
const app = express();
// const bcrypt = require("bcrypt");
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());

// Register page
app.post("/register", saveUser);

// Login page
app.post("/login", loginUser);

// Get user data
app.get("/users", getUser);

export default app;