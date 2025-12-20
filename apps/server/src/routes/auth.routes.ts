import { Router } from 'express';
import * as authHandler from '@src/handlers/auth.handler';

const router = Router();

router.post('/auth/login', authHandler.login);

router.get('/auth/logout', authHandler.logout);

export default router;
