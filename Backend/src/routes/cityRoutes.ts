import express, { Router } from "express";
import cityController from "../controllers/cityController";
import verifyToken from "../middlewares/verifyToken";
import isAuthorizedPost from "../middlewares/isAuthorizedPost";

const router: Router = express.Router();

router.post(
  "/add-point",
  verifyToken,
  isAuthorizedPost,
  cityController.addPoint,
);

router.get("/get-all-points", verifyToken, cityController.getAllPoints);

router.get("/get-point/:userId", verifyToken, cityController.getPointByUser);

//  I don't know why this line is comment ?
// router.put("/update-point/:pointId", verifyToken, cityController.updatePoint);

router.delete(
  "/delete-point/:pointId",
  verifyToken,
  cityController.deletePoint,
);

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
 * /add-point:
 *   post:
 *     summary: Add a new point
 *     description: Add a new point in the system.
 *     tags:
 *       - City
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longitude
 *               - latitude
 *               - text
 *               - address
 *               - color
 *             properties:
 *               longitude:
 *                 type: number
 *                 description: The city's longitude.
 *               latitude:
 *                 type: number
 *                 description: The city's latitude.
 *               text:
 *                 type: string
 *                 description: The city's text.
 *               address:
 *                 type: string
 *                 description: The city's address.
 *               color:
 *                 type: string
 *                 description: The city's color.
 *               departement_number:
 *                 type: integer
 *                 description: The user's departement_number.
 *     responses:
 *       201:
 *         description: Point created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-all-points:
 *   get:
 *     summary: Retrieve all points information
 *     description: Get details of all points.
 *     tags:
 *       - City
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Points information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-point/{userId}:
 *   get:
 *     summary: Retrieve all points's information with the UUID User
 *     description: Get details of the point by the UUID User.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the user to retrieve his point.
 *     tags:
 *       - City
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Points information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /delete-point/{pointId}:
 *   delete:
 *     summary: Delete point with his ID
 *     description: Delete a point with his ID.
 *     parameters:
 *       - in: path
 *         name: pointId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the point to delete
 *     tags:
 *       - City
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Point has been removed.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
