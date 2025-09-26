import { Request, Response } from 'express';
import { products } from '../data/products';
import { ApiResponse, Product } from '../types';

export const getAllProducts = (req: Request, res: Response<ApiResponse<Product[]>>) => {
  try {
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getProductById = (req: Request, res: Response<ApiResponse<Product>>) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    
    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};