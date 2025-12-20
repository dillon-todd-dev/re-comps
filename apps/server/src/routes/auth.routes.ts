import { Router } from 'express';
import { requireAuth } from '@src/middleware/auth.middleware';
import * as authController from '@src/controllers/auth.controller';

const router = Router();

router.post('/auth/login', authController.login);

router.get('/auth/logout', requireAuth, authController.logout);

export default router;
