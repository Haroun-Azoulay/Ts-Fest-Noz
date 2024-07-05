import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/verifyToken';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();

router.get('/all-users', verifyToken, isAdmin, userController.getAllUsers);

router.put('/update-role/:userId', verifyToken, isAdmin, userController.updateUserRole);

export default router;