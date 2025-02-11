import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import goodieTypeRoutes from "../../src/routes/goodieTypeRoutes";
import User from "../../src/models/User";
import GoodieType from "../../src/models/GoodieType";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(goodieTypeRoutes);

let tokenUser: string | undefined;
let tokenAdmin: string | undefined;

let existGoodieType = new GoodieType({
  id: "",
  name: "",
});
const userLogin = {
  pseudo: "bechari",
  password: "test",
};
const adminLogin = {
  pseudo: "admin",
  password: "admin",
};
const newGoodieType = {
  name: "goodie_type_test",
};
const unknownId: string = "5cbfa5dc-7999-4fb1-a443-33894fb52ccb";

describe("Test case for goodietype routes", () => {
  it("1 - test case to signin user", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });
  it("2 - test case to signin admin", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });
  it("3 - test case to create goodie type", async () => {
    const response = await request(app)
      .post("/create-goodie-type")
      .send(newGoodieType)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
    existGoodieType = response.body;
    console.log(existGoodieType);
  });
  it("4 - test case to create goodie type without body", async () => {
    const response = await request(app)
      .post("/create-goodie-type")
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(500);
  });
  it("5 - test case to get goodie type", async () => {
    const response = await request(app)
      .get(`/get-goodie-type/${existGoodieType.id}`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });
  it("6 - test case to get goodie type with unknown name", async () => {
    const response = await request(app)
      .get(`/get-goodie-type/${unknownId}`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(404);
  });
  it("7 - test case to get goodie type with invalid request", async () => {
    const response = await request(app)
      .get(`/get-goodie-type/-`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(500);
  });
  it("8 - test case to get all goodie types", async () => {
    const response = await request(app)
      .get("/get-all-types")
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });
  it("9 - test case to delete goodie type", async () => {
    const response = await request(app)
      .delete(`/delete-goodie-type/${existGoodieType.id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("10 - test case to delete unknown goodie type", async () => {
    const response = await request(app)
      .delete(`/delete-goodie-type/${unknownId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(404);
  });
  it("11 - test case to delete goodie type with invalid id", async () => {
    const response = await request(app)
      .delete(`/delete-goodie-type/-`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(500);
  });
  it("12 - test case to recreate goodie type", async () => {
    const response = await request(app)
      .post("/create-goodie-type")
      .send(newGoodieType)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
  });
});
