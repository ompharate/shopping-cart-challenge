# 🛒 E-Commerce Shopping Cart

A modern, full-stack e-commerce shopping cart application built with React 19, TypeScript, and Node.js. Features a clean, responsive design with persistent cart functionality and comprehensive testing.

## ✨ Features

### Frontend Features
- **Product Catalog**: Browse through a curated list of products with images, prices, and descriptions
- **Shopping Cart**: Add, remove, and update product quantities with real-time calculations
- **Persistent Cart**: Cart data persists across browser sessions using localStorage
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **React Context**: Global state management for cart functionality
- **Type Safety**: Full TypeScript implementation for robust development

### Backend Features
- **RESTful API**: Clean API endpoints for products and order processing
- **Product Management**: Retrieve all products or individual product details
- **Order Processing**: Handle checkout operations with validation
## 🚀 Technologies Used

### Frontend Stack
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management for cart functionality

### Backend Stack
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **Jest** - Testing framework for both frontend and backend
- **Supertest** - HTTP assertion library for API testing


## 📁 Project Structure

```
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Custom middleware
│   │   ├── data/           # Mock data and types
│   │   ├── tests/          # Test suites
│   │   └── types/          # TypeScript type 
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── assets/         # Static assets
│   │   └── types.ts        # TypeScript interfaces
│   └── package.json
└── README.md
```

## 🏃‍♂️ How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Environment Variables
Create a `.env` file in the frontend directory if you need to customize the API base URL:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🧪 How to Run Test Cases

### Backend Tests
Run the complete test suite for the backend:
```bash
cd backend
npm test
```

### Test Coverage
The backend includes comprehensive tests for:
- **Product API endpoints** - Get all products, get product by ID
- **Order processing** - Checkout validation and error handling
- **Error scenarios** - Invalid requests and server errors

### Sample Test Output
```
✅ Products API
  ✓ GET /api/products - should return all products
  ✓ GET /api/products/:id - should return specific product
  ✓ GET /api/products/:id - should handle invalid product ID

✅ Checkout API  
  ✓ POST /api/orders/checkout - should process valid order
  ✓ POST /api/orders/checkout - should validate required fields
  ✓ POST /api/orders/checkout - should handle empty cart

Test Suites: 2 passed, 2 total
Tests: 8 passed, 8 total
```

## 🔗 Live Links

- **Live Demo**: [Live Demo](https://shopping-cart-challenge-v1.vercel.app/)
- **Portfolio**: [ompharate.me](https://ompharate.me)
- **GitHub Repository**: [shopping-cart-challenge](https://github.com/ompharate/shopping-cart-challenge)
- **Loom Recording Video**: [Video]()

## 🎯 API Endpoints

### Products
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve specific product by ID

### Orders
- `POST /api/orders/checkout` - Process cart checkout

### Example API Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 99.99,
      "image": "/images/headphones.jpg",
      "description": "High-quality wireless headphones with noise cancellation"
    }
  ]
}
```