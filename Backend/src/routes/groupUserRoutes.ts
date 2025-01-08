import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import groupUserController from "../controllers/groupUserController";

const router: Router = express.Router();

router.get("/me", verifyToken, groupUserController.getMyGroup);

export default router;
