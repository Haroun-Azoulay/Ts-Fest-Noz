import express, { Router } from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin";

const router: Router = express.Router();

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.get("/my-user", verifyToken, userController.getUserInfo);

router.get("/get-all-users", verifyToken, userController.getAllUsers);

router.delete(
  "/delete-user/:userId",
  verifyTokenAdmin,
  userController.deleteUser,
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
 * /signup:
 *   post:
 *     summary: Create a user
 *     description: Create a user in the system.
 *     tags:
 *       - Connexion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - pseudo
 *               - firstname
 *               - lastname
 *               - city
 *               - longitude
 *                 latitude
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               pseudo:
 *                 type: string
 *                 description: The user's pseudo.
 *               firstname:
 *                 type: string
 *                 description: The user's firstname.
 *               lastname:
 *                 type: string
 *                 description: The user's lastname..
 *               city:
 *                 type: string
 *                 description: The user's city.
 *               longitude:
 *                 type: number
 *                 description: The user's longitude.
 *               latitude:
 *                 type: number
 *                 description: The user's latitude.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /signin:
 *   post:
 *     summary: Authenticate a user
 *     description: Log in an existing user with pseudo and password.
 *     tags:
 *       - Connexion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pseudo
 *               - password
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: The user's pseudo.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: Authentication successful.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /my-user:
 *   get:
 *     summary: Retrieve current user information
 *     description: Get details of the currently authenticated user.
 *     tags:
 *       - Connexion
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-all-users:
 *   get:
 *     summary: Retrieve all user information
 *     description: Get details of the all user authenticated user.
 *     tags:
 *       - Connexion
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
