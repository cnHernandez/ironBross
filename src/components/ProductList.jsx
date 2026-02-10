import { useRef } from 'react'
import { products, productsByCategory } from '../data/products'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'

function ProductList({ onSelectProduct, selectedCategory }) {
  const cardsRef = useRef({})

  const productsToShow = selectedCategory
    ? productsByCategory[selectedCategory] || []
    : products

  return (
    <section className="product-list">
      <div className="products-grid">
        {productsToShow.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            refEl={el => (cardsRef.current[product.id] = el)}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList
