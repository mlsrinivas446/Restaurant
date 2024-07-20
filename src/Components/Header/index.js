import Cookies from 'js-cookie'
import {useHistory, Link} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import {useCart} from '../../contexts/CartContext'

import './index.css'

const Header = () => {
  const {cartCount} = useCart()
  const history = useHistory()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header-container">
      <Link to="/" className="logo">
        <div>UNI Resto Cafe</div>
      </Link>

      <nav className="nav">
        <div className="header-cart-container">
          <button
            type="button"
            data-testid="cart"
            onClick={() => history.push('/cart')}
            className="cart-button"
          >
            <p>My Orders</p>
            <FaShoppingCart className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
