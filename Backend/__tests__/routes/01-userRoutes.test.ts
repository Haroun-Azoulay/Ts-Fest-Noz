import userRoutes from "../../src/routes/userRoutes";
import request from "supertest";
import express from "express";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);

const newAdmin = {
  lastname: "admin",
  firstname: "admin",
  email: "admin@example.com",
  password: "admin",
  pseudo: "admin"
};

const newUser = {
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: "test",
  pseudo: "bechari"
};

const currentUser = {
  pseudo: "bechari",
  password: "test"
};

const adminUser = {
  pseudo: "admin",
  password: "admin"
};

var token = "";
var tokenAdmin = "";

describe("Test case for user routes", () => {
  it("1 - test case for signup user", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("2 - test case for signup admin user", async () => {
    const response = await request(app).post("/signup").send(newAdmin);
    expect(response.status).toBe(201);
  });

  it("3 - test case to log the user with admin credentials", async () => {
    const response = await request(app).post("/signin").send(adminUser);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("4 - test case to delete an user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${newUser.pseudo}`).set("Authorization", `Bearer ${tokenAdmin}`);;
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("5 - test case to log the user with wrong credentials", async () => {
    const response = await request(app).post("/signin").send(currentUser);
    expect(response.status).toBe(401);
  });

  it("6 - test case for signup user once again", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("7 - test case to log the user with right credentials", async () => {
    const response = await request(app).post("/signin").send(currentUser);
    expect(response.status).toBe(200);
    token = response.body.token;
  });

  it("8 - test case to get current user info", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("9 - test case to get all users", async () => {
    const response = await request(app).get("/get-all-users").set("Authorization", `Bearer ${token}`);;
    expect(response.status).toBe(200);
    const userExists = response.body.some(
      (user: User) =>
        user.pseudo === currentUser.pseudo
    );
    expect(userExists).toBe(true);
  });
});
