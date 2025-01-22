import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import adminRoutes from "../../src/routes/adminRoutes";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(adminRoutes);

let tokenUser: string | undefined;
let tokenAdmin: string | undefined;

const newAdmin = {
  lastname: "admin",
  firstname: "admin",
  email: "admin@example.com",
  password: "admin",
  pseudo: "admin",
  city: "Paris",
};
const newInvalidUser = {
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
};
const newUser = {
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: "test",
  pseudo: "bechari",
  city: "Paris",
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
  city: "Paris",
};
const userLogin = {
  pseudo: "bechari",
  password: "test",
};
const uncompletedLogin = {
  pseudo: "bechari\'"
};
const wrongLogin = {
  password: "test2",
  pseudo: "bechari"
};
const artistLogin = {
  pseudo: "artist",
  password: "artist",
};
const organizerLogin = {
  pseudo: "organizer",
  password: "organizer"
};
const adminLogin = {
  pseudo: "admin",
  password: "admin",
};
let existUser = new User({
  id: "",
  lastname: "",
  firstname: "",
  email: "",
  pseudo: "",
  password: "",
  city: "",
  role: "user"
});
let existArtist = new User({
  id: "",
  lastname: "",
  firstname: "",
  email: "",
  pseudo: "",
  password: "",
  city: "",
  role: "artist",
});
let existOrganizer = new User({
  id: "",
  lastname: "",
  firstname: "",
  email: "",
  pseudo: "",
  password: "",
  city: "",
  role: "organizer"
});
const roleRequestArtist = {
  newRole: "artist"
}
const roleRequestOrganizer = {
  newRole: "organizer"
}
const roleRequestAdmin = {
  newRole: "admin"
}
const unknownId : string = "5cbfa5dc-7999-4fb1-a443-33894fb52ccb";

describe("Test case for user routes", () => {
  it("1 - test case to signup user", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("2 - test case to signup artist", async () => {
    const response = await request(app).post("/signup").send(newArtist);
    expect(response.status).toBe(201);
  });

  it("3 - test case to signup organizer user", async () => {
    const response = await request(app).post("/signup").send(newOrganizer);
    expect(response.status).toBe(201);
  });

  it("4 - test case to signup admin user", async () => {
    const response = await request(app).post("/signup").send(newAdmin);
    expect(response.status).toBe(201);
  });

  it("5 - test case to signup with missing properties", async () => {
    const response = await request(app).post("/signup").send(newInvalidUser);
    expect(response.status).toBe(400);
  });

  it("6 - test case to log the user with user credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    existUser = response.body.user;
  });

  it("7 - test case to log the user with artist credentials", async () => {
    const response = await request(app).post("/signin").send(artistLogin);
    expect(response.status).toBe(200);
    existArtist = response.body.user;
  });

  it("8 - test case to log the user with organizer credentials", async () => {
    const response = await request(app).post("/signin").send(organizerLogin);
    expect(response.status).toBe(200);
    existOrganizer = response.body.user;
  });

  it("9 - test case to log the user with admin credentials", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("10 - test case to log a user with missing properties", async () => {
    const response = await request(app).post("/signin").send(uncompletedLogin);
    expect(response.status).toBe(400);
  });

  it("11 - test case to log a user with wrong password", async () => {
    const response = await request(app).post("/signin").send(wrongLogin);
    expect(response.status).toBe(401);
  });

  it("12 - test case to delete an user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existUser.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });

  it("13 - test case to delete an non-existing user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existUser.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(401);
  });

  it("14 - test case to delete an user without id as admin", async () => {
    const response = await request(app)
    .delete(`/delete-user/sdzrfskgjzijcqsfkogdjporjqogjriketjpore`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(500);
  });

  it("15 - test case to log the user with wrong credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(401);
  });

  it("16 - test case to signup user once again", async () => {
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(201);
  });

  it("17 - test case to log the user with right credentials", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });

  it("18 - test case to get current user info", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });

  it("19 - test case to send request without user token", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer `);
    expect(response.status).toBe(401);
  });

  it("20 - test case to send request without user authorization bearer", async () => {
    const response = await request(app).get("/my-user");
    expect(response.status).toBe(401);
  });

  it("21 - test case to send request with invalid user token", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer rrzopzropjezpogjjoprzop`);
    expect(response.status).toBe(401);
  });

  it("22 - test case to get all users", async () => {
    const response = await request(app).get("/get-all-users").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    const userExist = response.body.some(
      (user: User) => user.pseudo === userLogin.pseudo,
    );
    expect(userExist).toBe(true);
  });

  it("23 - test case to update artist user role", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send(roleRequestArtist);
    expect(response.status).toBe(200);
  });

  it("24 - test case to send request without admin token", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .set("Authorization", `Bearer `)
    .send(roleRequestArtist);
    expect(response.status).toBe(401);
  });

  it("25 - test case to send request without admin authorization bearer", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .send(roleRequestArtist);
    expect(response.status).toBe(401);
  });

  it("26 - test case to send request with invalid admin token", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .set("Authorization", `Bearer goijzrijzrp`)
    .send(roleRequestArtist);
    expect(response.status).toBe(401);
  });

  it("27 - test case to send request with user token to update role", async () => {
    const response = await request(app)
    .put(`/update-role/${existArtist.id}`)
    .set("Authorization", `Bearer ${tokenUser}`)
    .send(roleRequestArtist);
    expect(response.status).toBe(403);
  });

  it("28 - test case to update organizer user role", async () => {
    const response = await request(app)
    .put(`/update-role/${existOrganizer.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send(roleRequestOrganizer);
    expect(response.status).toBe(200);
  });

  it("29 - test case to update organizer user role without body", async () => {
    const response = await request(app)
    .put(`/update-role/${existOrganizer.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    expect(response.status).toBe(400);
  });

  it("30 - test case to update organizer user role to admin", async () => {
    const response = await request(app)
    .put(`/update-role/${existOrganizer.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send(roleRequestAdmin)
    expect(response.status).toBe(403);
  });

  it("31 - test case to update organizer user role with unknown id", async () => {
    const response = await request(app)
    .put(`/update-role/${unknownId}`)
    .set("Authorization", `Bearer ${tokenAdmin}`)
    .send(roleRequestOrganizer)
    expect(response.status).toBe(500);
  });
});
