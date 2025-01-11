import userRoutes from "../../src/routes/userRoutes";
import request from "supertest";
import express from "express";

const app = express();
app.use(userRoutes);

const user = {
  id: "a93756cc-afe0-4b8d-9f7b-37fb8f8c7ffa",
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  pseudo: "bechari",
  role: "user",
};

const id = 5;
const updateUserInfo = { id: 5, name: "user5" };

describe("Test case for postgresql crud  user.", () => {
  it("Test case for signup users.", async () => {
    const response = await request(app).get("/signup");
    expect(response.status).toBe(200);
  });

  //     it("test case for creating a user", async () => {
  //       const createUser = await request(app).post("/createUser").send(user);
  //       console.log("response after creating user", createUser);
  //       expect(createUser.status).toBe(200);
  //       expect(createUser.body.isDeleted).toBeFalsy();
  //     });

  //     it("test case to update the user", async () => {
  //       const updateUser = await request(app).put("/updateUser").send(updateUserInfo);
  //       expect(updateUser.status).toBe(200);
  //       expect(updateUser.body.name).toBe(updateUser.name);
  //     });

  //     it("test case for deleting the user", async () => {
  //       const deleteUser = await request(app).delete("/deleteUser").send({ id });
  //       expect(deleteUser.status).toBe(204);
  //     });
});
