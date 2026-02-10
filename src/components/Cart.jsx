import '../styles/Cart.css'

const FALLBACK_IMG = `${import.meta.env.BASE_URL}images/placeholder.svg`

const buildImageCandidates = (url = '') => {
  const candidates = []
  if (url) candidates.push(url)
  const stripped = url.replace('ironProducts/starNutrition/', '')
  if (stripped && stripped !== url) candidates.push(stripped)
  return candidates
}

const getDisplayPrice = (item) => {
  const numeric = typeof item.price === 'number' ? item.price : 0
  return item.priceLabel || `$${numeric.toFixed(2)}`
}

const getNumericPrice = (item) => (typeof item.price === 'number' ? item.price : 0)

function Cart({ items, onUpdateQuantity, onRemoveItem, totalPrice, onSendOrder, onClose }) {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>
            <svg className="cart-header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Carrito de Compras
          </h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>El carrito está vacío</p>
            <p className="empty-cart-subtitle">¡Agrega algunos productos!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.imageType === 'url' ? (
                      <img
                        src={buildImageCandidates(item.image)[0] || FALLBACK_IMG}
                        alt={item.name}
                        className="cart-img"
                        loading="lazy"
                        onError={(e) => {
                          const candidates = buildImageCandidates(item.image)
                          const el = e.currentTarget
                          const current = Number(el.dataset.fallbackIndex || '0')
                          const nextIndex = current + 1
                          if (candidates[nextIndex]) {
                            el.dataset.fallbackIndex = String(nextIndex)
                            el.src = candidates[nextIndex]
                          } else {
                            el.onerror = null
                            el.src = FALLBACK_IMG
                          }
                        }}
                      />
                    ) : (
                      <span>{item.emoji || item.image}</span>
                    )}
                  </div>
                  
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{getDisplayPrice(item)}</p>
                  </div>

                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    ${(getNumericPrice(item) * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">${totalPrice.toFixed(2)}</span>
              </div>

              <button className="whatsapp-btn" onClick={onSendOrder}>
                <svg className="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
