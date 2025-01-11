import express, { Router } from "express";
import postController from "../controllers/postController";
import verifyToken from "../middlewares/verifyToken";
import isAuthorizedPost from "../middlewares/isAuthorizedPost";

const router: Router = express.Router();

router.post(
  "/add-post",
  verifyToken,
  isAuthorizedPost,
  postController.createPost,
);

router.get("/get-all-posts", verifyToken, postController.getAllPosts);

router.get("/get-post/:id", postController.getPostById);

router.put("/update-post/:id", verifyToken, postController.updatePost);

router.delete("/delete-post/:id", verifyToken, postController.deletePost);

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
 * /add-post:
 *   post:
 *     summary: Add a new post
 *     description: Add a new post in the forum.
 *     tags:
 *       - Forum - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subtitle
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post's title.
 *               subtitle:
 *                 type: string
 *                 description: The post's subtitle.
 *               content:
 *                 type: string
 *                 description: The post's content.
 *               userId:
 *                 type: string
 *                 description: The post's userId.
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-all-posts:
 *   get:
 *     summary: Retrieve all posts on the forum
 *     description: Get details of all posts.
 *     tags:
 *       - Forum - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Posts information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /get-post/{id}:
 *   get:
 *     summary: Retrieve post's information with the UUID Post
 *     description: Get details of the post by the UUID Post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the post to retrieve his forum.
 *     tags:
 *       - Forum - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Forum information retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /update-post/{id}:
 *   put:
 *     summary: Update post
 *     description: Update post
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the post to put
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subtitle
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post's title.
 *               subtitle:
 *                 type: string
 *                 description: The post's subtitle.
 *               content:
 *                 type: string
 *                 description: The post's content.
 *               userId:
 *                 type: string
 *                 description: The post's userId.
 *     tags:
 *       - Forum - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post information changed successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *
 * /delete-post/{id}:
 *   delete:
 *     summary: Delete post with his ID
 *     description: Delete a post with his ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Numeric UUID of the post to delete
 *     tags:
 *       - Forum - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Post has been removed.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
