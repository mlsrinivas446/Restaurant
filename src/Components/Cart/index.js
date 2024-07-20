import Header from '../Header'
import {useCart} from '../../contexts/CartContext'
import './index.css'

const Cart = () => {
  const {
    cartItems,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeAllCartItems,
  } = useCart()

  const handleQuantityChange = (id, quantity) => {
    const currentItem = cartItems.find(item => item.id === id)
    if (quantity > (currentItem?.quantity || 0)) {
      incrementCartItemQuantity(id)
    } else if (quantity > 0) {
      decrementCartItemQuantity(id)
    } else {
      removeCartItem(id)
    }
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-btn"
            >
              Remove All
            </button>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">
                      {item.currency} {item.price}
                    </p>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => handleQuantityChange(item.id)}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.id)}
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
