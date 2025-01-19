import userRoutes from "../../src/routes/userRoutes";
import request from "supertest";
import express from "express";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);

let tokenUser : string | undefined;
let tokenAdmin : string | undefined;

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

const newArtist = {
  lastname: "artist",
  firstname: "artist",
  email: "artist@example.com",
  password: "artist",
  pseudo: "artist"
};

const newOrganizer = {
  lastname: "organizer",
  firstname: "organizer",
  email: "organizer@example.com",
  password: "organizer",
  pseudo: "organizer"
};

const userLogin = {
  pseudo: "bechari",
  password: "test"
};

const adminLogin = {
  pseudo: "admin",
  password: "admin"
};

describe("Test case for user routes", () => {
  it("1 - test case to signup user", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("2 - test case to signup artist", async () => {
    const response = await request(app).post("/signup").send(newArtist);
    expect(response.status).toBe(201);
  });

  it("3 - test case to signup organizer", async () => {
    const response = await request(app).post("/signup").send(newOrganizer);
    expect(response.status).toBe(201);
  });

  it("4 - test case to signup admin user", async () => {
    const response = await request(app).post("/signup").send(newAdmin);
    expect(response.status).toBe(201);
  });

  it("5 - test case to log the user with admin credentials", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("6 - test case to delete an user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${newUser.pseudo}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });

  it("7 - test case to log the user with wrong credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(401);
  });

  it("8 - test case to signup user once again", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("9 - test case to log the user with right credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });

  it("10 - test case to get current user info", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });

  it("11 - test case to get all users", async () => {
    const response = await request(app).get("/get-all-users").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    const userExist = response.body.some(
      (user: User) =>
        user.pseudo === userLogin.pseudo
    );
    expect(userExist).toBe(true);
  });
});