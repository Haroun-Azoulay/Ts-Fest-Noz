import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import groupRoutes from "../../src/routes/groupRoutes";
import groupUserRoutes from "../../src/routes/groupUserRoutes";
import Group from "../../src/models/Group";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(groupRoutes);
app.use(groupUserRoutes);

let tokenUser: string | undefined;
let tokenAdmin: string | undefined;

let existUser = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "user",
});
let existArtist = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "artist",
});
let existGroup = {
  id: "",
  name: "group-test",
};
const userLogin = {
  pseudo: "bechari",
  password: "test",
};
const artistLogin = {
  pseudo: "artist",
  password: "artist",
};
const adminLogin = {
  pseudo: "admin",
  password: "admin",
};

describe("Test case for group routes", () => {
  it("1 - test case to signin user", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
    existUser = response.body.user;
  });
  it("2 - test case to signin artist", async () => {
    const response = await request(app).post("/signin").send(artistLogin);
    expect(response.status).toBe(200);
    existArtist = response.body.user;
  });
  it("3 - test case to signin admin", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });
  it("4 - test case to get all groups", async () => {
    const response = await request(app)
      .get(`/get-all-groups`)
      .set("Authorization", `Bearer ${tokenUser}`);
    existGroup = response.body.filter(
      (group: Group) => group.name === existGroup.name,
    )[0];
    expect(response.status).toBe(200);
  });
  it("5 - test case to add artist user in group", async () => {
    const response = await request(app)
      .post(`/groups/${existGroup.id}/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
  });
  it("6 - test case to add user in group", async () => {
    const response = await request(app)
      .post(`/groups/${existGroup.id}/users`)
      .send({ userId: existUser.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(401);
  });
  it("7 - test case to add user in group", async () => {
    const response = await request(app)
      .post(`/groups/-/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(500);
  });
  it("8 - test case to delete artist user from a group", async () => {
    const response = await request(app)
      .delete(`/groups/${existGroup.id}/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("9 - test case to delete non-existing user from a group", async () => {
    const response = await request(app)
      .delete(`/groups/${existGroup.id}/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(404);
  });
  it("10 - test case to delete user from a group without id", async () => {
    const response = await request(app)
      .delete(`/groups/-/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(500);
  });
  it("11 - test case to read artist user in group", async () => {
    const response = await request(app)
      .post(`/groups/${existGroup.id}/users`)
      .send({ userId: existArtist.id })
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
  });
});
