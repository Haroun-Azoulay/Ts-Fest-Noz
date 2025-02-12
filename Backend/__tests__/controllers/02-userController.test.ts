import userController from "../../src/controllers/userController";
import User from "../../src/models/User";
import { UserRequest } from "../../src/interfaces/types";
import httpMocks from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import verifyToken from "../../src/middlewares/verifyToken";
import verifyTokenAdmin from "../../src/middlewares/verifyTokenAdmin";
const bcrypt = require("bcrypt");

jest.mock("../../src/models/User");
jest.mock("bcrypt");

let tokenUser: string;
let tokenAdmin: string;

const newAdmin: UserRequest = {
  lastname: "admin",
  firstname: "admin",
  email: "admin@example.com",
  password: "admin",
  pseudo: "admin",
  city: "Paris",
  longitude: 1,
  latitude: 1
};
const newUser: UserRequest = {
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: "test",
  pseudo: "bechari",
  city: "Paris",
  longitude: 1,
  latitude: 1
};
const newInvalidUser: UserRequest = {
    lastname: "Dey",
    firstname: "Haroun-Rachid",
    email: "haroun@ooredoo.dz",
    password: "test \
    qsdisqdj \
    qsofhqiodgeq \
    qsfkoqsjfoq \
    qsfjqgj",
    pseudo: "bechari \
    qsfokjqgpoqg \
    qsfoigeq \
    qgjoiejoperjorzjo",
    city: "Paris",
    longitude: 1,
    latitude: 1
};
const wrongUser = {
  lastname: "test",
  firstname: "test",
  password: "test",
  pseudo: "test",
};
const existUser = new User({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccb",
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: bcrypt.hash("test", 10),
  pseudo: "bechari",
  city: "Paris",
  role: "user",
  longitude: 1,
  latitude: 1
});
const unknownUser = new User({
  id: "6cbfa5dc-7999-4fb1-a443-33894fb52ccb",
  lastname: "unknown",
  firstname: "unknown",
  email: "unknown@example.com",
  password: bcrypt.hash("unknown", 10),
  pseudo: "unknown",
  city: "Paris",
  role: "user",
  longitude: 1,
  latitude: 1
});
const existAdmin = new User({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  lastname: "admin",
  firstname: "admin",
  email: "admin@example.com",
  password: "admin",
  pseudo: "admin",
  city: "Paris",
  role: "admin",
  longitude: 1,
  latitude: 1
});
const updatedUser = new User({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccb",
  lastname: "Dey",
  firstname: "Haroun-Rachid",
  email: "haroun@ooredoo.dz",
  password: bcrypt.hash("test", 10),
  pseudo: "bechari",
  city: "Paris",
  role: "artist",
  longitude: 1,
  latitude: 1
});
const goodLogin = {
  password: "test",
  pseudo: "bechari",
};
const goodLoginAdmin = {
  password: "admin",
  pseudo: "admin",
};
const wrongLogin = {
  password: "test2",
  pseudo: "bechari",
};
const uncompletedLogin = {
  pseudo: "bechari\'",
};
const badLogin = {
  password: "test%--\'",
  pseudo:
    "hpsdkgqpzojpoajhqpokvpokgkgqdkgeohkqdkpsl \
    hpsdkgqpzojpoajhqpokvpokgkgqdkgeohkqdkpsl \
    hpsdkgqpzojpoajhqpokvpokgkgqdkgeohkqdkpsl \
    hpsdkgqpzojpoajhqpokvpokgkgqdkgeohkqdkpsl \
    hpsdkgqpzojpoajhqpokvpokgkgqdkgeohkqdkpsl",
};

