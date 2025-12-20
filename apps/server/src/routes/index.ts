import { Router } from 'express';
import authRoutes from '@src/routes/auth.routes';
import userRoutes from '@src/routes/users.routes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
