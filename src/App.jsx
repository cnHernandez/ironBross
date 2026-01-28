import { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'
import creatinaCategoria from './assets/creatinaCategoria.png'
import performanceCategoria from './assets/performanceCategoria.png'
import proteinaCategoria from './assets/proteinaCategoria.png'
import vitaminaCategoria from './assets/vitaminaCategoria.png'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

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
        onProductSelect={setSelectedProduct}
        onLogoClick={() => { setSelectedCategory(null); setSelectedProduct(null); }}
      />
      <main className="main-content">
        {(!selectedCategory && !selectedProduct) && (
          <>
          <section className="categorias-principales">
            <h2 className="categorias-titulo">
              EXPLORÁ NUESTRAS CATEGORÍAS PRINCIPALES:
            </h2>
            <div className="categorias-grid">
              <div className="categoria-row">
                <img src={creatinaCategoria} alt="Creatina" className="categoria-img" style={{cursor:'pointer'}} onClick={() => { setSelectedCategory('creatina'); setSelectedProduct(null); }} />
                <img src={performanceCategoria} alt="Performance" className="categoria-img" style={{cursor:'pointer'}} onClick={() => { setSelectedCategory('performance'); setSelectedProduct(null); }} />
              </div>
              <div className="categoria-row">
                <img src={proteinaCategoria} alt="Proteína" className="categoria-img" style={{cursor:'pointer'}} onClick={() => { setSelectedCategory('proteina'); setSelectedProduct(null); }} />
                <img src={vitaminaCategoria} alt="Vitaminas" className="categoria-img" style={{cursor:'pointer'}} onClick={() => { setSelectedCategory('vitaminas'); setSelectedProduct(null); }} />
              </div>
            </div>
          </section>
          <section className="motivacional">
            <h3 className="motivacional-titulo">Estar en forma. Lucir poderoso.</h3>
            <p className="motivacional-desc">
              Descubrí cómo los suplementos deportivos pueden mejorar tu rendimiento. Aprendé cómo la proteína en polvo, los energizantes pre-entreno y los recuperadores post-entreno pueden ayudarte a alcanzar tus objetivos de entrenamiento y mejorar tu salud en general.
            </p>
          </section>
          <div className="video-container">
            <video
              src="/videoGim.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100vw', maxWidth: '100vw', display: 'block', background: '#000' }}
            />
          </div>
          </>
        )}
        {(selectedCategory && !selectedProduct) && (
          <div className="breadcrumb-categorias">
            <span className="breadcrumb-link" onClick={() => setSelectedCategory(null)} style={{cursor:'pointer', color:'#FFD700'}}>categorías</span>
            <span> &gt; </span>
            <span className="breadcrumb-actual">
              {selectedCategory === 'creatina' && 'Creatina'}
              {selectedCategory === 'performance' && 'Performance'}
              {selectedCategory === 'proteina' && 'Proteína'}
              {selectedCategory === 'vitaminas' && 'Vitaminas'}
            </span>
          </div>
        )}
        {(selectedProduct && !selectedCategory) && (
          <div className="breadcrumb-categorias">
            <span className="breadcrumb-link" onClick={() => setSelectedProduct(null)} style={{cursor:'pointer', color:'#FFD700'}}>buscador</span>
            <span> &gt; </span>
            <span className="breadcrumb-actual">{selectedProduct.name}</span>
          </div>
        )}
        <ProductList onAddToCart={addToCart} selectedProduct={selectedProduct} selectedCategory={selectedCategory} />
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

    {/* Icono flotante de WhatsApp */}
    <a
      href="https://wa.me/5491234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
      style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, background: 'transparent' }}
    >
      <img src="/images/iconWhat.png" alt="WhatsApp" style={{ width: 60, height: 60, objectFit: 'contain', display: 'block' }} />
    </a>
  </div>
 )
}

export default App
