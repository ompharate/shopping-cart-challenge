# E-Commerce Site - Om Verto Challenge

A minimal e-commerce site built with Node.js/Express backend and React frontend to demonstrate product listing and shopping cart functionality.

## Features

### Core Features ✅
- **Backend:**
  - API endpoint that returns a hardcoded JSON list of products (8 items with id, name, price, imageUrl, and description)
  - API endpoint that accepts cart items and logs orders to console, returning success message
  
- **Frontend:**
  - Product grid displaying fetched products
  - "Add to Cart" functionality for each product
  - Client-side cart state management
  - Cart modal showing items, quantities, and total price
  - Checkout button that sends cart data to backend

### Bonus Features ✨
- **Quantity Management:** Users can change item quantities in the cart
- **LocalStorage Persistence:** Cart contents persist across page refreshes
- **Backend Tests:** Jest test cases for the /products endpoint
- **Responsive Design:** Mobile-friendly layout

## Tech Stack

### Backend
- **Node.js** with **Express**
- **TypeScript**
- **CORS** for cross-origin requests
- **Jest** & **Supertest** for testing

### Frontend
- **React 19** with **TypeScript**
- **Vite** for build tooling
- **CSS3** for styling
- **LocalStorage** for cart persistence

## Project Structure

```
om-verto-challenge/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Main server file with API endpoints
│   │   └── tests/
│   │       └── products.test.ts  # Test cases for products endpoint
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx    # Navigation header with cart button
│   │   │   ├── ProductGrid.tsx   # Product listing grid
│   │   │   └── Cart.tsx      # Shopping cart modal
│   │   ├── App.tsx           # Main app component
│   │   ├── App.css           # Styling
│   │   ├── types.ts          # TypeScript interfaces
│   │   └── main.tsx          # App entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## API Endpoints

### GET /api/products
Returns a list of all products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 99.99,
      "imageUrl": "https://...",
      "description": "Premium wireless headphones..."
    }
  ]
}
```

### POST /api/checkout
Processes a checkout request with cart items.

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "orderId": "ORD-1234567890",
  "total": "199.98"
}
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd om-verto-challenge
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend will start on http://localhost:5000

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will start on http://localhost:5173

### Running Tests

**Backend Tests:**
```bash
cd backend
npm test
```

## Usage

1. **Browse Products:** View the product grid on the homepage
2. **Add to Cart:** Click "Add to Cart" on any product
3. **View Cart:** Click the cart button in the header to open the cart modal
4. **Manage Quantities:** Use +/- buttons to adjust item quantities or remove items
5. **Checkout:** Click "Checkout" to submit the order (logs to backend console)

## Key Implementation Details

### State Management
- Cart state is managed in the main App component
- Cart data is automatically saved to localStorage
- Cart persists across browser sessions

### Error Handling
- Frontend displays error messages if backend is unavailable
- Image fallbacks for broken product images
- Form validation for checkout

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layout that adapts to screen size
- Touch-friendly interface elements

### Performance
- Efficient re-renders using proper React patterns
- Optimized images with fallbacks
- Minimal API calls with proper error handling

## Development Notes

### Code Quality
- Clear separation between frontend and backend
- Well-defined API structure
- TypeScript for type safety
- Modular component architecture
- Comprehensive error handling

### Testing
- Backend API tests using Jest and Supertest
- Tests cover endpoint functionality and data structure validation

## Future Enhancements
- User authentication
- Product categories and filtering
- Real database integration
- Payment processing
- Order history
- Product reviews and ratings