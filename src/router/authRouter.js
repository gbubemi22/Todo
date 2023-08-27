import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.login);
router.post('/refresh-token', authController.updateRefreshToken);

// Add the prefix to all routes
const prefix = '/api/v1/auth';
router.use(prefix, router);

export default router;