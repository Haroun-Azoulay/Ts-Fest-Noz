import User from "../../src/models/User";
import City from "../../src/models/City";
import cityController from "../../src/controllers/cityController";
import userController from "../../src/controllers/userController";
import httpMocks from "node-mocks-http";
const bcrypt = require("bcrypt");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/isAuthorizedPost");
jest.mock("../../src/models/City");
jest.mock("bcrypt");

let tokenOrganizer: string;

const existPoint = new City({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb55ccb",
  userId: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  longitude: 1,
  latitude: 1,
  date: new Date(),
  text: "test",
  address: "7 Rue Maurice Grandcoing",
  city_name: "Ivry-sur-Seine",
  zip_code: 94200,
  label: "Jazz",
  color: "#5bce6e",
  departement_number: 94,
  style: "green",
  region_name: "Île-de-France",
  url_point: "",
});
const newPoint = {
  longitude: 1,
  latitude: 1,
  date: new Date(),
  text: "test",
  address: "7 Rue Maurice Grandcoing",
  city_name: "Ivry-sur-Seine",
  zip_code: 94200,
  label: "Jazz",
  color: "#5bce6e",
  departement_number: 94,
  style: "green",
  region_name: "Île-de-France",
  url_point: "",
};
const existOrganizer = new User({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  lastname: "organizer",
  firstname: "organizer",
  email: "organizer@example.com",
  password: bcrypt.hash("organizer", 10),
  pseudo: "organizer",
  city: "Paris",
  role: "organizer",
});
const goodLoginOrganizer = {
  password: "organizer",
  pseudo: "organizer",
};

describe("Test case for city controller", () => {
  describe("1 - signin", () => {
    it("1 - should signin organizer and return 200", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(existOrganizer);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: "POST",
        body: goodLoginOrganizer,
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await userController.signin(req, res);
      tokenOrganizer = (res.json as jest.Mock).mock.calls[0][0].token;
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("2 - addPoint", () => {
    it("1 - should add point and return 201", async () => {
      jest.spyOn(City, "create").mockResolvedValue(existPoint);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newPoint,
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      const isAuthorizedPostMock = jest.fn((req, res, next) => {
        next();
      });
      verifyTokenMock(req, res, () => {});
      isAuthorizedPostMock(req, res, () => {});

      await cityController.addPoint(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should return 400", async () => {
      jest.spyOn(City, "create").mockResolvedValue(existPoint);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newPoint,
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        next();
      });
      const isAuthorizedPostMock = jest.fn((req, res, next) => {
        next();
      });
      verifyTokenMock(req, res, () => {});
      isAuthorizedPostMock(req, res, () => {});

      await cityController.addPoint(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("3 - should return 500 if invalid request", async () => {
      jest.spyOn(City, "create").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        body: newPoint,
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      const isAuthorizedPostMock = jest.fn((req, res, next) => {
        next();
      });
      verifyTokenMock(req, res, () => {});
      isAuthorizedPostMock(req, res, () => {});

      await cityController.addPoint(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("3 - getAllPoints", () => {
    it("1 - should send list of points and return 200", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await cityController.getAllPoints(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 500 if invalid request", async () => {
      jest.spyOn(City, "findAll").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await cityController.getAllPoints(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("4 - getPointByUser", () => {
    it("1 - should send user points and return 200", async () => {
      jest.spyOn(City, "findAll").mockResolvedValue([existPoint]);
      const req = httpMocks.createRequest({
        method: "GET",
        params: { userId: existOrganizer.id },
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});

      await cityController.getPointByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 400 if missing params", async () => {
      const req = httpMocks.createRequest({
        method: "GET",
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await cityController.getPointByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("3 - should return 500 if invalid request", async () => {
      jest.spyOn(City, "findAll").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "GET",
        params: { userId: existOrganizer.id },
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await cityController.getPointByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("5 - deletePoint", () => {
    it("1 - should delete point and return 200", async () => {
      jest.spyOn(City, "findOne").mockResolvedValue(existPoint);
      const req = httpMocks.createRequest({
        method: "DELETE",
        params: { pointId: existPoint.id },
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});

      await cityController.deletePoint(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 404 if point not found", async () => {
      jest.spyOn(City, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
        params: { pointId: existPoint.id },
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});

      await cityController.deletePoint(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if invalid request", async () => {
      jest.spyOn(City, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
        params: { pointId: existPoint.id },
        headers: { Authorization: `Bearer ${tokenOrganizer}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existOrganizer.id;
        req.role = existOrganizer.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await cityController.deletePoint(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
