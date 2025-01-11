import express, { Router } from "express";
import verifyTokenAdmin from "../middlewares/verifyToken";
import groupUserController from "../controllers/groupUserController";

const router: Router = express.Router();

router.post(
  "/groups/:groupId/users",
  verifyTokenAdmin,
  groupUserController.createGroupUser,
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
 * /groups/{groupId}/users:
 *   post:
 *     summary: Add a user to a group
 *     description: Adds a user to a group by specifying the group ID and user ID.
 *     tags:
 *       - Group Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group to which the user will be added.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to be added to the group.
 *     responses:
 *       201:
 *         description: User added to group successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
