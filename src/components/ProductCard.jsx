import '../styles/ProductCard.css'

const FALLBACK_IMG = `${import.meta.env.BASE_URL}images/placeholder.svg`

const buildImageCandidates = (url = '') => {
  const candidates = []
  if (url) candidates.push(url)
  const stripped = url.replace('ironProducts/starNutrition/', '')
  if (stripped && stripped !== url) candidates.push(stripped)
  return candidates
}

function ProductCard({ product, onSelect, refEl }) {
  const numericPrice = typeof product.price === 'number' ? product.price : 0
  const displayPrice = product.priceLabel || `$${numericPrice.toFixed(2)}`
  const imageCandidates = buildImageCandidates(product.image)

  return (
    <div
      className="product-card"
      ref={refEl}
      id={`product-card-${product.id}`}
      onClick={() => onSelect?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(product)
        }
      }}
    >
      <div className="product-image">
        {product.imageType === 'emoji' ? (
          <span className="product-emoji">{product.emoji || product.image}</span>
        ) : (
          <img
            src={imageCandidates[0] || FALLBACK_IMG}
            alt={product.name}
            className="product-img"
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
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-price">{displayPrice}</span>
      </div>
    </div>
  )
}

export default ProductCard
