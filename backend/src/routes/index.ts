import { Router } from 'express';
import productRoutes from './products';
import orderRoutes from './orders';

const router = Router();

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

export default router;