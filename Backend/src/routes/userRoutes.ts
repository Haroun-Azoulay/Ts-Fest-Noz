import express, { Router } from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();


router.post("/signup", userController.signup);

router.get("/my-user", verifyToken, userController.getUserInfo);

router.get("/get-all-users", verifyToken, userController.getAllUsers);

router.post("/signin", userController.signin);

export default router;





/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a user
 *     description: Create a user.
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
 *                 description: The user's lastname.
 *     responses:
 *       201:
 *         description: Create user successful.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */


/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user.
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
 *         description: Authenticate is successful.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */