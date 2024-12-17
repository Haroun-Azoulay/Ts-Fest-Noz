import express, { Router } from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";
import isAdmin from "../middlewares/isAdmin";

const router: Router = express.Router();

// it's the same like user i can change after !!!
router.get("/all-users", verifyToken, isAdmin, userController.getAllUsers);

router.put(
  "/update-role/:userId",
  verifyToken,
  isAdmin,
  userController.updateUserRole,
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
 * /update-role/{userId}:
 *   put:
 *     summary: Update role
 *     description: Update role if you are Admin
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the user to put
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newRole
 *             properties:
 *               newRole:
 *                 type: string
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information changed successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
