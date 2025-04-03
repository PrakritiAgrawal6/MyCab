import { Request, Response } from "express";
import logger from "../../logger";
import { User } from "../models/usermodels";
import {jwtToken} from "../jwt/jwt"

export const saveUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User data saved!");
    logger.info("User data is saved!");
  } catch (error) {
    res.status(500).send("Something went wrong, try again!");
    logger.warn("Something went wrong in saving user data: ", error);
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const res1 = await User.find();
    res.status(200).send(res1);
    logger.info("User data is fetched!");
  } catch (error) {
    res.status(500).send("Something went wrong, try again!");
    logger.warn("Something went wrong in fetching data: ", error);
  }
};

// Function to handle the updateUser request
const updateUser = (_req: Request, res: Response) => {
  try {
    res.send("updateUser data!");
    logger.info("Data updated!");
  } catch {
    res.status(500).send("Something went wrong, try again!");
    logger.warn("Data updation failed");
  }
};

/**
 * Description for the below snippet
 *
 * @param {Request} req
 * @param {Response} res
 */
export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      // If no user is found, return an appropriate error message
      return res.status(404).json({ error: "User not found." });
    }

    // Compare the provided password with the stored password in the database
    const isValid = password === user.password;
    if (!isValid) {
      // If the password does not match, return an error message
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Create a token
    const token = jwtToken.generateToken(user);

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // If the credentials are valid, respond with success message
    res.json({ message: "Login successful!", data:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const UserController = { 
  getUser, saveUser, loginUser, updateUser };
