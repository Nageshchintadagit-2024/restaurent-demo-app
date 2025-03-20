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
    this.setState({
      tabsList: data[0].table_menu_list,
      activeTabItem: data[0].table_menu_list[0].menu_category_id,
      dishesList: data[0].table_menu_list[0].category_dishes,
    })
  }

  onClickTabItem = id => {
    const {tabsList} = this.state
    const filteredList = tabsList.filter(
      eachObj => eachObj.menu_category_id === id,
    )
    this.setState({
      activeTabItem: id,
      dishesList: filteredList[0].category_dishes,
    })
  }

  renderTabsList = () => {
    const {tabsList, activeTabItem} = this.state
    return (
      <ul className="tabs-container">
        {tabsList.map(eachTabObj => {
          const {menu_category_id, menu_category} = eachTabObj
          const clickedTabItem = () => {
            this.onClickTabItem(menu_category_id)
          }
          const activeTabColor =
            activeTabItem === menu_category_id ? 'active-tab-item' : ''
          return (
            <li
              className="tab-item"
              key={menu_category_id}
              onClick={clickedTabItem}
            >
              <button className={`button-item  ${activeTabColor}`}>
                {menu_category}
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
          <DishItem dishItemDetails={eachObj} key={eachObj.dish_id} />
        ))}
      </ul>
    )
  }

  render() {
    const {tabsList, activeTabItem, dishesList} = this.state

    return (
      <div className="home-container">
        {this.renderTabsList()}
        {this.renderDishItems()}
      </div>
    )
  }
}

export default Home
