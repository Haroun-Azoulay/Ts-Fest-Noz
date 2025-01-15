import groupController from "../../src/controllers/groupController";
import Group from "../../src/models/Group";
import httpMocks from 'node-mocks-http';
import { Request, Response, NextFunction } from 'express';
import verifyToken from "../../src/middlewares/verifyToken";
import verifyTokenAdmin from "../../src/middlewares/verifyTokenAdmin";
const bcrypt = require("bcrypt");

jest.mock("../../src/middlewares/verifyToken");
jest.mock("../../src/middlewares/verifyTokenAdmin");
jest.mock("../../src/models/Group");
jest.mock('bcrypt');

describe("Test case for group controller", () => {
});
