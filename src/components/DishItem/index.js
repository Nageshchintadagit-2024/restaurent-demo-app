import {Component} from 'react'

import './index.css'

import AddingContext from '../../context/AddingContext'

class DishItem extends Component {
  render() {
    const {dishDetails} = this.props

    const {
      addonCat,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishId,
      dishImage,
      dishName,
      dishPrice,
    } = dishDetails

    const customizationsAvailability =
      addonCat.length > 0 && 'Customizations available'
    return (
      <AddingContext.Consumer>
        {value => {
          const {addCartItem, removeCartItem, cartList} = value

          const getQuantity = () => {
            const cartItem = cartList.find(item => item.dishId === dishId)
            return cartItem ? cartItem.quantity : 0
          }

          const add = () => {
            addCartItem(dishDetails)
          }

          const sub = () => {
            removeCartItem(dishDetails)
          }

          return (
            <li className="dish-item">
              <div className="dish-details-container">
                <h1 className="dish-name">{dishName}</h1>
                <p className="dish-price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="buttons-container">
                    <button
                      type="button"
                      className="adding-button"
                      onClick={sub}
                    >
                      -
                    </button>
                    <p type="button" className="count-button">
                      {getQuantity()}
                    </p>
                    <button
                      type="button"
                      className="adding-button"
                      onClick={add}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available-status">Not Available</p>
                )}
                <p className="customizations-text">
                  {customizationsAvailability}
                </p>
              </div>
              <div className="image-container">
                <p className="calories-text">{dishCalories} calories</p>
                <img src={dishImage} alt={dishName} className="image" />
              </div>
            </li>
          )
        }}
      </AddingContext.Consumer>
    )
  }
}

export default DishItem
