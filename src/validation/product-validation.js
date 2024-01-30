// controller/product-controller.js
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const prisma = new PrismaClient();

// Skema validasi untuk entitas produk
const productValidationSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().max(1000).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  userId: Joi.number().integer().min(1).required(),
});

// ...

// Membuat produk baru
const createProduct = async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description, price, stock, userId } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        userId,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal membuat produk baru.' });
  }
};

// Mengupdate produk berdasarkan ID
const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { error } = productValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description, price, stock } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengupdate produk.' });
  }
};

// ...
