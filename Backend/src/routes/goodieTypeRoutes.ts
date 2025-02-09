import express, { Router } from "express";
import goodieTypeController from "../controllers/goodieTypeController";
import verifyToken from "../middlewares/verifyToken";
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin";

const router: Router = express.Router();

router.get(
  "/get-goodie-type/:goodieTypeId",
  verifyToken,
  goodieTypeController.getGoodieType
);

router.get(
  "/get-all-types",
  verifyToken,
  goodieTypeController.getAllgoodieType,
);

router.post(
  "/create-goodie-type",
  verifyTokenAdmin,
  goodieTypeController.addgoodieType,
);

router.delete(
  "/delete-goodie-type/:id",
  verifyTokenAdmin,
  goodieTypeController.deletegoodieType,
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
 * paths:
 *   /create-goodie-type:
 *     post:
 *       summary: Add a new goodie type
 *       description: Add a new goodie type to the e-shop.
 *       tags:
 *         - E-SHOP - Goodie-Type
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the goodie type.
 *       responses:
 *         201:
 *           description: Goodie type created successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /get-all-types:
 *     get:
 *       summary: Retrieve all goodie types in the e-shop
 *       description: Get details of all goodie types.
 *       tags:
 *         - E-SHOP - Goodie-Type
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Goodie type information retrieved successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /delete-goodie-type/{id}:
 *     delete:
 *       summary: Delete a goodie type by ID
 *       description: Delete a specific goodie type using its unique ID.
 *       tags:
 *         - E-SHOP - Goodie-Type
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: UUID of the goodie type to delete.
 *       responses:
 *         204:
 *           description: Goodie type has been removed successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *         404:
 *           description: Goodie type not found.
 */
