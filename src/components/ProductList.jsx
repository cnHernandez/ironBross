import { useRef, useState, useEffect } from 'react'
import { products, productsByCategory } from '../data/products'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'


function ProductList({ onSelectProduct, selectedCategory }) {
  const cardsRef = useRef({})
  const [brandFilter, setBrandFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    setBrandFilter('all')
    setCategoryFilter('all')
  }, [selectedCategory])

  let productsToShow = products
  let categoryProducts = null
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
      categoryProducts = productsByCategory[selectedCategory]
      productsToShow = categoryProducts
    } else {
      productsToShow = []
    }
  }

  if (brandFilter && brandFilter !== 'all') {
    productsToShow = productsToShow.filter(p => p.brand && p.brand.toLowerCase() === brandFilter)
  }

  // Detect if the selectedCategory is actually a brand key
  const brandKeys = ['gold', 'xtrenght', 'gentech', 'pitbull', 'ena', 'star nutrition']
  const isBrandView = selectedCategory && brandKeys.includes(selectedCategory)

  // If viewing a brand, filter by selected category filter (categories available for that brand)
  if (isBrandView && categoryFilter && categoryFilter !== 'all') {
    productsToShow = productsToShow.filter(p => p.categorySlug === categoryFilter)
  }

  return (
    <section className="product-list">
          {categoryProducts && (
            <div className="brand-filters">
              <label className="brand-filters__label">MARCAS: </label>
              <div className="brand-filters__options fixed-brands">
                <label className="brand-filter">
                  <input type="radio" name="brand-filter" value="all" checked={brandFilter === 'all'} onChange={() => setBrandFilter('all')} />
                  <span>Todos</span>
                </label>
                {(() => {
                  // calcular marcas presentes en esta categoría, mantener orden fijo
                  const present = new Set((categoryProducts || []).map(p => (p.brand || '').toLowerCase()))
                  const order = ['star nutrition', 'gold', 'xtrenght', 'pitbull', 'ena']
                  return order.map(key => {
                    if (!present.has(key)) return null
                    const label = key === 'star nutrition' ? 'STAR NUTRITION' : key.toUpperCase()
                    return (
                      <label className="brand-filter" key={key}>
                        <input type="radio" name="brand-filter" value={key} checked={brandFilter === key} onChange={() => setBrandFilter(key)} />
                        <span>{label}</span>
                      </label>
                    )
                  })
                })()}
              </div>
            </div>
          )}

          {isBrandView && (
            <div className="brand-filters">
              <label className="brand-filters__label">CATEGORÍAS: </label>
              <div className="brand-filters__options fixed-brands">
                <label className="brand-filter">
                  <input type="radio" name="category-filter" value="all" checked={categoryFilter === 'all'} onChange={() => setCategoryFilter('all')} />
                  <span>Todos</span>
                </label>
                {(() => {
                  // calcular categorías que tienen productos para la marca seleccionada
                  const brandProducts = products.filter(p => p.brand && p.brand.toLowerCase() === selectedCategory)
                  const availableSlugs = Array.from(new Set(brandProducts.map(p => p.categorySlug)))
                  return availableSlugs.map(slug => {
                    const sample = productsByCategory[slug] && productsByCategory[slug][0]
                    const label = sample ? (sample.category || slug.replace(/-/g, ' ')) : slug.replace(/-/g, ' ')
                    return (
                      <label className="brand-filter" key={slug}>
                        <input type="radio" name="category-filter" value={slug} checked={categoryFilter === slug} onChange={() => setCategoryFilter(slug)} />
                        <span>{String(label).toUpperCase()}</span>
                      </label>
                    )
                  })
                })()}
              </div>
            </div>
          )}
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
