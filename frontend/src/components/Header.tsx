interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🛍️ ShopEasy</h1>
        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart ({cartItemsCount})
        </button>
      </div>
    </header>
  );
};