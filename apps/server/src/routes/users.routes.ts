import { Router } from 'express';
import { requireAdmin, requireAuth } from '@src/middleware/auth.middleware';
import * as usersContorller from '@src/controllers/users.controller';

const router = Router();

router.post('/users', requireAuth, requireAdmin, usersContorller.createUser);

export default router;
