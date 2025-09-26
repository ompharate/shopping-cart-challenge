interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">
            🛍️ ShopEasy
          </h1>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            onClick={onCartClick}
          >
            <span>🛒</span>
            <span>Cart ({cartItemsCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};