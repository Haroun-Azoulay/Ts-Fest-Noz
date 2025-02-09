import User from "../../src/models/User";
import GoodieType from "../../src/models/GoodieType";
import userController from "../../src/controllers/userController";
import httpMocks from 'node-mocks-http';
import { Request, Response, NextFunction } from 'express';
import goodieTypeController from "../../src/controllers/goodieTypeController";
import verifyToken from "../../src/middlewares/verifyToken";
import verifyTokenAdmin from "../../src/middlewares/verifyTokenAdmin";
const bcrypt = require("bcrypt");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/verifyTokenAdmin");
jest.mock("../../src/models/GoodieType");
jest.mock('bcrypt');

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
    role: "user"
});
const existAdmin = new User({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccc",
    lastname: "admin",
    firstname: "admin",
    email: "admin@example.com",
    password: "admin",
    pseudo: "admin",
    city: "Paris",
    role: "admin"
});
const goodLogin = {
    password: "test",
    pseudo: "bechari"
};
const goodLoginAdmin = {
    password: "admin",
    pseudo: "admin"
};
const newGoodieType = {
    name: "goodie_type_test"
}
const existGoodieType = new GoodieType({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb57ccb",
    name: "goodie_type_test"
});
const wrongGoodieType = new GoodieType({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb57ccc",
    name: "Nothing"
});

describe("Test case for goodie type controller", () => {
    describe("1 - signin", () => {
        it("1 - should signin user and return 200", async () => {
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
    });
    describe("2 - addgoodieType", () => {
        it("1 - should add goodie type and return 201", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            const req = httpMocks.createRequest({
                method: 'POST',
                body: newGoodieType,
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.addgoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it("2 - should return 500 if already exists", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'create').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'POST',
                body: newGoodieType,
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.addgoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    describe("3 - getGoodieType", () => {
        it("1 - should get goodie type and return 200", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockResolvedValue(existGoodieType);
            const req = httpMocks.createRequest({
                method: 'GET',
                params: { goodieTypeId: existGoodieType.name },
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.getGoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("2 - should return 404 if goodie type doesn't exist", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockResolvedValue(null);
            const req = httpMocks.createRequest({
                method: 'GET',
                params: { goodieTypeId: wrongGoodieType.name },
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.getGoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
        it("3 - should return 500 if invalid request", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'GET',
                params: { goodieTypeId: "-" },
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.getGoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    describe("4 - getAllgoodieType", () => {
        it("1 - should get all goodie types and return 200", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            const req = httpMocks.createRequest({
                method: 'GET',
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.getAllgoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("2 - should return 500 if unexpected error", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findAll').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'GET',
                headers: { Authorization: `Bearer ${tokenUser}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.getAllgoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    describe("5 - deleteGoodieType", () => {
        it("1 - should delete goodie type and return 200", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockResolvedValue(existGoodieType);
            const req = httpMocks.createRequest({
                method: 'GET',
                params: { goodieTypeId: existGoodieType.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.deletegoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("2 - should return 404 if goodie type not exists", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockResolvedValue(null);
            const req = httpMocks.createRequest({
                method: 'GET',
                params: { goodieTypeId: wrongGoodieType.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.deletegoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
        it("3 - should return 500 if unexpected error", async () => {
            (verifyToken as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GoodieType, 'findByPk').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'GET',
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await goodieTypeController.deletegoodieType(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
