import userController from "../../src/controllers/userController";
import User from "../../src/models/User";
import httpMocks from 'node-mocks-http';

jest.mock("../../src/models/User");
jest.mock('bcrypt');

const newUser = new User({
    lastname: "Dey",
    firstname: "Haroun-Rachid",
    email: "haroun@ooredoo.dz",
    password: "test",
    pseudo: "bechari",
    role: "user"
});

const wrongUser = {
    lastname: "test",
    firstname: "test",
    password: "test",
    pseudo: "test"
};

describe("Test case for user controller", () => {
    describe("1 - signup", () => {
        it("1 - should create user and return 201", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);
            const saveMock = jest.fn().mockResolvedValue(newUser);
            User.prototype.save = saveMock;
            const req = httpMocks.createRequest({
                method: 'POST',
                body: newUser
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await userController.signup(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it("2 - should return 400 if invalid request", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(null);
            const req = httpMocks.createRequest({
                method: 'POST',
                body: wrongUser
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await userController.signup(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        it("3 - should return 500 user if user already exists", async () => {
            jest.spyOn(User, 'findOne').mockResolvedValue(newUser);
            const req = httpMocks.createRequest({
                method: 'POST',
                body: newUser
            });
            const res = httpMocks.createResponse();
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            await userController.signup(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});