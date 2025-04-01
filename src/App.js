import {Component} from 'react'

import Home from './components/Home'

import AddingContext from './context/AddingContext'

import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  addCartItem = product => {
    const {cartList} = this.state
    if (cartList.find(eachProduct => eachProduct.dishId === product.dishId)) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.dishId === product.dishId) {
            return {
              ...eachProduct,
              quantity: eachProduct.quantity + 1,
            }
          }
          return eachProduct
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...product, quantity: 1}],
      }))
    }
  }

  removeCartItem = dish => {
    const {cartList} = this.state
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(each => {
            if (each.dishId === dish.dishId) {
              return {...each, quantity: each.quantity - 1}
            }
            return each
          })
          .filter(each => each.quantity > 0),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <AddingContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Home />
      </AddingContext.Provider>
    )
  }
}

export default App
