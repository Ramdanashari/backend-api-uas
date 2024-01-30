// src/route/api.js

import express from 'express';
import userController from '../controller/user-controller.js';
import productController from '../controller/product-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = express.Router();
const productRouter = express.Router();

// Middleware untuk autentikasi
userRouter.use(authMiddleware);

// Rute API Pengguna
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Rute API Produk
productRouter.get('/api/products', productController.getAllProducts);
productRouter.get('/api/products/:id', productController.getProductById);
productRouter.post('/api/products', productController.createProduct);
productRouter.put('/api/products/:id', productController.updateProduct);
productRouter.delete('/api/products/:id', productController.deleteProduct);

export { userRouter, productRouter };
