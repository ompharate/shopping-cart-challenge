import request from 'supertest';
import createApp from '../app';

const app = createApp();

describe('POST /api/orders/checkout', () => {
  it('should process checkout successfully with valid items', async () => {
    const checkoutData = {
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post('/api/orders/checkout')
      .send(checkoutData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Order placed successfully!');
    expect(response.body).toHaveProperty('orderId');
    expect(response.body).toHaveProperty('total');
    expect(response.body.orderId).toMatch(/^ORD-\d+$/);
    expect(parseFloat(response.body.total)).toBeGreaterThan(0);
  });

  it('should return 400 for empty cart', async () => {
    const checkoutData = { items: [] };

    const response = await request(app)
      .post('/api/orders/checkout')
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid cart items');
  });

  it('should return 400 for invalid items', async () => {
    const checkoutData = {
      items: [
        { productId: 1, quantity: 0 }, // Invalid quantity
      ]
    };

    const response = await request(app)
      .post('/api/orders/checkout')
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Invalid item data');
  });

  it('should return 404 for non-existent product', async () => {
    const checkoutData = {
      items: [
        { productId: 999, quantity: 1 }, // Non-existent product
      ]
    };

    const response = await request(app)
      .post('/api/orders/checkout')
      .send(checkoutData);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.message).toContain('Product with id 999 not found');
  });

  it('should calculate total correctly', async () => {
    // Product 1: $99.99, Product 2: $249.99
    const checkoutData = {
      items: [
        { productId: 1, quantity: 2 }, // $199.98
        { productId: 2, quantity: 1 }  // $249.99
      ]
    };

    const response = await request(app)
      .post('/api/orders/checkout')
      .send(checkoutData);

    expect(response.status).toBe(200);
    expect(response.body.total).toBe('449.97'); // $199.98 + $249.99
  });
});