import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  createPayPalOrder,
  capturePayPalOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Create order & Get all orders
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// Get user's orders
router.route('/mine').get(protect, getMyOrders);

// PayPal Create Order ⭐ REQUIRED
router.post('/paypal/create', protect, createPayPalOrder);

// PayPal Capture Order ⭐ REQUIRED
router.post('/paypal/capture/:orderId', protect, capturePayPalOrder);

// Get order by ID
router.route('/:id').get(protect, getOrderById);

// Mark order as paid (called after capture)
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Admin deliver order
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;



// import express from 'express';
// const router = express.Router();
// import {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// } from '../controllers/orderController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
// router.route('/mine').get(protect, getMyOrders);
// router.route('/:id').get(protect, getOrderById);
// router.route('/:id/pay').put(protect, updateOrderToPaid);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

// export default router;
