import express from 'express';
import { signup, login, getMe, logout } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { signupSchema, loginSchema } from '../validators/authValidators';
import { requireAuth } from '../middlewares/authMiddleware';
import { refreshToken } from '../controllers/refreshController';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh', refreshToken);
router.get('/me', requireAuth, getMe);
router.post('/logout', requireAuth, logout);

export default router;
