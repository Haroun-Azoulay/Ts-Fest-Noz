import express, { Router } from "express";
import goodieTypeController from "../controllers/goodieTypeController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();

router.get(
  "/get-all-types",
  verifyToken,
  goodieTypeController.getAllGoodieTypes,
);

export default router;
