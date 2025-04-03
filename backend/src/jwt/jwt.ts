import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

interface IUser {
  email: string;
  password: string;
}

//Function to hash the password
// const generatePwd = async (pwd: string) => {
//   const hashedPassword = await bcrypt.hash(pwd, 10);
//   return hashedPassword;
// };

//Function to generate token taking user and password
const generateToken = async (user: IUser) => {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    return token;
  }

//Function to verify token if password matches
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');//401 Unauthorized 
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) next(); //Proceed to the next middleware if verified
  } catch (err) {
    res.status(400).send('Invalid token.'); //400 Bad request
  }
};

export const jwtToken = {  generateToken, verifyToken };