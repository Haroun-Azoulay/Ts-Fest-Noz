import express from "express";
import eventController from "../controllers/eventController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();



router.post("/add-event", verifyToken, eventController.addEvent);


router.get("/get-all-event", verifyToken, eventController.getAllEvents);

router.get("/get-event/:id", verifyToken, eventController.getEventById);


// // router.put("/update-point/:pointId", verifyToken, cityController.updatePoint);

// router.delete("/delete-point/:pointId", verifyToken, eventController.deletePoint);


export default router;