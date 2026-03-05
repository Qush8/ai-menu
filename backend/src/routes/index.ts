import { Router } from 'express';
import { getHello } from '../controllers/healthController';

const router = Router();

router.get('/hello', getHello);

export default router;
