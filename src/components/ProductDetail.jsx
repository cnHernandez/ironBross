import '../styles/ProductDetail.css'

const FALLBACK_IMG = `${import.meta.env.BASE_URL}images/placeholder.svg`

const buildImageCandidates = (url = '') => {
  const candidates = []
  if (url) candidates.push(url)
  const stripped = url.replace('ironProducts/starNutrition/', '')
  if (stripped && stripped !== url) candidates.push(stripped)
  return candidates
}

function ProductDetail({ product, onAddToCart, onBack }) {
  if (!product) return null

  const numericPrice = typeof product.price === 'number' ? product.price : 0
  const displayPrice = product.priceLabel || `$ ${numericPrice.toLocaleString('es-AR')}`
  const imageCandidates = buildImageCandidates(product.image)

  return (
    <section className="product-detail">
      <div className="product-detail__content">
        <div className="product-detail__image">
          {product.imageType === 'emoji' ? (
            <span className="product-detail__emoji">{product.emoji || product.image}</span>
          ) : (
            <img
              src={imageCandidates[0] || FALLBACK_IMG}
              alt={product.name}
              className="product-detail__img"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget
                const current = Number(el.dataset.fallbackIndex || '0')
                const nextIndex = current + 1
                if (imageCandidates[nextIndex]) {
                  el.dataset.fallbackIndex = String(nextIndex)
                  el.src = imageCandidates[nextIndex]
                } else {
                  el.onerror = null
                  el.src = FALLBACK_IMG
                }
              }}
            />
          )}
        </div>
        <div className="product-detail__info">
          <h2 className="product-detail__name">{product.name}</h2>
          <span className="product-detail__price">{displayPrice}</span>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__actions">
            <button
              className="product-detail__cta"
              onClick={() => onAddToCart?.(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
