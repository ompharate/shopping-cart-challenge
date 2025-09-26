import request from 'supertest';
import createApp from '../app';

const app = createApp();

describe('GET /api/products', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should return products with correct structure', async () => {
    const response = await request(app).get('/api/products');
    
    const product = response.body.data[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('imageUrl');
    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.imageUrl).toBe('string');
  });

  it('should return products with valid data', async () => {
    const response = await request(app).get('/api/products');
    
    const product = response.body.data[0];
    expect(product.id).toBe(1);
    expect(product.name).toBe("Wireless Headphones");
    expect(product.price).toBe(99.99);
    expect(product.imageUrl).toContain('unsplash.com');
  });
});