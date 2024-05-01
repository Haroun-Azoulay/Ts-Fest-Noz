const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin')


router.get('/all-users', verifyToken, isAdmin, userController.getAllUsers);
router.put('/update-role/:userId', verifyToken, isAdmin, userController.updateUserRole);

export default router;