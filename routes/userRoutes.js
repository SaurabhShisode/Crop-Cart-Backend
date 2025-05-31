import express from 'express';
import { registerUser, loginUser, googleLogin, getMe } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// Protected route to get current logged-in user info
router.get('/me', authMiddleware, getMe);

export default router;
