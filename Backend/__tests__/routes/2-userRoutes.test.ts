import userRoutes from "../../src/routes/userRoutes";
import adminRoutes from "../../src/routes/adminRoutes";
import request from "supertest";
import express from "express";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(adminRoutes);

let tokenUser : string | undefined;
let tokenAdmin : string | undefined;

const newAdmin = {
  lastname: "admin",
  firstname: "admin",
  email: "admin@example.com",
  password: "admin",
  pseudo: "admin",
  city: "Paris"
};
const newUser = {
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: "test",
  pseudo: "bechari",
  city: "Paris"
};
const newArtist = {
  lastname: "artist",
  firstname: "artist",
  email: "artist@example.com",
  password: "artist",
  pseudo: "artist",
  city: "Paris",
};
const newOrganizer = {
  lastname: "organizer",
  firstname: "organizer",
  email: "organizer@example.com",
  password: "organizer",
  pseudo: "organizer",
  city: "Paris"
};
const userLogin = {
  pseudo: "bechari",
  password: "test"
};
const artistLogin = {
  pseudo: "artist",
  password: "artist"
};
const adminLogin = {
  pseudo: "admin",
  password: "admin"
};
let existArtist = new User({
  id: "",
  lastname: "",
  firstname: "",
  email: "",
  pseudo: "",
  password: "",
  city: "",
  role: "artist"
});
const roleRequest = {
  newRole: "artist"
}

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

  it("5 - test case to log the user with artist credentials", async () => {
    const response = await request(app).post("/signin").send(artistLogin);
    expect(response.status).toBe(200);
    existArtist = response.body.user;
    console.log(existArtist)
  });

  it("6 - test case to log the user with admin credentials", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("7 - test case to delete an user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${newUser.pseudo}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });

  it("8 - test case to log the user with wrong credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(401);
  });

  it("9 - test case to signup user once again", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("10 - test case to log the user with right credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });

  it("11 - test case to get current user info", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });

  it("12 - test case to get all users", async () => {
    const response = await request(app).get("/get-all-users").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    const userExist = response.body.some(
      (user: User) =>
        user.pseudo === userLogin.pseudo
    );
    expect(userExist).toBe(true);
  });

  it("13 - test case to update artist user role", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send(roleRequest);
    expect(response.status).toBe(200);
  });
});