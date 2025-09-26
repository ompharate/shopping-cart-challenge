import { Request, Response } from 'express';
import { products } from '../data/products';
import { CheckoutRequest, CheckoutResponse } from '../types';

interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export const processCheckout = (req: Request<{}, CheckoutResponse, CheckoutRequest>, res: Response<CheckoutResponse>) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart items",
        orderId: "",
        total: "0.00"
      });
    }

    let total = 0;
    const orderDetails: OrderDetail[] = [];

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid item data",
          orderId: "",
          total: "0.00"
        });
      }

      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with id ${item.productId} not found`,
          orderId: "",
          total: "0.00"
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderDetails.push({
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        itemTotal
      });
    }

    const orderId = `ORD-${Date.now()}`;

    logOrderToConsole(orderId, orderDetails, total);

    res.json({
      success: true,
      message: "Order placed successfully!",
      orderId,
      total: total.toFixed(2)
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      orderId: "",
      total: "0.00"
    });
  }
};

const logOrderToConsole = (orderId: string, orderDetails: OrderDetail[], total: number) => {
  console.log("NEW ORDER RECEIVED:");
  console.log("=====================");
  console.log(`Order ID: ${orderId}`);
  console.log(`Order Date: ${new Date().toISOString()}`);
  console.log("\nItems:");
  
  orderDetails.forEach(item => {
    console.log(`- ${item.productName} x${item.quantity} @ $${item.unitPrice} = $${item.itemTotal.toFixed(2)}`);
  });
  
  console.log(`\nTotal: $${total.toFixed(2)}`);
  console.log("=====================\n");
};