import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import cityRoutes from "../../src/routes/cityRoutes";
import User from "../../src/models/User";
import City from "../../src/models/City";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(cityRoutes);

let tokenUser : string | undefined;
let tokenOrganizer : string | undefined;
let tokenAdmin : string | undefined;

let existUser = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "user"
});
let existOrganizer = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "artist"
});
let existPoint = new City({
  id: "",
  userId: "",
  longitude: 1,
  latitude: 1,
  date: new Date(),
  text: "",
  address: "",
  city_name: "",
  zip_code: 94200,
  label: "",
  color: "",
  departement_number: 94,
  style: "",
  region_name: "",
  url_point: ""
});
const newPoint = {
  longitude: 1,
  latitude: 1,
  date: new Date(),
  text: "test",
  address: "7 Rue Maurice Grandcoing",
  city_name: "Ivry-sur-Seine",
  zip_code: 94200,
  label: "Jazz",
  color: "#5bce6e",
  departement_number: 94,
  style: "green",
  region_name: "Île-de-France",
  url_point: ""
}
const newInvalidPoint = {
  longitude: null,
  latitude: null,
  date: new Date(),
  text: "test",
  address: "7 Rue Maurice Grandcoing",
  city_name: "Ivry-sur-Seine",
  zip_code: 94200,
  label: "Jazz",
  color: "#5bce6e",
  departement_number: 94,
  style: "green",
  region_name: "Île-de-France",
  url_point: ""
}
const userLogin = {
  pseudo: "bechari",
  password: "test"
};
const organizerLogin = {
  pseudo: "organizer",
  password: "organizer"
};
const adminLogin = {
  pseudo: "admin",
  password: "admin"
};
describe("Test case for group routes", () => {
  it("1 - test case to signin user", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });
  it("2 - test case to signin organizer", async () => {
    const response = await request(app).post("/signin").send(organizerLogin);
    expect(response.status).toBe(200);
    tokenOrganizer = response.body.token;
    existOrganizer = response.body.user;
  });
  it("3 - test case to signin admin", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });
  it("4 - test case to send organizer token to add point", async () => {
    const response = await request(app).post("/add-point")
    .send(newPoint)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(201);
    existPoint = response.body;
  });
  it("5 - test case to send user token to add point", async () => {
    const response = await request(app).post("/add-point")
    .send(newPoint)
    .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(403);
  });
  it("6 - test case to add invalid point", async () => {
    const response = await request(app).post("/add-point")
    .send(newInvalidPoint)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(500);
  });
  it("7 - test case to get all points", async () => {
    const response = await request(app).get("/get-all-points")
    .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });
  it("8 - test case to get points by user", async () => {
    const response = await request(app).get(`/get-point/${existOrganizer.id}`)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(200);
  });
  it("9 - test case to get points by user without id", async () => {
    const response = await request(app).get(`/get-point/${undefined}`)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(500);
  });
  it("10 - test case to delete organizer point", async () => {
    const response = await request(app).delete(`/delete-point/${existPoint.id}`)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(200);
  });
  it("11 - test case to delete organizer point with wrong id", async () => {
    const response = await request(app).delete(`/delete-point/99999b99-80e5-4834-8769-58f764015fb2`)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(404);
  });
  it("12 - test case to delete organizer point with wrong id", async () => {
    const response = await request(app).delete(`/delete-point/-`)
    .set("Authorization", `Bearer ${tokenOrganizer}`);
    expect(response.status).toBe(500);
  });
});
