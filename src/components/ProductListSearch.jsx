import { useState } from 'react'
import './ProductList.css'

const sampleProducts = [
  {
    id: 1,
    name: 'Proteína Whey 1kg',
    price: 45.99,
    image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Proteina+Whey',
    imageType: 'url',
    emoji: '🥤',
    description: 'Proteína de suero de alta calidad'
  },
  {
    id: 2,
    name: 'Creatina Monohidratada',
    price: 29.99,
    image: 'https://via.placeholder.com/400x400/764ba2/ffffff?text=Creatina',
    imageType: 'url',
    emoji: '💪',
    description: 'Aumenta fuerza y rendimiento'
  },
  {
    id: 3,
    name: 'Pre-Entreno Explosivo',
    price: 35.99,
    image: 'https://via.placeholder.com/400x400/f093fb/ffffff?text=Pre-Entreno',
    imageType: 'url',
    emoji: '⚡',
    description: 'Máxima energía para tus entrenamientos'
  },
  {
    id: 4,
    name: 'BCAA 2:1:1',
    price: 32.99,
    image: 'https://via.placeholder.com/400x400/4facfe/ffffff?text=BCAA',
    imageType: 'url',
    emoji: '🔥',
    description: 'Aminoácidos ramificados esenciales'
  },
  {
    id: 5,
    name: 'Glutamina 500g',
    price: 24.99,
    image: 'https://via.placeholder.com/400x400/00f2fe/ffffff?text=Glutamina',
    imageType: 'url',
    emoji: '💊',
    description: 'Recuperación muscular óptima'
  },
  {
    id: 6,
    name: 'Omega 3 Fish Oil',
    price: 19.99,
    image: 'https://via.placeholder.com/400x400/43e97b/ffffff?text=Omega+3',
    imageType: 'url',
    emoji: '🐟',
    description: 'Salud cardiovascular y articular'
  },
  {
    id: 7,
    name: 'Multivitamínico Completo',
    price: 27.99,
    image: 'https://via.placeholder.com/400x400/ffdd59/ffffff?text=Multivitaminico',
    imageType: 'url',
    emoji: '🌟',
    description: 'Vitaminas y minerales esenciales'
  },
  {
    id: 8,
    name: 'Barras Proteicas x12',
    price: 22.99,
    image: 'https://via.placeholder.com/400x400/ff6b6b/ffffff?text=Barras+Proteicas',
    imageType: 'url',
    emoji: '🍫',
    description: 'Snack proteico delicioso'
  }
]

function ProductListSearch({ onProductSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const filteredProducts = sampleProducts.filter(product =>
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
