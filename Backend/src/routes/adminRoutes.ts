import express from 'express';
import userController from '../controllers/userController';
import verifyToken from '../middlewares/verifyToken';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();

router.get('/all-users', verifyToken, userController.getAllUsers);
router.put('/update-role/:userId', verifyToken, userController.updateUserRole);

export default router;