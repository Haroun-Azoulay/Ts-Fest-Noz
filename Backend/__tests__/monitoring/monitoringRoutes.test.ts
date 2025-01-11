import request from "supertest";
import express from "express";
import monitoringRoutes from "../../src/routes/monitoringRoutes";

const app = express();
app.use(monitoringRoutes);

describe("Test case for monitoring app.", () => {
  it("GET /ping", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);
    expect(response.text).toBe("pong");
  });
});
