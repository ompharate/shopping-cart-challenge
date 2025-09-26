import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Product+Image';
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 hover:shadow-md hover:cursor-pointer"
                onClick={() => onAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};