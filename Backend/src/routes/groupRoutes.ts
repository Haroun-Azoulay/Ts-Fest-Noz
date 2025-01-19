import express, { Router } from "express";
import groupController from "../controllers/groupController";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAdmin from "../middlewares/verifyToken";
const router: Router = express.Router();

router.post("/create-group", verifyTokenAdmin, groupController.createGroup);

router.get("/get-group/:id", verifyToken, groupController.getGroup);

router.get("/get-all-groups", verifyToken, groupController.getAllGroups);

router.delete("/delete-group/:id", verifyTokenAdmin, groupController.deleteGroup);

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
 * /create-group:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group in the e-shop.
 *     tags:
 *       - Group
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
 *             properties:
 *               name:
 *                 name: string
 *                 description: The group's name.
 *     responses:
 *       201:
 *         description: Group created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-all-groups:
 *   get:
 *     summary: Retrieve all group on the e-shop
 *     description: Get details of all group.
 *     tags:
 *       - Group
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Group information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-group/{id}:
 *   get:
 *     summary: Retrieve group's information with the UUID Group
 *     description: Get details of the group by the UUID Group.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the group to retrieve his e-shop.
 *     tags:
 *       - Group
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Group information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /delete-group/{id}:
 *   delete:
 *     summary: Delete group with his ID
 *     description: Delete a group with his ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the group to delete
 *     tags:
 *       - Group
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Group has been removed.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
