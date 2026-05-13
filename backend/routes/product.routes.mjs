import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.mjs';

const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many create/update requests, please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(apiLimiter);

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/create-product', strictLimiter, createProduct);
router.put('/edit/:id', strictLimiter, updateProduct);
router.delete('/delete/:id', strictLimiter, deleteProduct);

export default router;