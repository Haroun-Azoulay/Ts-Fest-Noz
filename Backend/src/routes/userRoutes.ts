import express, { Router } from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router : Router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */

router.post("/signup", userController.signup);

router.get("/my-user", verifyToken, userController.getUserInfo);

router.get("/get-all-users", verifyToken, userController.getAllUsers);

router.post("/signin", userController.signin);

export default router;
