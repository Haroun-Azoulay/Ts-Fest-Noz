import express, { Router } from "express";
import eventController from "../controllers/eventController";
import verifyToken from "../middlewares/verifyToken";
import isAuthorizedPost from "../middlewares/isAuthorizedPost";

const router: Router = express.Router();

router.post(
  "/add-event",
  verifyToken,
  isAuthorizedPost,
  eventController.addEvent,
);

router.get("/get-all-events", verifyToken, eventController.getAllEvents);

router.get("/get-event-city/:city", eventController.getEventsByCity);

router.get("/get-event/:id", eventController.getEventById);

router.post("/get-event/:id/payment", verifyToken, eventController.addPayment);

router.get(
  "/get-event/:eventId/payment/:paymentId",
  verifyToken,
  eventController.getPaymentById,
);

router.post("/get-event/token", eventController.verifyTokenOAUTH);

router.delete("/delete-token/:token", eventController.deleteToken);

export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /add-event:
 *   post:
 *     summary: Add a new event
 *     description: Add a new event to the system.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city_id
 *               - user_id
 *               - description
 *               - url
 *               - mapId
 *             properties:
 *               name:
 *                 type: string
 *                 description: The event's name.
 *               description:
 *                 type: string
 *                 description: The event's description.
 *               url:
 *                 type: string
 *                 description: The event's URL.
 *               mapId:
 *                 type: integer
 *                 description: The event's map ID.
 *               city_id:
 *                 type: string
 *                 description: The event's city ID.
 *               user_id:
 *                 type: string
 *                 description: The event's user ID.
 *     responses:
 *       201:
 *         description: Event created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-all-events:
 *   get:
 *     summary: Retrieve all events
 *     description: Get details of all events in the system.
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all events retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-event-city/{city}:
 *   get:
 *     summary: Retrieve events by city
 *     description: Get details of events in a specific city.
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the city to fetch events for.
 *     responses:
 *       200:
 *         description: List of events in the specified city.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 *
 * /get-event/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     description: Get details of an event by its ID.
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to fetch.
 *     responses:
 *       200:
 *         description: Event details retrieved successfully.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 *
 * /get-event/{id}/payment:
 *   post:
 *     summary: Add a payment for an event
 *     description: Add a payment for a specific event.
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event for which to add a payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment:
 *                 type: number
 *                 description: The amount of the payment.
 *     responses:
 *       201:
 *         description: Payment added successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *
 * /get-event/{eventId}/payment/{paymentId}:
 *   get:
 *     summary: Retrieve payment details by payment ID
 *     description: Get details of a payment by its ID for a specific event.
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to fetch.
 *     responses:
 *       200:
 *         description: Payment details retrieved successfully.
 *       404:
 *         description: Payment not found.
 *       500:
 *         description: Internal server error.
 *
 * /get-event/token:
 *   post:
 *     summary: Verify OAuth token
 *     description: Verify the validity of an OAuth token.
 *     tags:
 *       - Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token to verify.
 *     responses:
 *       201:
 *         description: Token verified successfully.
 *       400:
 *         description: Missing or invalid token.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 *
 * /delete-token/{token}:
 *   delete:
 *     summary: Delete a token
 *     description: Remove a token from the system.
 *     tags:
 *       - Token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The token to delete.
 *     responses:
 *       200:
 *         description: Token deleted successfully.
 *       404:
 *         description: Token not found.
 *       500:
 *         description: Internal server error.
 */
