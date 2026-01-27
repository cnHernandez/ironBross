import './Header.css'
import logo from '../assets/logo-ironBross.jpeg'

function Header({ cartItemsCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Iron Bross Shop" className="logo" />
        
        <nav className="nav">
          <a href="#productos" className="nav-link">Productos</a>
          <a href="#ofertas" className="nav-link">Ofertas</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>

        <button className="cart-button" onClick={onCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
