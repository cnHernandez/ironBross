import { useRef, useState, useEffect } from 'react'
import { products, productsByCategory } from '../data/products'
import ProductCard from './ProductCard'
import '../styles/ProductList.css'


function ProductList({ onSelectProduct, selectedCategory, viewType, onSetFilter, filterResetKey }) {
  const cardsRef = useRef({})
  const [brandFilter, setBrandFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    setBrandFilter('all')
    setCategoryFilter('all')
  }, [selectedCategory, filterResetKey])

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

  // Detect if the selectedCategory is actually a brand key
  const brandKeys = ['gold', 'xtrenght', 'gentech', 'pitbull', 'ena', 'star nutrition']
  const isBrandView = (selectedCategory && brandKeys.includes(selectedCategory)) || (viewType === 'brand' && !selectedCategory)

  // Precompute available category slugs for a brand view
  const brandKey = selectedCategory || (viewType === 'brand' ? 'star nutrition' : null)
  const brandProductsForSlug = brandKey ? products.filter(p => p.brand && p.brand.toLowerCase() === brandKey) : []
  const availableCategorySlugsForBrand = Array.from(new Set(brandProductsForSlug.map(p => p.categorySlug)))

  // If we're viewing a brand (including Star Nutrition when selectedCategory is null),
  // show only that brand's products first, then apply filters on that subset.
  if (isBrandView) {
    productsToShow = brandProductsForSlug
  }

  if (brandFilter && brandFilter !== 'all') {
    productsToShow = productsToShow.filter(p => p.brand && p.brand.toLowerCase() === brandFilter)
  }

  // If viewing a brand, filter by selected category filter (categories available for that brand)
  if (isBrandView && categoryFilter && categoryFilter !== 'all') {
    productsToShow = productsToShow.filter(p => p.categorySlug === categoryFilter)
  }

  // Precompute available brands for a category view
  const availableBrandsForCategory = (categoryProducts || []).map(p => (p.brand || '').toLowerCase())

  // notify parent about active filter (for breadcrumb)
  const notifyParentFilter = (filter) => {
    if (typeof onSetFilter === 'function') onSetFilter(filter)
  }

  useEffect(() => {
    if (brandFilter && brandFilter !== 'all') {
      notifyParentFilter({ type: 'brand', key: brandFilter })
    } else if (categoryFilter && categoryFilter !== 'all') {
      notifyParentFilter({ type: 'category', key: categoryFilter })
    } else {
      notifyParentFilter(null)
    }
  }, [brandFilter, categoryFilter])

  return (
    <section className="product-list">
          {categoryProducts && (
            <div className="brand-filters brands">
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

          {/* Mobile filter button (visible only on small screens via CSS) */}
          <button
            className="filter-button"
            onClick={() => setMobileFilterOpen(true)}
            aria-label="Abrir filtros"
          >
            {isBrandView ? 'Filtrar por CATEGORÍAS' : 'Filtrar por MARCAS'}
          </button>

          {isBrandView && (
            <div className="brand-filters categories">
              <label className="brand-filters__label">CATEGORÍAS: </label>
              <div className="brand-filters__options fixed-brands">
                <label className="brand-filter">
                  <input type="radio" name="category-filter" value="all" checked={categoryFilter === 'all'} onChange={() => setCategoryFilter('all')} />
                  <span>Todos</span>
                </label>
                {availableCategorySlugsForBrand.map(slug => {
                  const sample = productsByCategory[slug] && productsByCategory[slug][0]
                  const label = sample ? (sample.category || slug.replace(/-/g, ' ')) : slug.replace(/-/g, ' ')
                  return (
                    <label className="brand-filter" key={slug}>
                      <input type="radio" name="category-filter" value={slug} checked={categoryFilter === slug} onChange={() => setCategoryFilter(slug)} />
                      <span>{String(label).toUpperCase()}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* Mobile filter modal */}
          {mobileFilterOpen && (
            <div className="filter-modal" role="dialog" aria-modal="true">
              <div className="filter-modal__overlay" onClick={() => setMobileFilterOpen(false)} />
              <div className="filter-modal__content">
                <div className="filter-modal__options">
                  {isBrandView ? (
                    <>
                      <label className="brand-filter">
                        <input type="radio" name="mobile-category-filter" value="all" checked={categoryFilter === 'all'} onChange={() => { setCategoryFilter('all'); setMobileFilterOpen(false) }} />
                        <span>Todos</span>
                      </label>
                      {availableCategorySlugsForBrand.map(slug => {
                        const sample = productsByCategory[slug] && productsByCategory[slug][0]
                        const label = sample ? (sample.category || slug.replace(/-/g, ' ')) : slug.replace(/-/g, ' ')
                        return (
                          <label className="brand-filter" key={slug}>
                            <input type="radio" name="mobile-category-filter" value={slug} checked={categoryFilter === slug} onChange={() => { setCategoryFilter(slug); setMobileFilterOpen(false) }} />
                            <span>{String(label).toUpperCase()}</span>
                          </label>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <label className="brand-filter">
                        <input type="radio" name="mobile-brand-filter" value="all" checked={brandFilter === 'all'} onChange={() => { setBrandFilter('all'); setMobileFilterOpen(false) }} />
                        <span>Todos</span>
                      </label>
                      {['star nutrition', 'gold', 'xtrenght', 'pitbull', 'ena'].map(key => {
                        if (!availableBrandsForCategory.includes(key)) return null
                        const label = key === 'star nutrition' ? 'STAR NUTRITION' : key.toUpperCase()
                        return (
                          <label className="brand-filter" key={key}>
                            <input type="radio" name="mobile-brand-filter" value={key} checked={brandFilter === key} onChange={() => { setBrandFilter(key); setMobileFilterOpen(false) }} />
                            <span>{label}</span>
                          </label>
                        )
                      })}
                    </>
                  )}
                </div>
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
