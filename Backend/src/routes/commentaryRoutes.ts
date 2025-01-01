import express, { Router } from "express";
import commentaryController from "../controllers/commentaryController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();

router.post(
  "/create-commentary/:postId",
  verifyToken,
  commentaryController.createCommentary,
);

router.get(
  "/get-commentary/:postId",
  verifyToken,
  commentaryController.getCommentariesByPost,
);

router.get(
  "/get-all-commentary",
  verifyToken,
  commentaryController.getAllCommentaries,
);

router.put(
  "/update-commentary/:commentaryId",
  verifyToken,
  commentaryController.updateCommentary,
);

router.delete(
  "/delete-commentary/:commentaryId",
  verifyToken,
  commentaryController.deleteCommentary,
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
 *   /create-commentary/{postId}:
 *     post:
 *       summary: Add a new commentary
 *       description: Add a new commentary to a specific post.
 *       tags:
 *         - Forum - Commentaries
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: UUID of the post to add commentary to.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - subtitle
 *                 - content
 *                 - userId
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The commentary's title.
 *                 subtitle:
 *                   type: string
 *                   description: The commentary's subtitle.
 *                 content:
 *                   type: string
 *                   description: The commentary's content.
 *                 userId:
 *                   type: string
 *                   description: The ID of the user creating the commentary.
 *       responses:
 *         201:
 *           description: Commentary created successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /get-commentary/{postId}:
 *     get:
 *       summary: Retrieve commentaries for a specific post
 *       description: Retrieve all commentaries associated with a given post ID.
 *       tags:
 *         - Forum - Commentaries
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: postId
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: UUID of the post to retrieve commentaries for.
 *       responses:
 *         200:
 *           description: Commentaries retrieved successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /get-all-commentary:
 *     get:
 *       summary: Retrieve all commentaries
 *       description: Retrieve all commentaries in the forum.
 *       tags:
 *         - Forum - Commentaries
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: All commentaries retrieved successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /update-commentary/{commentaryId}:
 *     put:
 *       summary: Update a commentary
 *       description: Update details of an existing commentary by its ID.
 *       tags:
 *         - Forum - Commentaries
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: commentaryId
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: UUID of the commentary to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - subtitle
 *                 - content
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Updated title of the commentary.
 *                 subtitle:
 *                   type: string
 *                   description: Updated subtitle of the commentary.
 *                 content:
 *                   type: string
 *                   description: Updated content of the commentary.
 *       responses:
 *         200:
 *           description: Commentary updated successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 *
 *   /delete-commentary/{commentaryId}:
 *     delete:
 *       summary: Delete a commentary
 *       description: Delete a specific commentary by its ID.
 *       tags:
 *         - Forum - Commentaries
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: commentaryId
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: UUID of the commentary to delete.
 *       responses:
 *         204:
 *           description: Commentary deleted successfully.
 *         400:
 *           description: Bad request.
 *         401:
 *           description: Unauthorized.
 */
