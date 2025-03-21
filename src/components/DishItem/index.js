import {Component} from 'react'

import './index.css'

import {IoMdAdd} from 'react-icons/io'
import {FaMinus} from 'react-icons/fa'

import AddingContext from '../../context/AddingContext'

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
    const {dishDetails} = this.props
    const {quantity} = this.state

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
      addonCat.length > 0 && 'Customizations Avaliable'
    return (
      <AddingContext.Consumer>
        {value => {
          const {
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            addCartItem,
          } = value

          const add = () => {
            this.incrementQuantity()
            incrementCartItemQuantity(dishId)
            addCartItem({...dishDetails, quantity})
          }

          const sub = () => {
            this.decrementQuantity()
            decrementCartItemQuantity(dishId)
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
                      <FaMinus size={28} />
                    </button>
                    <button type="button" className="count-button">
                      {quantity - 1}
                    </button>
                    <button
                      type="button"
                      className="adding-button"
                      onClick={add}
                    >
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
