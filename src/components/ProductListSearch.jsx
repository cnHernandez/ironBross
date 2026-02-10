import { useState } from 'react'
import { products } from '../data/products'
import '../styles/ProductList.css'

function ProductListSearch({ onProductSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectProduct = (product) => {
    setSearchTerm('')
    setShowDropdown(false)
    if (onProductSelect) onProductSelect(product)
  }

  return (
    <div className="search-container" style={{ position: 'relative', margin: 0 }}>
      <input
        type="text"
        className="search-input"
        placeholder="¿Qué producto buscas?"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
          setShowDropdown(e.target.value.length > 0)
        }}
        onFocus={() => setShowDropdown(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />
      <span className="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7"></circle>
          <line x1="21" y1="21" x2="15" y2="15"></line>
        </svg>
      </span>
      {showDropdown && filteredProducts.length > 0 && (
        <ul className="search-dropdown">
          {filteredProducts.map(product => (
            <li
              key={product.id}
              className="search-dropdown-item"
              onMouseDown={() => handleSelectProduct(product)}
            >
              <span className="dropdown-thumb">
                {product.imageType === 'url' ? (
                  <img src={product.image} alt={product.name} className="dropdown-thumb-img" />
                ) : (
                  <span className="dropdown-thumb-emoji">{product.emoji || product.image}</span>
                )}
              </span>
              <span className="dropdown-thumb-name">{product.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProductListSearch
