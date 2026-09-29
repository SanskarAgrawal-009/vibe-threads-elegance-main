import { Request, Response } from 'express';
import Product from '../models/Product';

export const productController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
};
