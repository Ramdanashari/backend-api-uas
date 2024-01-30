// controller/product-controller.js

import productService from '../service/product-service.js';

// ...

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, stock, userId } = req.body;

  try {
    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      stock,
      userId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name, description, price, stock } = req.body;

  try {
    const updatedProduct = await productService.updateProduct(productId, {
      name,
      description,
      price,
      stock,
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const result = await productService.deleteProduct(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default{
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
