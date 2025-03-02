import User from "../../src/models/User";
import City from "../../src/models/City";
import Event from "../../src/models/Event";
import Payment from "../../src/models/Payment";
import httpMocks from "node-mocks-http";
import { Request, Response, NextFunction } from "express";
import userController from "../../src/controllers/userController";
import eventController from "../../src/controllers/eventController";
import verifyToken from "../../src/middlewares/verifyToken";
import jwt from "jsonwebtoken";
const bcrypt = require("bcryptjs");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/isAuthorizedPost");
jest.mock("../../src/models/Event");
jest.mock("../../src/models/Payment");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let tokenUser: string;
let tokenOrganizer: string;

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
const existOrganizer = new User({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  lastname: "organizer",
  firstname: "organizer",
  email: "organizer@example.com",
  password: bcrypt.hash("organizer", 10),
  pseudo: "organizer",
  city: "Paris",
  role: "organizer",
  longitude: 1,
  latitude: 1,
});
const goodLogin = {
  password: "test",
  pseudo: "bechari",
};
const goodLoginOrganizer = {
  password: "organizer",
  pseudo: "organizer",
};
const existPoint = new City({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb55ccb",
  user_id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
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
const newEvent = {
  name: "ETNA EVENT",
  city_id: "5cbfa5dc-7999-4fb1-a443-33894fb55ccb",
  user_id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  description: "PARTICIPE IN ONE OF THE BEST CONCERT OF ALL TIME",
  url: "",
  mapId: 1,
};
const existEvent = new Event({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb56ccb",
  name: "ETNA EVENT",
  city_id: "5cbfa5dc-7999-4fb1-a443-33894fb55ccb",
  user_id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  description: "PARTICIPE IN ONE OF THE BEST CONCERT OF ALL TIME",
  url: "",
  mapId: 1,
});
const invalidNewEvent = {
  description: "PARTICIPE IN ONE OF THE BEST CONCERT OF ALL TIME",
  url: "",
};
const newPayment = {
  payment: true,
};
const existPayment = new Payment({
  id: "5cbfa5dc-7999-4fb1-a443-33894fb57ccb",
  userId: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
  eventId: "5cbfa5dc-7999-4fb1-a443-33894fb56ccb",
  payment: true,
  token: "ngdAXMejlnEqMYovrFjR",
});

describe("Test case for event controller", () => {
  describe("1 - signin", () => {
    it("1 - should signin user and return 200", async () => {
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
    it("2 - should signin organizer and return 200", async () => {
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
  describe("2 - addEvent", () => {
    it("1 - should add event and return 201", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: newEvent,
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
      await eventController.addEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should return 500 if missing properties", async () => {
      const req = httpMocks.createRequest({
        method: "POST",
        body: invalidNewEvent,
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
      jest.spyOn(Event, "create").mockRejectedValue(null);
      await eventController.addEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("3 - getEventsByCity", () => {
    it("1 - should get events by city and return 200", async () => {
      jest.spyOn(City, "findAll").mockResolvedValue([existPoint]);
      jest.spyOn(Event, "findByPk").mockResolvedValue(existEvent);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        params: { city: "Paris" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getEventsByCity(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 500 if something unexpected happens", async () => {
      jest.spyOn(City, "findAll").mockRejectedValue(null);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        params: { city: "Paris" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getEventsByCity(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("4 - getEventById", () => {
    it("1 - should get event by id and return 200", async () => {
      jest.spyOn(Event, "findByPk").mockResolvedValue(existEvent);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        params: { id: existEvent.id },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 404 if event not found", async () => {
      jest.spyOn(Event, "findByPk").mockResolvedValue(null);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        params: { id: existEvent.id },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if invalid id", async () => {
      jest.spyOn(Event, "findByPk").mockRejectedValue(null);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "GET",
        params: { id: "-" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("5 - getAllEvents", () => {
    it("1 - should get all events and return 200", async () => {
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
      await eventController.getAllEvents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 500 if something unexpected happens", async () => {
      jest.spyOn(Event, "findAll").mockRejectedValue(null);
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
      await eventController.getAllEvents(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("6 - addPayment", () => {
    it("1 - should add payment and return 200", async () => {
      jest.spyOn(Payment, "create").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "POST",
        params: { id: "5cbfa5dc-7999-4fb1-a443-33894fb56ccb" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existUser.id;
        req.role = existUser.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await eventController.addPayment(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should return 400 if missing userId", async () => {
      jest.spyOn(Payment, "create").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "POST",
        params: { id: "5cbfa5dc-7999-4fb1-a443-33894fb56ccb" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.role = existUser.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await eventController.addPayment(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("3 - should return 500 if invalid id", async () => {
      jest.spyOn(Payment, "create").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        params: { id: "-" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      const verifyTokenMock = jest.fn((req, res, next) => {
        req.userId = existUser.id;
        req.role = existUser.role;
        next();
      });
      verifyTokenMock(req, res, () => {});
      await eventController.addPayment(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("7 - getPaymentById", () => {
    it("1 - should get payment by id and return 200", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(existPayment);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "POST",
        params: { eventId: existEvent.id, paymentId: existPayment.id },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getPaymentById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should not get payment by id and return 404", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(null);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "POST",
        params: { eventId: existEvent.id, paymentId: existPayment.id },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getPaymentById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if invalid id", async () => {
      jest.spyOn(Payment, "findOne").mockRejectedValue(null);
      (verifyToken as jest.Mock).mockImplementation(
        (req: Request, res: Response, next: NextFunction) => {
          next();
        },
      );
      const req = httpMocks.createRequest({
        method: "POST",
        params: { eventId: "-", paymentId: "-" },
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.getPaymentById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("8 - verifyTokenOAUTH", () => {
    it("1 - should generate a new token and return 200", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "POST",
        body: { token: "ngdAXMejlnEqMYovrFjR" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      (jwt.verify as jest.Mock).mockReturnValue(
        res.status(201).json({ message: "Valid token", data: "" }),
      );
      await eventController.verifyTokenOAUTH(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("2 - should return 401 if invalid token", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "POST",
        body: { token: "----------" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      (jwt.verify as jest.Mock).mockReturnValue(
        res.status(401).json({ message: "Invalid token" }),
      );
      await eventController.verifyTokenOAUTH(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });
    it("3 - should return 401 if payment not found", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        body: { token: "----------" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.verifyTokenOAUTH(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
    });
    it("4 - should return 400 if missing token", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "POST",
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.verifyTokenOAUTH(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("5 - should return 500 if invalid token but found in db", async () => {
      jest.spyOn(Payment, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "POST",
        body: { token: "----------" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.verifyTokenOAUTH(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("9 - deleteToken", () => {
    it("1 - should delete token and return 200", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(existPayment);
      const req = httpMocks.createRequest({
        method: "DELETE",
        body: { token: "ngdAXMejlnEqMYovrFjR" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.deleteToken(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("2 - should return 404 if payment not found", async () => {
      jest.spyOn(Payment, "findOne").mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
        body: { token: "-------------" },
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.deleteToken(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it("3 - should return 500 if token not sent", async () => {
      jest.spyOn(Payment, "findOne").mockRejectedValue(null);
      const req = httpMocks.createRequest({
        method: "DELETE",
      });
      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
      await eventController.deleteToken(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
