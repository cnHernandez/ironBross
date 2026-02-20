import { useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import './styles/App.css'
import bannerIron from './assets/bannerIron.jpeg'
import categoriaCreatina from './assets/categoriaCreatina.png'
import categoriaPreentreno from './assets/categoriaPreentreno.png'
import categoriaProteina from './assets/categoriaProteina.png'
import categoriaMagnesio from './assets/categoriaMagnesio.png'
import categoriaAmino from './assets/categoriaAmino.png'
import categoriaColageno from './assets/categoriaColageno.png'
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
  const [viewType, setViewType] = useState(null) // 'brand' | 'category' | null
  const [activeFilter, setActiveFilter] = useState(null)
  const [filterResetKey, setFilterResetKey] = useState(0)

  const asset = (path) => `${import.meta.env.BASE_URL}${path}`

  const titleCase = (txt = '') => {
    if (!txt) return ''
    return String(txt)
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  const upperCase = (txt = '') => {
    if (!txt) return ''
    return String(txt).toUpperCase()
  }

  const getCategoryOrBrandLabel = (key) => {
    if (!key) return ''
    const k = String(key).toLowerCase()
    const brands = {
      'ena': 'ENA',
      'gold': 'Gold',
      'xtrenght': 'Xtrenght',
      'gentech': 'Gentech',
      'pitbull': 'Pitbull',
      'star nutrition': 'Star Nutrition'
    }
    const categories = {
      'creatinas': 'Creatinas',
      'pre-entrenos': 'Pre Entrenos',
      'aminoacidos': 'Aminoácidos',
      'proteinas-y-ganadores-de-peso': 'Proteínas y Ganadores',
      'magnesio-y-omega-3': 'Magnesio y Omega 3',
      'colagenos-y-resveratrol': 'Colágenos y Resveratrol',
      'vitaminas': 'Vitaminas'
    }
    if (brands[k]) return brands[k]
    if (categories[k]) return categories[k]
    return titleCase(key)
  }

  const brandKeyFromName = (name) => {
    if (!name) return null
    const n = String(name).toLowerCase()
    if (n.includes('gold')) return 'gold'
    if (n.includes('xtrenght') || n.includes('xtrenght')) return 'xtrenght'
    if (n.includes('gentech')) return 'gentech'
    if (n.includes('pitbull')) return 'pitbull'
    if (n.includes('ena')) return 'ena'
    // Star Nutrition is represented by null (showProducts + null => Star Nutrition)
    if (n.includes('star')) return null
    return n.replace(/\s+/g, '-')
  }

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

  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    if (typeof price !== 'string') return 0

    let s = price.replace(/\u00A0/g, ' ').trim()
    const match = s.match(/[-+]?\d{1,3}(?:[.,\s]\d{3})*(?:[.,]\d+)?|\d+/)
    if (!match) return 0
    let numStr = match[0]
    numStr = numStr.replace(/\s+/g, '')
    if (numStr.indexOf('.') !== -1 && numStr.indexOf(',') !== -1) {
      numStr = numStr.replace(/,/g, '')
    } else {
      numStr = numStr.replace(/(?<=\d)[.,](?=\d{3}\b)/g, '')
    }
    numStr = numStr.replace(/,/g, '')
    const n = Number(numStr)
    return isNaN(n) ? 0 : n
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0)
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
      const lineTotalNum = parsePrice(item.price) * item.quantity
      const lineTotal = lineTotalNum.toLocaleString('es-AR')
      message += `• ${item.name} x${item.quantity} - $ ${lineTotal}\n`
    })

    const totalFormatted = getTotalPrice().toLocaleString('es-AR')
    message += `\n*Total: $ ${totalFormatted}*`
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)
    
    // Número de WhatsApp configurado para enviar pedidos (formato internacional sin + ni espacios)
    const phoneNumber = '5491166493737'
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Breadcrumb helpers
  const rootLabelUpper = upperCase(viewType === 'brand' ? 'marca' : 'categoria')

  const computeBreadcrumbParts = () => {
    let categoryLabel = ''
    let brandLabel = ''

    if (viewType === 'category') {
      categoryLabel = getCategoryOrBrandLabel(selectedCategory)
      if (activeFilter && activeFilter.type === 'brand') brandLabel = getCategoryOrBrandLabel(activeFilter.key)
    } else if (viewType === 'brand') {
      // brand view: selectedCategory might hold a brand key (except for Star Nutrition where it's null)
      if (selectedCategory) brandLabel = getCategoryOrBrandLabel(selectedCategory)
      else if (activeFilter && activeFilter.type === 'brand') brandLabel = getCategoryOrBrandLabel(activeFilter.key)
      else brandLabel = getCategoryOrBrandLabel('star nutrition')

      if (activeFilter && activeFilter.type === 'category') categoryLabel = getCategoryOrBrandLabel(activeFilter.key)
    }

    return { categoryLabel, brandLabel }
  }

  return (
    <div className="app">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setShowCart(!showCart)}
        onProductSelect={(product) => {
          setSelectedCategory(null)
          setShowProducts(false)
            setViewType(null)
          handleSelectProduct(product)
        }}
          onLogoClick={() => { setSelectedCategory(null); setSelectedProduct(null); setShowProducts(false); setViewType(null); }}
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
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('aminoacidos'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaAmino} alt="Aminoácidos" className="categoria-img" />
                </div>
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('creatinas'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaCreatina} alt="Creatina" className="categoria-img" />
                </div>
              </div>
              <div className="categoria-row">
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('pre-entrenos'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaPreentreno} alt="Pre Entrenos" className="categoria-img" />
                </div>
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('proteinas-y-ganadores-de-peso'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaProteina} alt="Proteína" className="categoria-img" />
                </div>
              </div>
              <div className="categoria-row">
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('colagenos-y-resveratrol'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaColageno} alt="Colágeno" className="categoria-img" />
                </div>
                <div className="categoria-tile" onClick={() => { setShowProducts(true); setSelectedCategory('magnesio-y-omega-3'); setSelectedProduct(null); setViewType('category'); }}>
                  <img src={categoriaMagnesio} alt="Magnesio y Omega 3" className="categoria-img" />
                </div>
              </div>
            </div>
          </section>
          <section className="marcas-section">
            <div className="marcas-strip">
              <div className="marcas-label">NUESTRAS MARCAS:</div>
              <div className="marcas-logos">
                <img
                  src={enaAmarillo}
                  alt="ENA"
                  className="marca-logo"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('ena')
                    setViewType('brand')
                    setSelectedProduct(null)
                  }}
                />
                <img
                  src={starNutrition}
                  alt="Star Nutrition"
                  className="marca-logo"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory(null)
                    setViewType('brand')
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
                    setViewType('brand')
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
                    setViewType('brand')
                    setSelectedProduct(null)
                  }}
                />
                
                <div
                  className="marca-logo-frame"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory('pitbull')
                    setViewType('brand')
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
                    setViewType('brand')
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
              <a className="cta-amarilla__icon-wrapper" href="https://www.instagram.com/ironbrosnutrition/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
            <span className="breadcrumb-link" onClick={() => setSelectedProduct(null)} style={{cursor:'pointer', color:'#FFD700'}}>{upperCase('buscador')}</span>
            <span className="breadcrumb-sep"> &gt; </span>
            {selectedProduct.brand ? (
              <>
                <span
                  className="breadcrumb-link"
                  style={{cursor:'pointer', color:'#FFD700'}}
                  onClick={() => {
                    setShowProducts(true)
                    setSelectedCategory(brandKeyFromName(selectedProduct.brand))
                    setViewType('brand')
                    setSelectedProduct(null)
                  }}
                >
                  {upperCase(getCategoryOrBrandLabel(selectedProduct.brand))}
                </span>
                <span className="breadcrumb-sep"> &gt; </span>
              </>
            ) : null}
            <span className="breadcrumb-actual">{upperCase(selectedProduct.name)}</span>
          </div>
        )}
        {!showProducts && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setSelectedProduct(null)}
          />
        )}
        {showProducts && (() => {
          const { categoryLabel, brandLabel } = computeBreadcrumbParts()
          if (selectedProduct) {
            return (
              <>
                <div className="breadcrumb-categorias">
                  <span
                    className="breadcrumb-link"
                    onClick={() => { setShowProducts(false); setSelectedProduct(null); setSelectedCategory(null); setViewType(null); setActiveFilter(null); }}
                    style={{cursor:'pointer', color:'#FFD700'}}>
                    {rootLabelUpper}
                  </span>
                  {viewType === 'category' ? (
                    <>
                      <span className="breadcrumb-sep"> &gt; </span>
                      <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setSelectedProduct(null) }}>{upperCase(categoryLabel)}</span>
                      {brandLabel && (
                        <>
                          <span className="breadcrumb-sep"> &gt; </span>
                          <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setSelectedProduct(null) }}>{upperCase(brandLabel)}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="breadcrumb-sep"> &gt; </span>
                      <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setSelectedProduct(null) }}>{upperCase(brandLabel)}</span>
                      {categoryLabel && (
                        <>
                          <span className="breadcrumb-sep"> &gt; </span>
                          <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setSelectedProduct(null) }}>{upperCase(categoryLabel)}</span>
                        </>
                      )}
                    </>
                  )}
                  <span className="breadcrumb-sep"> &gt; </span>
                  <span className="breadcrumb-actual">{upperCase(selectedProduct.name)}</span>
                </div>
                <ProductDetail
                  product={selectedProduct}
                  onAddToCart={addToCart}
                  onBack={() => setSelectedProduct(null)}
                />
              </>
            )
          }

          return (
            <>
              <div className="breadcrumb-categorias">
                <span
                  className="breadcrumb-link"
                  onClick={() => { setShowProducts(false); setSelectedProduct(null); setSelectedCategory(null); setViewType(null); setActiveFilter(null); }}
                  style={{cursor:'pointer', color:'#FFD700'}}>
                  {rootLabelUpper}
                </span>
                {viewType === 'category' ? (
                  <>
                    <span className="breadcrumb-sep"> &gt; </span>
                    {brandLabel ? (
                      <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setActiveFilter(null); setFilterResetKey(k => k + 1) }}>{upperCase(categoryLabel)}</span>
                    ) : (
                      <span className="breadcrumb-actual">{upperCase(categoryLabel)}</span>
                    )}
                    {brandLabel && (
                      <>
                        <span className="breadcrumb-sep"> &gt; </span>
                        <span className="breadcrumb-actual">{upperCase(brandLabel)}</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span className="breadcrumb-sep"> &gt; </span>
                    {categoryLabel ? (
                      <span className="breadcrumb-link" style={{cursor:'pointer', color:'#FFD700'}} onClick={() => { setActiveFilter(null); setFilterResetKey(k => k + 1) }}>{upperCase(brandLabel)}</span>
                    ) : (
                      <span className="breadcrumb-actual">{upperCase(brandLabel)}</span>
                    )}
                    {categoryLabel && (
                      <>
                        <span className="breadcrumb-sep"> &gt; </span>
                        <span className="breadcrumb-actual">{upperCase(categoryLabel)}</span>
                      </>
                    )}
                  </>
                )}
              </div>
              <section className="products-page">
                <ProductList
                  onSelectProduct={handleSelectProduct}
                  selectedCategory={selectedCategory}
                  viewType={viewType}
                  onSetFilter={(f) => setActiveFilter(f)}
                  filterResetKey={filterResetKey}
                />
              </section>
            </>
          )
        })()}
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
      href="https://wa.me/5491166493737"
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
