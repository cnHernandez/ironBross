import { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const sendWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío')
      return
    }

    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n'
    
    cartItems.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`
    })
    
    message += `\n*Total: $${getTotalPrice().toFixed(2)}*`
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)
    
    // Reemplaza este número con tu número de WhatsApp en formato internacional sin + ni espacios
    const phoneNumber = '5491234567890' // Ejemplo: 549 (Argentina) + código de área + número
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="app">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setShowCart(!showCart)}
      />
      
      <main className="main-content">
        <ProductList onAddToCart={addToCart} />
        
        {showCart && (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={getTotalPrice()}
            onSendOrder={sendWhatsAppOrder}
            onClose={() => setShowCart(false)}
          />
        )}
      </main>
    </div>
  )
}

export default App
