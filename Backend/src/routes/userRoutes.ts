import express, { Router } from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router : Router = express.Router();

router.post("/signup", userController.signup);

router.get("/my-user", verifyToken, userController.getUserInfo);

router.get("/get-all-users", verifyToken, userController.getAllUsers);

router.post("/signin", userController.signin);

export default router;
