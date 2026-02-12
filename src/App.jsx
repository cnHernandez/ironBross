import { useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import './styles/App.css'
import bannerIron from './assets/bannerIron.jpeg'
import creatinaCategoria from './assets/creatinaCategoria.png'
import performanceCategoria from './assets/performanceCategoria.png'
import proteinaCategoria from './assets/proteinaCategoria.png'
import vitaminaCategoria from './assets/vitaminaCategoria.png'
import enaAmarillo from './assets/enaAmarillo.png'
import starNutrition from './assets/starNutrition.png'
import xtreinght from './assets/xtreinght.png'
import pitbull from './assets/pitbull.png'
import gentech from './assets/gentech.png'
import gold from './assets/gold.png'
import instagramIcon from './assets/instagram.png'
import mailIcon from './assets/mail.png'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showProducts, setShowProducts] = useState(false)

  const asset = (path) => `${import.meta.env.BASE_URL}${path}`

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

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setShowCart(false)
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
        onProductSelect={(product) => {
          setSelectedCategory(null)
          setShowProducts(false)
          handleSelectProduct(product)
        }}
        onLogoClick={() => { setSelectedCategory(null); setSelectedProduct(null); setShowProducts(false); }}
      />
      {/* Sección de título pegada al header */}
      {(!showProducts && !selectedCategory && !selectedProduct) && (
        <>
          <section className="hero-banner">
            <img src={bannerIron} alt="Banner Iron Bross" className="hero-banner__img" />
          </section>
          <section className="titulo-categorias-principales">
            <h2>EXPLORÁ NUESTRAS CATEGORÍAS PRINCIPALES:</h2>
          </section>
        </>
      )}
      <main className="main-content">
        {(!showProducts && !selectedCategory && !selectedProduct) && (
          <>
          <section className="categorias-principales">
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
          <section className="marcas-section">
            <div className="marcas-strip">
              <div className="marcas-label">NUESTRAS MARCAS:</div>
              <div className="marcas-logos">
                <img src={enaAmarillo} alt="ENA" className="marca-logo" />
                <img
                  src={starNutrition}
                  alt="Star Nutrition"
                  className="marca-logo"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory(null)
                    setSelectedProduct(null)
                  }}
                />
                <img
                  src={gold}
                  alt="Gold"
                  className="marca-logo"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('gold')
                    setSelectedProduct(null)
                  }}
                />
                <img
                  src={xtreinght}
                  alt="XtReinght"
                  className="marca-logo"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('xtrenght')
                    setSelectedProduct(null)
                  }}
                />
                
                <div
                  className="marca-logo-frame"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('pitbull')
                    setSelectedProduct(null)
                  }}
                >
                  <img src={pitbull} alt="Pitbull" className="marca-logo-pitbull" />
                </div>
                <img
                  src={gentech}
                  alt="Gentech"
                  className="marca-logo marca-logo-gentech"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('gentech')
                    setSelectedProduct(null)
                  }}
                />
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
              src={asset('videoGim.mp4')}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100vw', maxWidth: '100vw', display: 'block', background: '#000' }}
            />
          </div>
          <section className="cta-amarilla">
            <div className="cta-amarilla__icons">
              <a className="cta-amarilla__icon-wrapper" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img className="cta-amarilla__icon" src={instagramIcon} alt="Instagram" />
              </a>
              <a className="cta-amarilla__icon-wrapper" href="mailto:tuemail@dominio.com" aria-label="Email">
                <img className="cta-amarilla__icon" src={mailIcon} alt="Email" />
              </a>
            </div>
          </section>
          </>
        )}
        {/* Breadcrumb gestionado más abajo para evitar duplicados */}
        {/* El breadcrumb para producto ya se muestra en el bloque de showProducts && selectedProduct más abajo, así que aquí lo eliminamos para evitar duplicados. */}
        {!showProducts && (selectedProduct && !selectedCategory) && (
          <div className="breadcrumb-categorias">
            <span className="breadcrumb-link" onClick={() => setSelectedProduct(null)} style={{cursor:'pointer', color:'#FFD700'}}>buscador</span>
            <span className="breadcrumb-sep"> &gt; </span>
            <span className="breadcrumb-actual">{selectedProduct.name}</span>
          </div>
        )}
        {!showProducts && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setSelectedProduct(null)}
          />
        )}
        {showProducts && (
          selectedProduct ? (
            <>
              {/* Breadcrumb para producto seleccionado desde marca o categoría */}
              <div className="breadcrumb-categorias">
                <span
                  className="breadcrumb-link"
                  onClick={() => { setShowProducts(false); setSelectedProduct(null); setSelectedCategory(null); }}
                  style={{cursor:'pointer', color:'#FFD700'}}>
                  inicio
                </span>
                {selectedCategory === 'gold' || selectedCategory === 'star nutrition' || selectedCategory === 'xtrenght' || selectedCategory === 'gentech' || selectedCategory === 'pitbull' ? (
                  <>
                    <span className="breadcrumb-sep"> &gt; </span>
                    <span
                      className="breadcrumb-link"
                      onClick={() => setSelectedProduct(null)}
                      style={{cursor:'pointer', color:'#FFD700'}}>
                      {selectedCategory === 'gold' ? 'Gold' : selectedCategory === 'star nutrition' ? 'Star Nutrition' : selectedCategory === 'xtrenght' ? 'Xtrenght' : selectedCategory === 'gentech' ? 'Gentech' : 'Pitbull'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="breadcrumb-sep"> &gt; </span>
                    <span
                      className="breadcrumb-link"
                      onClick={() => setSelectedProduct(null)}
                      style={{cursor:'pointer', color:'#FFD700'}}>
                      {selectedCategory === 'creatina' && 'Creatina'}
                      {selectedCategory === 'performance' && 'Performance'}
                      {selectedCategory === 'proteina' && 'Proteína'}
                      {selectedCategory === 'vitaminas' && 'Vitaminas'}
                    </span>
                  </>
                )}
                <span className="breadcrumb-sep"> &gt; </span>
                <span className="breadcrumb-actual">{selectedProduct.name}</span>
              </div>
              <ProductDetail
                product={selectedProduct}
                onAddToCart={addToCart}
                onBack={() => setSelectedProduct(null)}
              />
            </>
          ) : (
            <>
              <div className="breadcrumb-categorias">
                <span
                  className="breadcrumb-link"
                  onClick={() => { setShowProducts(false); setSelectedProduct(null); setSelectedCategory(null); }}
                  style={{cursor:'pointer', color:'#FFD700'}}>
                  inicio
                </span>
                <span className="breadcrumb-sep"> &gt; </span>
                <span className="breadcrumb-actual">{selectedCategory === 'gold' ? 'Gold' : selectedCategory === 'xtrenght' ? 'Xtrenght' : selectedCategory === 'gentech' ? 'Gentech' : selectedCategory === 'pitbull' ? 'Pitbull' : 'Star Nutrition'}</span>
              </div>
              <section className="products-page">
                <ProductList
                  onSelectProduct={handleSelectProduct}
                  selectedCategory={selectedCategory}
                />
              </section>
            </>
          )
        )}
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
    >
      <img src={asset('images/iconWhat.png')} alt="WhatsApp" className="whatsapp-float__img" />
    </a>
  </div>
 )
}

export default App
