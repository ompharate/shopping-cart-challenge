import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            }}
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            <div className="product-price">${product.price.toFixed(2)}</div>
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};