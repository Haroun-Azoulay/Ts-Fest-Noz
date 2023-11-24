const express = require("express");
const router = express.Router();
const commentaryController = require("../controllers/commentaryController");
const verifyToken = require('../middlewares/verifyToken');
// Create a new commentary
router.post("/create-commentary/:postId", verifyToken, commentaryController.createCommentary);

// Get all commentaries for a specific post
router.get("/get-commentary/:postId", verifyToken, commentaryController.getCommentariesByPost);

router.get("/get-all-commentary", verifyToken, commentaryController.getAllCommentaries);

// Update a commentary by ID
router.put("/update-commentary/:commentaryId", verifyToken, commentaryController.updateCommentary);

// Delete a commentary by ID
router.delete("/delete-commentary/:commentaryId", verifyToken, commentaryController.deleteCommentary);

module.exports = router;
