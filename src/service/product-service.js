// service/product-service.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductService {
  async getAllProducts() {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Gagal mendapatkan produk.');
    }
  }

  async getProductById(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error('Produk tidak ditemukan.');
      }

      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Gagal mendapatkan detail produk.');
    }
  }

  async createProduct(productData) {
    try {
      const newProduct = await prisma.product.create({
        data: productData,
      });

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Gagal membuat produk baru.');
    }
  }

  async updateProduct(productId, updatedProductData) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: updatedProductData,
      });

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error('Gagal mengupdate produk.');
    }
  }

  async deleteProduct(productId) {
    try {
      await prisma.product.delete({
        where: { id: productId },
      });

      return { message: 'Produk berhasil dihapus.' };
    } catch (error) {
      console.error(error);
      throw new Error('Gagal menghapus produk.');
    }
  }
}

export default new ProductService();
