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
