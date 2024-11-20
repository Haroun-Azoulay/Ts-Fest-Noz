import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import groupDetailController from "../controllers/groupDetailController";

const router : Router = express.Router();

router.get("/me", verifyToken, groupDetailController.getMyGroup);

export default router;
