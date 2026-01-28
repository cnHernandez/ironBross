import './ProductCard.css'


function ProductCard({ product, onAddToCart, refEl }) {
  return (
    <div className="product-card" ref={refEl} id={`product-card-${product.id}`}>
      <div className="product-image">
        {product.imageType === 'url' ? (
          <img src={product.image} alt={product.name} className="product-img" />
        ) : (
          <span className="product-emoji">{product.emoji || product.image}</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
