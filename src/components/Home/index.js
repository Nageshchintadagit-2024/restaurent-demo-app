import {Component} from 'react'

import DishItem from '../DishItem'

import './index.css'

class Home extends Component {
  state = {tabsList: [], activeTabItem: '', dishesList: []}

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const filteredTabsList = data[0].table_menu_list.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nxtUrl: each.nxturl,
    }))

    const filteredDishesList = data[0].table_menu_list[0].category_dishes.map(
      dishItemDetails => ({
        addonCat: dishItemDetails.addonCat,
        dishAvailability: dishItemDetails.dish_Availability,
        dishCalories: dishItemDetails.dish_calories,
        dishCurrency: dishItemDetails.dish_currency,
        dishDescription: dishItemDetails.dish_description,
        dishId: dishItemDetails.dish_id,
        dishImage: dishItemDetails.dish_image,
        dishName: dishItemDetails.dish_name,
        dishPrice: dishItemDetails.dish_price,
        nxtUrl: dishItemDetails.nxturl,
      }),
    )
    this.setState({
      tabsList: filteredTabsList,
      activeTabItem: data[0].table_menu_list[0].menu_category_id,
      dishesList: filteredDishesList,
    })
  }

  onClickTabItem = id => {
    const {tabsList} = this.state
    const filteredList = tabsList.filter(
      eachObj => eachObj.menuCategoryId === id,
    )
    this.setState({
      activeTabItem: id,
      dishesList: filteredList[0].categoryDishes.map(dishItemDetails => ({
        addonCat: dishItemDetails.addonCat,
        dishAvailability: dishItemDetails.dish_Availability,
        dishCalories: dishItemDetails.dish_calories,
        dishCurrency: dishItemDetails.dish_currency,
        dishDescription: dishItemDetails.dish_description,
        dishId: dishItemDetails.dish_id,
        dishImage: dishItemDetails.dish_image,
        dishName: dishItemDetails.dish_name,
        dishPrice: dishItemDetails.dish_price,
        nxtUrl: dishItemDetails.nxturl,
      })),
    })
  }

  renderTabsList = () => {
    const {tabsList, activeTabItem} = this.state
    return (
      <ul className="tabs-container">
        {tabsList.map(eachTabObj => {
          const {menuCategoryId, menuCategory} = eachTabObj
          const clickedTabItem = () => {
            this.onClickTabItem(menuCategoryId)
          }
          const activeTabColor =
            activeTabItem === menuCategoryId ? 'active-tab-item' : ''
          return (
            <li
              className="tab-item"
              key={menuCategoryId}
              onClick={clickedTabItem}
            >
              <button
                type="button"
                className={`button-item  ${activeTabColor}`}
              >
                {menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderDishItems = () => {
    const {dishesList} = this.state
    return (
      <ul className="dishes-container">
        {dishesList.map(eachObj => (
          <DishItem dishDetails={eachObj} key={eachObj.dishId} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="home-container">
        {this.renderTabsList()}
        {this.renderDishItems()}
      </div>
    )
  }
}

export default Home
