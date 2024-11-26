import express, { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
import goodieController from "../controllers/goodieController";
const router : Router = express.Router();

router.post("/add", verifyToken, goodieController.createGoodie);

router.get("/me", verifyToken, goodieController.getMyGoodies);

router.get("/get-all-goodies", verifyToken, goodieController.getAllAvailableGoodies);

router.get("/get-filtered-goodies", verifyToken, goodieController.getFilteredGoodies);

export default router;
