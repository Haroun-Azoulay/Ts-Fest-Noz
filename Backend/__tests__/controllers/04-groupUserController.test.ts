import User from "../../src/models/User";
import Group from "../../src/models/Group";
import GroupUser from "../../src/models/GroupUser";
import groupUserController from "../../src/controllers/groupUserController";
import userController from "../../src/controllers/userController";
import httpMocks from 'node-mocks-http';
import { Request, Response, NextFunction } from 'express';
import verifyTokenAdmin from "../../src/middlewares/verifyTokenAdmin";
const bcrypt = require("bcrypt");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/verifyTokenAdmin");
jest.mock("../../src/models/GroupUser");
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
const existArtist = new User({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb52ccd",
    lastname: "artist",
    firstname: "artist",
    email: "artist@example.com",
    password: bcrypt.hash("artist", 10),
    pseudo: "artist",
    city: "Paris",
    role: "artist"
});
const existGroup = new Group({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb53ccb",
    name: "group-test"
});
const existGroupUser = new GroupUser({
    id: "5cbfa5dc-7999-4fb1-a443-33894fb54ccb",
    groupId: "5cbfa5dc-7999-4fb1-a443-33894fb53ccb",
    userId: "5cbfa5dc-7999-4fb1-a443-33894fb52ccb"
});
const goodLogin = {
    password: "test",
    pseudo: "bechari"
};
const goodLoginAdmin = {
    password: "admin",
    pseudo: "admin"
};

describe("Test case for groupuser controller", () => {
    describe("1 - signin", () => {
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
            jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
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
    describe("2 - createGroupUser", () => {
        it("1 - should create group user and return 201", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(User, 'findOne').mockResolvedValue(existArtist);
            const req = httpMocks.createRequest({
                method: 'POST',
                params: {groupId: existGroup.id},
                body: {userId: existArtist.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.createGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it("2 - should return 401 if user not artist", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(User, 'findOne').mockResolvedValue(existUser);
            const req = httpMocks.createRequest({
                method: 'POST',
                params: {groupId: existGroup.id},
                body: {userId: existUser.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.createGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });
        it("3 - should return 500 if user not artist", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(User, 'findOne').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'POST',
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.createGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
    describe("3 - deleteGroupUser", () => {
        it("1 - should delete group user and return 200", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GroupUser, 'findOne').mockResolvedValue(existGroupUser);
            const req = httpMocks.createRequest({
                method: 'DELETE',
                params: {groupId: existGroup.id},
                body: {userId: existArtist.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.deleteGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it("2 - should return 404 if group user not found", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GroupUser, 'findOne').mockResolvedValue(null);
            const req = httpMocks.createRequest({
                method: 'DELETE',
                params: {groupId: existGroup.id},
                body: {userId: existArtist.id},
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.deleteGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
        it("3 - should return 500 if missing properties", async () => {
            (verifyTokenAdmin as jest.Mock).mockImplementation(
                (req: Request, res: Response, next: NextFunction) => {
                    next();
                }
            );
            jest.spyOn(GroupUser, 'findOne').mockRejectedValue(null);
            const req = httpMocks.createRequest({
                method: 'DELETE',
                headers: { Authorization: `Bearer ${tokenAdmin}` }
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await groupUserController.deleteGroupUser(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
