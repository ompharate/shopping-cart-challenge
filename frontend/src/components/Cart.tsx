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
    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button 
              className="text-gray-400 hover:text-gray-600 text-2xl font-light hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors" 
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button 
            className="text-gray-400 hover:text-gray-600 text-2xl font-light hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {cart.map((cartItem) => {
              const product = getProductById(cartItem.productId);
              if (!product) return null;

              return (
                <div key={cartItem.productId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Product';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
                        onClick={() => onUpdateQuantity(cartItem.productId, cartItem.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
                        onClick={() => onUpdateQuantity(cartItem.productId, cartItem.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-700 text-xs font-medium"
                      onClick={() => onRemoveItem(cartItem.productId)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">
                      ${(product.price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-gray-200 bg-gray-50 p-6 rounded-b-xl">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Total: ${total.toFixed(2)}</h3>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Continue Shopping
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};