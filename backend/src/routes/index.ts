import { Router } from 'express';
import { getHello } from '../controllers/healthController';
import authRoutes from './authRoutes';

const router = Router();

router.get('/hello', getHello);
router.use('/auth', authRoutes);

export default router;
