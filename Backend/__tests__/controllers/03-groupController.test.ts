import User from "../../src/models/User";
import Group from "../../src/models/Group";
import groupController from "../../src/controllers/groupController";
import userController from "../../src/controllers/userController";
import httpMocks from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import verifyToken from "../../src/middlewares/verifyToken";
import verifyTokenAdmin from "../../src/middlewares/verifyTokenAdmin";
const bcrypt = require("bcrypt");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/verifyTokenAdmin");
jest.mock("../../src/models/Group");
jest.mock("../../src/models/User");
jest.mock("bcrypt");

let tokenUser: string;
let tokenAdmin: string;

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
  latitude: 1,
});
const goodLogin = {
  password: "test",
  pseudo: "bechari",
};
const goodLoginAdmin = {
  password: "admin",
  pseudo: "admin",
};
const newGroup = {
  name: "group-test",
};
const existGroup = new Group({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb53ccb",
  name: "group-test",
});

describe("Test case for group controller", () => {
  describe("1 - signin", () => {
    it("1 - should signin and return 200", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(existUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: "POST",
        body: goodLogin,
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await userController.signin(req, res);
      tokenUser = (res.json as jest.Mock).mock.calls[0][0].token;
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should signin admin and return 200", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(existUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: "POST",
        body: goodLoginAdmin,
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await userController.signin(req, res);
      tokenAdmin = (res.json as jest.Mock).mock.calls[0][0].token;
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("2 - createGroup", () => {
    it("1 - should create group and return 201", async () => {
      (verifyTokenAdmin as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newGroup,
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.createGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should return 409 if group already exists", async () => {
      jest.spyOn(Group, "findOne").mockResolvedValue(existGroup);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newGroup,
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.createGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
    });
    it("3 - should return 500 if bad request", async () => {
      jest.spyOn(Group, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newGroup,
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.createGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("3 - deleteGroup", () => {
    it("1 - should delete group and return 200", async () => {
      (verifyTokenAdmin as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockResolvedValue(existGroup);
      const req = httpMocks.createRequest({
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.deleteGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 404 if group not found", async () => {
      (verifyTokenAdmin as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.deleteGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if invalid request", async () => {
      (verifyTokenAdmin as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokenAdmin}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.deleteGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("4 - getGroup", () => {
    it("1 - should get group details and return 200", async () => {
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockResolvedValue(existGroup);
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.getGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 404 if group not found", async () => {
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.getGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if invalid request", async () => {
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.getGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("5 - getAllGroups", () => {
    it("1 - should get all groups and return 200", async () => {
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.getAllGroups(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 500 if invalid request", async () => {
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      jest.spyOn(Group, "findAll").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await groupController.getAllGroups(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
