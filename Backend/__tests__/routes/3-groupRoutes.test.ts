import request from "supertest";
import express from "express";
import userRoutes from "../../src/routes/userRoutes";
import groupRoutes from "../../src/routes/groupRoutes";
import Group from "../../src/models/Group";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(groupRoutes);

let tokenUser: string | undefined;
let tokenAdmin: string | undefined;

const userLogin = {
  pseudo: "bechari",
  password: "test",
};
const adminLogin = {
  pseudo: "admin",
  password: "admin",
};
const newGroup = {
  name: "group-test",
};
let existGroup = {
  id: undefined,
  name: "",
};

describe("Test case for group routes", () => {
  it("1 - test case to signin user", async () => {
    const response = await request(app).post("/signin").send(userLogin);
    expect(response.status).toBe(200);
    tokenUser = response.body.token;
  });

  it("2 - test case to signin admin user", async () => {
    const response = await request(app).post("/signin").send(adminLogin);
    expect(response.status).toBe(200);
    tokenAdmin = response.body.token;
  });

  it("3 - test case to create a group", async () => {
    const response = await request(app)
      .post("/create-group")
      .send(newGroup)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
    existGroup = response.body.newGroup;
  });

  it("4 - test case to create a group already exists", async () => {
    const response = await request(app)
      .post("/create-group")
      .send(newGroup)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(409);
  });

  it("5 - test case to get group", async () => {
    const response = await request(app)
      .get(`/get-group/${existGroup.id}`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
  });

  it("6 - test case to get non-existing group", async () => {
    const response = await request(app)
      .get(`/get-group/`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(404);
  });

  it("7 - test case to get all groups", async () => {
    const response = await request(app)
      .get(`/get-all-groups`)
      .set("Authorization", `Bearer ${tokenUser}`);
    expect(response.status).toBe(200);
    const groupExist = response.body.some(
      (group: Group) => group.name === existGroup.name,
    );
    expect(groupExist).toBe(true);
  });

  it("8 - test case to delete a group", async () => {
    const response = await request(app)
      .delete(`/delete-group/${existGroup.id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(200);
  });

  it("9 - test case to delete a non-existing group", async () => {
    const response = await request(app)
      .delete(`/delete-group/${existGroup.id}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(404);
  });

  it("10 - test case to create a group once again", async () => {
    const response = await request(app)
      .post("/create-group")
      .send(newGroup)
      .set("Authorization", `Bearer ${tokenAdmin}`);
    expect(response.status).toBe(201);
    existGroup = response.body.newGroup;
  });
});
