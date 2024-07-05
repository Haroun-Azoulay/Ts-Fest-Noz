import express from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/signup", userController.signup);

router.get("/my-user", verifyToken, userController.getUserInfo);

router.post("/signin", userController.signin);

export default router;
