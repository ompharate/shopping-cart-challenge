import type { Product, CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  products: Product[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  total: number;
}

export const Cart = ({
  cart,
  products,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  total,
}: CartProps) => {
  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="cart-content">
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((cartItem) => {
              const product = getProductById(cartItem.productId);
              if (!product) return null;

              return (
                <div key={cartItem.productId} className="cart-item">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Product';
                    }}
                  />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <p className="cart-item-price">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(cartItem.productId, cartItem.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{cartItem.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(cartItem.productId, cartItem.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(cartItem.productId)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ${(product.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="cart-footer">
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={onCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};