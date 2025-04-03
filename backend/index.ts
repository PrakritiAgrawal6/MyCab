import express, { Application } from "express";
import routes from "./src/routes/routes";
import connectDB from "./src/config/mongoose";
const cors = require('cors')
require('dotenv').config();
import logger from "./logger";
import morgan from "morgan";

//Port declaration and App use
const port = process.env.PORT || 8080;
const app: Application = express();
app.use(express.json());
app.use(cors())

//Morgan format declared
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//API version 1 declared
app.use("/api/v1", routes)
app.listen(port, () => {
  connectDB();
  console.log(`Server running on: ${port}`);
});