import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {heading, quantity} = props
  return (
    <div className="header-container">
      <h1 className="header">{heading}</h1>
      <div className="cart-container">
        <p className="my-order">My Orders</p>
        <div className="cart-count-container">
          <IoCartOutline className="cart-Icon" />
          <p className="cart-count" id="cart-count" aria-label="cart count">
            {quantity}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Header
