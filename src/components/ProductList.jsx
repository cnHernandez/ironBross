import { useRef } from 'react'
import { products, productsByCategory } from '../data/products'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'


function ProductList({ onSelectProduct, selectedCategory }) {
  const cardsRef = useRef({})

  let productsToShow = products
  if (selectedCategory) {
    if (selectedCategory === 'gold') {
      productsToShow = products.filter(p => p.brand && p.brand.toLowerCase() === 'gold')
    } else if (selectedCategory === 'xtrenght') {
      productsToShow = products.filter(p => p.brand && p.brand.toLowerCase() === 'xtrenght')
    } else if (selectedCategory === 'gentech') {
      productsToShow = products.filter(p => p.brand && p.brand.toLowerCase() === 'gentech')
    } else if (selectedCategory === 'pitbull') {
      productsToShow = products.filter(p => p.brand && p.brand.toLowerCase() === 'pitbull')
    } else if (selectedCategory === 'ena') {
      productsToShow = products.filter(p => p.brand && p.brand.toLowerCase() === 'ena')
    } else if (productsByCategory[selectedCategory]) {
      productsToShow = productsByCategory[selectedCategory]
    } else {
      productsToShow = []
    }
  }

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
