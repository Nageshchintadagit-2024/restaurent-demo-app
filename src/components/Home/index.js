import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import DishItem from '../DishItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',

  success: 'SUCCESS',

  failure: 'FAILURE',

  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    response: [],
    activeTabItem: '',
    dishesList: [],
    restaurentName: '',
    isLoading: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getDetails()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = this.getUpdatedData(data[0].table_menu_list)
      this.setState({
        response: updatedData,
        activeTabItem: updatedData[0].menuCategoryId,
        dishesList: updatedData[0].categoryDishes,
        restaurentName: data[0].restaurant_name,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTabItem = id => {
    const {response} = this.state
    const filteredData = response.filter(each => each.menuCategoryId === id)
    this.setState({
      activeTabItem: id,
      dishesList: filteredData[0].categoryDishes,
    })
  }

  renderTabsList = () => {
    const {response, activeTabItem} = this.state
    return (
      <ul className="tabs-container">
        {response.map(eachTabObj => {
          const {menuCategoryId, menuCategory} = eachTabObj
          const clickedTabItem = () => {
            this.onClickTabItem(menuCategoryId)
          }
          const activeTabColor =
            activeTabItem === menuCategoryId ? 'active-tab-item' : ''
          return (
            <li className="tab-item" key={menuCategoryId}>
              <button
                type="button"
                className={`button-item  ${activeTabColor}`}
                onClick={clickedTabItem}
              >
                {menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <h1>Try Again after some time</h1>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height="50px" width="50px" color="blue" />
    </div>
  )

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

  renderDetails = () => {
    const {restaurentName, isLoading} = this.state
    return (
      <>
        <Navbar restaurentName={restaurentName} />
        <div className="home-container">
          {this.renderTabsList()}
          {this.renderDishItems()}
        </div>
      </>
    )
  }

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderResults()}</>
  }
}

export default Home
