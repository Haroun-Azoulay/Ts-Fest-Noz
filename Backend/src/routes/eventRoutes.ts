import express, { Router } from "express";
import eventController from "../controllers/eventController";
import verifyToken from "../middlewares/verifyToken";
import isAuthorizedPost from "../middlewares/isAuthorizedPost";

const router : Router = express.Router();

router.post("/add-event", verifyToken, isAuthorizedPost, eventController.addEvent);

router.get("/get-all-events", verifyToken, eventController.getAllEvents);

router.get("/get-event-city/:city", eventController.getEventsByCity);

router.get("/get-event/:id", eventController.getEventById);

router.post("/get-event/:id/payment", verifyToken, eventController.addPayment);

router.get("/get-event/:eventId/payment/:paymentId", verifyToken, eventController.getPaymentById);

router.post("/get-event/token", eventController.verifyTokenOATUH);

router.delete("/delete-token/:token", eventController.deleteToken);

export default router;
