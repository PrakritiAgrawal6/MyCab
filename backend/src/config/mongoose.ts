import { connect } from "mongoose";
import logger from "../../logger";

//Async function to connect to the MongoDB database
const connectDB = async() => {
    try{
        connect("mongodb://127.0.0.1:27017/nightCab")
        console.log("MongoDB connection successful!")//Successful msg when connection is done
    }
catch{
    console.log("Something went wrong!")//Error msg when connection is failed
    logger.warn("MongoDB connection failed!")
}
}
export default connectDB;