import express, { Router } from "express";
import billingController from "../controllers/billingController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();

router.post("/create-billing", verifyToken, billingController.createBilling);

router.get("/get-my-billing", verifyToken, billingController.getMyBilling);

export default router;
