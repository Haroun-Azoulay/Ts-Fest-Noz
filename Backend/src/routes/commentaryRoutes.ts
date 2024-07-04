import express from "express";
import commentaryController from '../controllers/commentaryController';

import verifyToken from "../middlewares/verifyToken";


const router = express.Router();

router.post('/create-commentary/:postId', verifyToken, commentaryController.createCommentary);

router.get("/get-commentary/:postId", verifyToken, commentaryController.getCommentariesByPost);

router.get("/get-all-commentary", verifyToken, commentaryController.getAllCommentaries);

router.put("/update-commentary/:commentaryId", verifyToken, commentaryController.updateCommentary);

router.delete("/delete-commentary/:commentaryId", verifyToken, commentaryController.deleteCommentary);

export default router;