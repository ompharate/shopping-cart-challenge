import { useState, useEffect } from 'react'
import type { CartItem, Product } from './types'
import { ProductGrid } from './components/ProductGrid'
import { Header } from './components/Header'
import { Cart } from './components/Cart'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const App = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/products`)
        const data = await response.json()
        
        if (data.success) {
          setProducts(data.data)
        } else {
          setError('Failed to load products')
        }
      } catch (err) {
        setError('Failed to connect to server')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevCart, { productId, quantity: 1 }]
      }
    })
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const product = products.find(p => p.id === cartItem.productId)
      return total + (product ? product.price * cartItem.quantity : 0)
    }, 0)
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Order placed successfully! Order ID: ${data.orderId}\nTotal: $${data.total}`)
        clearCart()
        setIsCartOpen(false)
      } else {
        alert('Failed to place order: ' + data.message)
      }
    } catch (err) {
      alert('Failed to place order. Please try again.')
      console.error('Checkout error:', err)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Make sure the backend server is running on http://localhost:5000</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header
        cartItemsCount={getCartItemsCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="main-content">
        <h1>Our Products</h1>
        <ProductGrid products={products} onAddToCart={addToCart} />
      </main>

      {isCartOpen && (
        <Cart
          cart={cart}
          products={products}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateCartItemQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          total={getCartTotal()}
        />
      )}
    </div>
  )
}
