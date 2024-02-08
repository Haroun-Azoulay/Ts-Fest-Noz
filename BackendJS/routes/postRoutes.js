// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/create-post', verifyToken, postController.createPost);
router.get('/get-latest-post', verifyToken, postController.getLatestPost);
router.get('/get-post/:id', verifyToken, postController.getPostById);
router.get('/get-all-posts', verifyToken, postController.getAllPosts);
router.post('/update-post', verifyToken, postController.updatePost);
router.post('/delete-post', verifyToken, postController.deletePost);

module.exports = router;
