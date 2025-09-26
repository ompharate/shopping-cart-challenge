import { Router } from 'express';
import { processCheckout } from '../controllers/orderController';

const router = Router();

// POST /api/orders/checkout - Process checkout
router.post('/checkout', processCheckout);

export default router;