import { useState, useRef } from 'react'
import ProductCard from './ProductCard'
import './ProductList.css'

// Productos de ejemplo
// NOTA: Puedes reemplazar las URLs de las imágenes con rutas a archivos locales
// Por ejemplo: import producto1 from '../assets/products/producto1.jpg'
// Y luego usar: image: producto1
const sampleProducts = [
  {
    id: 1,
    name: 'Proteína Whey 1kg',
    price: 45.99,
    image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Proteina+Whey',
    imageType: 'url', // 'url' o 'emoji'
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

function ProductList({ onAddToCart, selectedProduct, selectedCategory }) {
  const [products] = useState(sampleProducts)
  const cardsRef = useRef({})

  // Definir categorías para los productos
  const categoryMap = {
    creatina: [2, 4, 5], // Creatina, BCAA, Glutamina
    performance: [3, 6, 8], // Pre-Entreno, Omega 3, Barras
    proteina: [1], // Proteína Whey
    vitaminas: [7], // Multivitamínico
  }

  let productsToShow = []
  if (selectedProduct) {
    productsToShow = [selectedProduct]
  } else if (selectedCategory && categoryMap[selectedCategory]) {
    productsToShow = products.filter(p => categoryMap[selectedCategory].includes(p.id))
  }

  return (
    <section className="product-list">
      <div className="products-grid">
        {productsToShow.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            refEl={el => (cardsRef.current[product.id] = el)}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductList
