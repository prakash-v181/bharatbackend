// productRoutes.js

import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductReviews
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

// PUBLIC: get all products
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)

// PUBLIC: top products
router.get('/top', getTopProducts)

// PUBLIC: get single product
router.route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

// ⭐ NEW — PUBLIC: get product reviews
router.get('/:id/reviews', checkObjectId, getProductReviews)

// 🔐 PROTECTED: add review
router.post('/:id/reviews', protect, checkObjectId, createProductReview)

export default router





// import express from 'express';
// const router = express.Router();
// import {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   createProductReview,
//   getTopProducts,
// } from '../controllers/productController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
// import checkObjectId from '../middleware/checkObjectId.js';

// router.route('/').get(getProducts).post(protect, admin, createProduct);
// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
// router.get('/top', getTopProducts);
// router
//   .route('/:id')
//   .get(checkObjectId, getProductById)
//   .put(protect, admin, checkObjectId, updateProduct)
//   .delete(protect, admin, checkObjectId, deleteProduct);

// export default router;
