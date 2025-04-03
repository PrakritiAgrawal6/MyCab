import request from "supertest";
import express from "express";
import routes from "../../routes/routes";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("Router", () => {
    it("should use the user routes", async () => {
        const response = await request(app).get("/users");
        expect(response.status).not.toBe(404);
    });
})