describe("Test case for user controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("1 - signup", () => {
    it("1 - should create user and return 201", async () => {
      jest.spyOn(User, "create").mockResolvedValue(existUser);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newUser,
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await userController.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should create admin and return 201", async () => {
      jest.spyOn(User, "create").mockResolvedValue(existAdmin);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newAdmin,
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await userController.signup(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("3 - should return 400 if missing fields", async () => {
        jest.spyOn(User, "create").mockResolvedValue(null);
        const req = httpMocks.createRequest({
            method: "POST",
            body: wrongUser,
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        await userController.signup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it("4 - should return 500 if invalid data", async () => {
        jest.spyOn(User, "create").mockRejectedValue(null);
        const req = httpMocks.createRequest({
            method: "POST",
            body: newInvalidUser,
        });
        const res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        await userController.signup(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
  });
    describe("2 - signin", () => {
      it("1 - should signin and return 200", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
          bcrypt.compare = jest.fn().mockResolvedValue(true);
          const req = httpMocks.createRequest({
              method: 'POST',
              body: goodLogin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          tokenUser = (res.json as jest.Mock).mock.calls[0][0].token;
          expect(res.status).toHaveBeenCalledWith(200);
      });
      it("2 - should signin admin and return 200", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(existAdmin);
          bcrypt.compare = jest.fn().mockResolvedValue(true);
          const req = httpMocks.createRequest({
              method: 'POST',
              body: goodLoginAdmin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          tokenAdmin = (res.json as jest.Mock).mock.calls[0][0].token;
          expect(res.status).toHaveBeenCalledWith(200);
      });
      it("3 - should return 400 if invalid request", async () => {
          const req = httpMocks.createRequest({
              method: 'POST',
              body: uncompletedLogin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          expect(res.status).toHaveBeenCalledWith(400);
      });
      it("4 - should return 401 if wrong login", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(null);
          bcrypt.compare = jest.fn().mockResolvedValue(false);
          const req = httpMocks.createRequest({
              method: 'POST',
              body: wrongLogin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("5 - should return 401 if wrong login", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
          bcrypt.compare = jest.fn().mockResolvedValue(false);
          const req = httpMocks.createRequest({
              method: 'POST',
              body: wrongLogin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("6 - should return 500 if error occured", async () => {
          jest.spyOn(User, 'findOne').mockRejectedValue(null);
          const req = httpMocks.createRequest({
              method: 'POST',
              body: badLogin
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          await userController.signin(req, res);
          expect(res.status).toHaveBeenCalledWith(500);
      });
  });
  describe("3 - getAllUsers", () => {
      it("1 - should get all users and return 200", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer ${tokenUser}` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyToken(req, res, next);
          await userController.getAllUsers(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
      });
      it("2 - should return 401 if invalid user token", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer qgjpoqhjoprhjpqokg` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyToken(req, res, next);
          await userController.getAllUsers(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("3 - should return 401 if user token missing", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer ` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyToken(req, res, next);
          await userController.getAllUsers(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("4 - should return 401 if header missing", async () => {
          const req = httpMocks.createRequest({
              method: 'GET'
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyToken(req, res, next);
          await userController.getAllUsers(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
  });
  describe("4 - deleteUser", () => {
      it("1 - should delete user and return 200", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
          const req = httpMocks.createRequest({
              method: 'DELETE',
              headers: { Authorization: `Bearer ${tokenAdmin}` },
              params: { userId: existUser.id }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
      });
      it("2 - should return 401 if user doesn't exist", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(null);
          const req = httpMocks.createRequest({
              method: 'DELETE',
              headers: { Authorization: `Bearer ${tokenAdmin}` },
              params: { id: unknownUser.id}
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("3 - should return 500 if user is linked to other tables data", async () => {
          jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
          jest.spyOn(existUser, 'destroy').mockRejectedValue(new Error("Unable to delete user."));
          const req = httpMocks.createRequest({
              method: 'DELETE',
              headers: { Authorization: `Bearer ${tokenAdmin}` },
              params: { id: existUser.id }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(500);
      });
      it("4 - should return 401 if invalid token admin", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer qgjpoqhjoprhjpqokg` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("5 - should return 401 if token missing admin", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer ` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(401);
      });
      it("6 - should return 403 if user not admin", async () => {
          const req = httpMocks.createRequest({
              method: 'GET',
              headers: { Authorization: `Bearer ${tokenUser}` }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.deleteUser(req, res);
          expect(res.status).toHaveBeenCalledWith(403);
      });
  });
  describe("5 - updateUserRole", () => {
      it("1 - should update user and return 200", async () => {
          jest.spyOn(User, 'findByPk').mockResolvedValue(existUser);
          jest.spyOn(existUser, 'update').mockResolvedValue(updatedUser);
          const req = httpMocks.createRequest({
              method: 'PUT',
              params: { userId: existUser.id },
              body: { newRole: "artist" }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.updateUserRole(req, res);
          expect(res.status).toHaveBeenCalledWith(200);
      });
      it("2 - should return 500 if user not found", async () => {
          jest.spyOn(User, 'findByPk').mockResolvedValue(null);
          jest.spyOn(existUser, 'update').mockResolvedValue(updatedUser);
          const req = httpMocks.createRequest({
              method: 'PUT',
              params: { userId: existUser.id },
              body: { newRole: "artist" }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.updateUserRole(req, res);
          expect(res.status).toHaveBeenCalledWith(500);
      });
      it("3 - should return 400 if invalid request", async () => {
          const req = httpMocks.createRequest({
              method: 'PUT',
              params: { userId: existUser.id }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.updateUserRole(req, res);
          expect(res.status).toHaveBeenCalledWith(400);
      });
      it("4 - should return 403 if attempt for admin role", async () => {
          jest.spyOn(User, 'findByPk').mockResolvedValue(existUser);
          jest.spyOn(existUser, 'update').mockResolvedValue(updatedUser);
          const req = httpMocks.createRequest({
              method: 'PUT',
              params: { userId: existUser.id },
              body: { newRole: "admin" }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.updateUserRole(req, res);
          expect(res.status).toHaveBeenCalledWith(403);
      });
      it("5 - should return 500 if something went wrong", async () => {
          jest.spyOn(User, 'findByPk').mockRejectedValue(null);
          const req = httpMocks.createRequest({
              method: 'PUT',
              body: { newRole: "artist" }
          });
          const res = httpMocks.createResponse();
          res.status = jest.fn().mockReturnThis();
          res.json = jest.fn();
          const next = jest.fn() as unknown as NextFunction;
          verifyTokenAdmin(req, res, next);
          await userController.updateUserRole(req, res);
          expect(res.status).toHaveBeenCalledWith(500);
      });
  });
});
