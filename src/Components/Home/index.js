import React, {Component} from 'react'
import Header from '../Header'
import FoodItem from '../FoodItem'
import './index.css'

class Home extends Component {
  state = {
    branchDetails: {},
    dishList: [],
    menuList: [],
    selectedMenuCategory: '',
    cartCount: 0,
    quantities: {},
  }

  componentDidMount() {
    this.fetchMenuDetails()
  }

  fetchMenuDetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()

        const branchDetails = {
          name: data[0].branch_name,
          nextUrl: data[0].nexturl,
          id: data[0].restaurant_id,
          image: data[0].restaurant_image,
          restaurantName: data[0].restaurant_name,
          tableId: data[0].table_id,
        }

        const menuList = data[0].table_menu_list.map(item => ({
          category: item.menu_category,
          categoryId: item.menu_category_id,
          categoryImage: item.menu_category_image,
          nextUrl: item.nexturl,
        }))

        const dishList = data[0].table_menu_list.flatMap(item =>
          item.category_dishes.map(each => ({
            addonCat: each.addonCat.map(addon => ({
              addonCategory: addon.addon_category,
              addonCategoryId: addon.addon_category_id,
              addonSelection: addon.addon_selection,
              addons: addon.addons.map(add => ({
                dishAvailability: add.dish_Availability,
                dishType: add.dish_Type,
                dishCalories: add.dish_calories,
                dishCurrency: add.dish_currency,
                dishDescription: add.dish_description,
                dishId: add.dish_id,
                dishImage: add.dish_image,
                dishName: add.dish_name,
                dishPrice: add.dish_price,
                dishCategoryId: item.menu_category_id,
              })),
            })),
            availability: each.dish_Availability,
            type: each.dish_Type,
            calories: each.dish_calories,
            currency: each.dish_currency,
            description: each.dish_description,
            id: each.dish_id,
            image: each.dish_image,
            name: each.dish_name,
            price: each.dish_price,
            nextUrl: each.nexturl,
            categoryId: item.menu_category_id,
          })),
        )

        this.setState({
          branchDetails,
          dishList,
          menuList,
          selectedMenuCategory: menuList[0]?.categoryId || '',
          quantities: dishList.reduce((acc, dish) => {
            acc[dish.id] = 0
            return acc
          }, {}),
        })
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  setSelectedMenuCategory = categoryId => {
    this.setState({selectedMenuCategory: categoryId})
  }

  onIncreaseButton = id => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount + 1,
      quantities: {
        ...prevState.quantities,
        [id]: prevState.quantities[id] + 1,
      },
    }))
  }

  onDecreaseButton = id => {
    this.setState(prevState => ({
      cartCount: prevState.cartCount > 0 ? prevState.cartCount - 1 : 0,
      quantities: {
        ...prevState.quantities,
        [id]: prevState.quantities[id] > 0 ? prevState.quantities[id] - 1 : 0,
      },
    }))
  }

  render() {
    const {
      branchDetails,
      menuList,
      selectedMenuCategory,
      dishList,
      cartCount,
      quantities,
    } = this.state

    const filteredDishes = dishList.filter(
      dish => dish.categoryId === selectedMenuCategory,
    )

    return (
      <div className="home-container">
        <Header heading={branchDetails.restaurantName} quantity={cartCount} />
        <ul className="menu-list">
          {menuList.map(each => (
            <button
              type="button"
              key={each.categoryId}
              className={`menu-button ${
                selectedMenuCategory === each.categoryId ? 'selected' : ''
              }`}
              onClick={() => this.setSelectedMenuCategory(each.categoryId)}
            >
              <li className="menu-item">{each.category}</li>
            </button>
          ))}
        </ul>
        <ul className="menu-container">
          {filteredDishes.map(each => (
            <FoodItem
              key={each.id}
              item={each}
              quantity={quantities[each.id]}
              onIncreaseButton={() => this.onIncreaseButton(each.id)}
              onDecreaseButton={() => this.onDecreaseButton(each.id)}
              activeCategory={selectedMenuCategory}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
