import {useState, useEffect} from 'react'
import {GrSquare} from 'react-icons/gr'
import './index.css'

const FoodItem = ({
  item,
  onIncreaseButton,
  onDecreaseButton,
  activeCategory,
  addToCart,
}) => {
  const {
    availability,
    calories,
    currency,
    description,
    id,
    image,
    name,
    price,
    categoryId,
    addonCat,
  } = item

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (activeCategory === 'Salads and Soup') {
      setQuantity(0)
    }
  }, [activeCategory])

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
    onIncreaseButton(id)
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1)
      onDecreaseButton(id)
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(item, quantity)
    }
  }

  const isCustomizable = addonCat?.some(each =>
    each.addons.some(addon => addon.dishCategoryId === categoryId),
  )

  const itemAvailability = availability ? 'available' : 'unavailable'

  return (
    <div className="card-container" key={id}>
      <div className="card-item-details">
        <div className="card-name-availability-container">
          <GrSquare className={`availability ${itemAvailability}`} />
          <div>
            <h1 className="dish-name">{name}</h1>
            <p className="price">
              {currency} {price}
            </p>
          </div>
        </div>
        <p className="description">{description}</p>

        {availability && (
          <>
            <div className="cart-quantity-container">
              {activeCategory === categoryId && (
                <div className="button">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    data-testid={`minus-${id}`}
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <p className="cart-quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    data-testid={`plus-${id}`}
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            {quantity > 0 && (
              <button
                type="button"
                className="button add-to-cart-btn"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            )}
          </>
        )}
        {isCustomizable && (
          <p className="customizations">Customizations available</p>
        )}
        {!availability && <p className="unavailable">Not available</p>}
      </div>
      <h1 className="calories">{calories} calories</h1>
      <img src={image} alt={name} className="image" />
    </div>
  )
}

export default FoodItem
