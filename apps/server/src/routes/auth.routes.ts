import { Router } from 'express';
import * as authHandler from '@src/handlers/auth.handler';
import { requireAuth } from '@src/middleware/auth.middleware';

const router = Router();

router.post('/auth/login', authHandler.login);

router.get('/auth/logout', requireAuth, authHandler.logout);

export default router;
