import userRoutes from "../../src/routes/userRoutes";
import groupRoutes from "../../src/routes/groupRoutes";
import groupUserRoutes from "../../src/routes/groupUserRoutes";
import request from "supertest";
import express from "express";
import Group from "../../src/models/Group";
import GroupUser from "../../src/models/GroupUser";
import User from "../../src/models/User";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(groupRoutes);
app.use(groupUserRoutes);

let tokenUser : string | undefined;
let tokenAdmin : string | undefined;

let user = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  role: "user"
});
let artist = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  role: "artist"
});
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
let existGroup = {
  id: undefined,
  name: "group-test"
}

describe("Test case for group routes", () => {
  it("1 - test case to signin user", async () => {
      const response = await request(app).post("/signin").send(userLogin);
      expect(response.status).toBe(200);
      tokenUser = response.body.token;
      user = response.body.user;
  });
  it("2 - test case to signin artist", async () => {
    const response = await request(app).post("/signin").send(artistLogin);
    expect(response.status).toBe(200);
    artist = response.body.user;
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
      (group: Group) =>
        group.name === existGroup.name
    );
    expect(response.status).toBe(200);
  });
  it("5 - test case to add user in group", async () => {
    console.log(existGroup);
    console.log(user);
    const response = await request(app)
    .post(`/groups/${existGroup.id}/users`)
    .send({userId: artist.id})
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
});
