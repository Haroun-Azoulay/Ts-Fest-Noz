import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import groupRoutes from "../../src/routes/groupRoutes";
import groupUserRoutes from "../../src/routes/groupUserRoutes";
import goodieTypeRoutes from "../../src/routes/goodieTypeRoutes";
import User from "../../src/models/User";
import Group from "../../src/models/Group";
import GoodieType from "../../src/models/GoodieType";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(groupRoutes);
app.use(groupUserRoutes);
app.use(goodieTypeRoutes);

let tokenUser : string | undefined;
let tokenAdmin : string | undefined;

let existUser = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "user",
  longitude: 1,
  latitude: 1
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
  longitude: 1,
  latitude: 1
});
let existOrganizer = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "organizer",
  longitude: 1,
  latitude: 1
});
let existAdmin = new User({
  id: "",
  lastname: "",
  firstname: "",
  pseudo: "",
  password: "",
  email: "",
  city: "",
  role: "admin",
  longitude: 1,
  latitude: 1
});
let existGroup = {
  id: "",
  name: "group-test"
}
let existGoodieType = {
  id: "",
  name: ""
}
const userLogin = {
  pseudo: "bechari",
  password: "test"
};
const artistLogin = {
  pseudo: "artist",
  password: "artist"
};
const organizerLogin = {
  pseudo: "organizer",
  password: "organizer"
};
const adminLogin = {
  pseudo: "admin",
  password: "admin"
};

describe("Test case for cleaning phase", () => {
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
  it("3 - test case to signin organizer", async () => {
    const response = await request(app).post("/signin").send(organizerLogin);
    expect(response.status).toBe(200);
    existOrganizer = response.body.user;
  });
  it("4 - test case to signin admin", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
    existAdmin = response.body.user;
  });
  it("5 - test case to get specific group among all", async () => {
    const response = await request(app).get(`/get-all-groups`).set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    existGroup = response.body.filter(
      (group: Group) =>
        group.name === existGroup.name
    )[0];
  });
  it("6 - test case to delete artist user from a group", async () => {
    const response = await request(app)
    .delete(`/groups/${existGroup.id}/users`)
    .send({userId: existArtist.id})
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("7 - test case to delete a group", async () => {
    const response = await request(app)
    .delete(`/delete-group/${existGroup.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("8 - test case to get specific goodie type among all", async () => {
    const response = await request(app).get(`/get-all-types`).set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    existGoodieType = response.body.filter(
      (goodieType: GoodieType) =>
        goodieType.name === "goodie_type_test"
    )[0];
  });
  it("9 - test case to delete existing goodie type", async () => {
    const response = await request(app)
    .delete(`/delete-goodie-type/${existGoodieType.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("10 - test case to delete an user as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existUser.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("11 - test case to delete an artist as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existArtist.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("12 - test case to delete an artist as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existOrganizer.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("13 - test case to delete an admin as admin", async () => {
    const response = await request(app).delete(`/delete-user/${existAdmin.id}`)
    .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });
  it("14 - test case to get current user info", async () => {
    const response = await request(app).get("/my-user").set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(404);
  });
});
