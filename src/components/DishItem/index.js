import AddingContext from '../../context/AddingContext'

import {Component} from 'react'

import './index.css'

import {IoMdAdd} from 'react-icons/io'
import {FaMinus} from 'react-icons/fa'

class DishItem extends Component {
  state = {quantity: 1}

  incrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    const {dishItemDetails} = this.props
    const {quantity} = this.state
    const {
      addonCat,
      dish_Availability,
      dish_Type,
      dish_calories,
      dish_currency,
      dish_description,
      dish_id,
      dish_image,
      dish_name,
      dish_price,
      nexturl,
    } = dishItemDetails

    const customizationsAvailability =
      addonCat.length > 0 && 'Customizations Avaliable'
    return (
      <AddingContext.Consumer>
        {value => {
          const {
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            addCartItem,
          } = value

          const add = dish_id => {
            this.incrementQuantity()
            incrementCartItemQuantity(dish_id)
            addCartItem({...dishItemDetails, quantity})
          }

          const sub = dish_id => {
            this.decrementQuantity()
            decrementCartItemQuantity(dish_id)
          }

          return (
            <li className="dish-item">
              <div className="dish-details-container">
                <h1 className="dish-name">{dish_name}</h1>
                <p className="dish-price">
                  {dish_currency} {dish_price}
                </p>
                <p className="description">{dish_description}</p>
                {dish_Availability ? (
                  <div className="buttons-container">
                    <button className="adding-button" onClick={sub}>
                      <FaMinus size={28} />
                    </button>
                    <button className="count-button">{quantity - 1}</button>
                    <button className="adding-button" onClick={add}>
                      <IoMdAdd size={28} />
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
                <p className="calories-text">{dish_calories} calories</p>
                <img src={dish_image} alt={dish_name} className="image" />
              </div>
            </li>
          )
        }}
      </AddingContext.Consumer>
    )
  }
}

export default DishItem
