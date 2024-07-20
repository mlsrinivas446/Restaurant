import {createContext, useState, useContext} from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  const addCartItem = (item, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + quantity}
            : cartItem,
        )
      }
      return [...prevItems, {...item, quantity}]
    })
    setCartCount(prevCount => prevCount + quantity)
  }

  const removeCartItem = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    setCartCount(prevCount => prevCount - 1)
  }

  const incrementCartItemQuantity = id => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
    setCartCount(prevCount => prevCount + 1)
  }

  const decrementCartItemQuantity = id => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 0,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    )
    setCartCount(prevCount => prevCount - 1)
  }

  const removeAllCartItems = () => {
    setCartItems([])
    setCartCount(0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
