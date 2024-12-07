import express, { Router } from "express";
import groupController from "../controllers/groupController";
import verifyToken from "../middlewares/verifyToken";

const router : Router = express.Router();

router.get("/me", verifyToken, groupController.getGroup);

router.get("/get-all-groups", verifyToken, groupController.getAllGroups);

router.post("/create-group", verifyToken, groupController.createGroup);

router.delete("/delete-group/:id", verifyToken, groupController.deleteGroup);

export default router;
