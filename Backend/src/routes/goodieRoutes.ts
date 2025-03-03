import express, { Router } from "express";
import verifyTokenAdmin from "../middlewares/verifyTokenAdmin";
import verifyToken from "../middlewares/verifyToken";
import goodieController from "../controllers/goodieController";
const router: Router = express.Router();
const multer = require("multer");

// Configure the multer service
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/images"); // Folder where the images will be stored
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname); // File name
  },
});
const upload = multer({ storage: storage });

router.post(
  "/create-goodie",
  verifyToken,
  upload.single("image"),
  goodieController.createGoodie,
);

router.get("/get-goodie/:id", verifyToken, goodieController.getGoodie);

router.get("/me/:id", verifyToken, goodieController.getMyGoodies);

router.get(
  "/get-all-goodies",
  verifyToken,
  goodieController.getAllAvailableGoodies,
);

router.get(
  "/get-filtered-goodies",
  verifyToken,
  goodieController.getFilteredGoodies,
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
 *   /create-goodie:
 *     post:
 *       summary: Create a new goodie
 *       description: Create a new goodie in the e-shop with optional image upload.
 *       tags:
 *         - E-SHOP - Goodie
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               required:
 *                 - groupId
 *                 - userId
 *                 - goodieTypeId
 *                 - name
 *                 - quantity
 *                 - price
 *                 - available
 *                 - image
 *               properties:
 *                 groupId:
 *                   type: string
 *                   description: The group's UUID.
 *                 userId:
 *                   type: string
 *                   description: The user's UUID.
 *                 goodieTypeId:
 *                   type: string
 *                   description: The goodie type's UUID.
 *                 name:
 *                   type: string
 *                   description: The name of the goodie.
 *                 quantity:
 *                   type: number
 *                   description: The quantity of goodies.
 *                 price:
 *                   type: number
 *                   description: The price of the goodie.
 *                 available:
 *                   type: boolean
 *                   description: Whether the goodie is available.
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: The image file for the goodie.
 *       responses:
 *         201:
 *           description: Goodie created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the created goodie.
 *                   groupId:
 *                     type: string
 *                     description: The group's UUID.
 *                   userId:
 *                     type: string
 *                     description: The user's UUID.
 *                   goodieTypeId:
 *                     type: string
 *                     description: The goodie type's UUID.
 *                   name:
 *                     type: string
 *                     description: The name of the goodie.
 *                   path:
 *                     type: string
 *                     description: The Base64 encoded image of the goodie.
 *                   quantity:
 *                     type: number
 *                     description: The quantity of goodies.
 *                   price:
 *                     type: number
 *                     description: The price of the goodie.
 *                   available:
 *                     type: boolean
 *                     description: Whether the goodie is available.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *         500:
 *           description: Internal server error.
 *
 *   /me/{id}:
 *     get:
 *       summary: Get user's goodies
 *       description: Retrieve the list of goodies belonging to a specific user by their ID.
 *       tags:
 *         - E-SHOP - Goodie
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: List of user's goodies retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the goodie.
 *                     groupId:
 *                       type: string
 *                       description: The group's UUID.
 *                     userId:
 *                       type: string
 *                       description: The user's UUID.
 *                     goodieTypeId:
 *                       type: string
 *                       description: The goodie type's UUID.
 *                     name:
 *                       type: string
 *                       description: The name of the goodie.
 *                     quantity:
 *                       type: number
 *                       description: The quantity of goodies.
 *                     price:
 *                       type: number
 *                       description: The price of the goodie.
 *                     available:
 *                       type: boolean
 *                       description: Whether the goodie is available.
 *         401:
 *           description: Unauthorized.
 *         500:
 *           description: Internal server error.
 *
 *   /get-all-goodies:
 *     get:
 *       summary: Get all available goodies
 *       description: Retrieve the list of all available goodies in the e-shop.
 *       tags:
 *         - E-SHOP - Goodie
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Goodies available retrieved successfully.
 *         401:
 *           description: Unauthorized.
 *         500:
 *           description: Internal server error.
 *
 *   /get-filtered-goodies:
 *     get:
 *       summary: Get filtered goodies
 *       description: Retrieve a filtered list of goodies based on group and type filters.
 *       tags:
 *         - E-SHOP - Goodie
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: selectedGroup
 *           in: query
 *           required: false
 *           description: The UUID of the group to filter by.
 *           schema:
 *             type: string
 *         - name: selectedType
 *           in: query
 *           required: false
 *           description: The UUID of the goodie type to filter by.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: List of filtered goodies retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the goodie.
 *                     groupId:
 *                       type: string
 *                       description: The group's UUID.
 *                     userId:
 *                       type: string
 *                       description: The user's UUID.
 *                     goodieTypeId:
 *                       type: string
 *                       description: The goodie type's UUID.
 *                     name:
 *                       type: string
 *                       description: The name of the goodie.
 *                     quantity:
 *                       type: number
 *                       description: The quantity of goodies.
 *                     price:
 *                       type: number
 *                       description: The price of the goodie.
 *                     available:
 *                       type: boolean
 *                       description: Whether the goodie is available.
 *         401:
 *           description: Unauthorized.
 *         500:
 *           description: Internal server error.
 */
