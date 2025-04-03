import { connect } from "mongoose";
import connectDB from "../../config/mongoose";
import logger from "../../../logger";

jest.mock("mongoose", () => ({
    connect: jest.fn(),
}));

describe("connectDB", () => {
    beforeEach(() => {
      const MONGO_DB_URL = "mongodb://localhost:27017/nightCab";
    });

    it("should connect to the database successfully", async () => {
        (connect as jest.Mock).mockResolvedValueOnce(null);
        console.log = jest.fn(); // Mock console.log
        await connectDB();

        expect(connect).toHaveBeenCalledWith("mongodb://localhost:27017/nightCab");
        expect(console.log).toHaveBeenCalledWith("MongoDB connection successful!");
    });

    it("should handle connection errors", async () => {
        const error = new Error("Something went wrong!");
        (connect as jest.Mock).mockRejectedValueOnce(error);
        console.log = jest.fn(); // Mock console.log
        logger.warn = jest.fn(); // Mock logger.warn
        await connectDB();

        expect(connect).toHaveBeenCalledWith("mongodb://localhost:27017/nightCab");
        expect(console.log).toHaveBeenCalledWith("Something went wrong!");
        expect(logger.warn).toHaveBeenCalledWith("MongoDB connection failed!", error);
    });
});