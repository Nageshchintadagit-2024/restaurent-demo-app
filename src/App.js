import {Component} from 'react'

import Navbar from './components/Navbar'

import Home from './components/Home'

import AddingContext from './context/AddingContext'

import './App.css'

//write your code here

class App extends Component {
  state = {cartList: []}

  addCartItem = product => {
    const {cartList} = this.state
    if (cartList.find(eachProduct => eachProduct.dish_id === product.dish_id)) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (eachProduct.dish_id === product.dish_id) {
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
        cartList: [...prevState.cartList, product],
      }))
    }

  }
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dish_id === id) {
          const updatedQuantity = quantity + 1
          return {...eachItem, updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dish_id === id) {
          const updatedQuantity = quantity - 1
          return {...eachItem, updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <AddingContext.Provider
        value={{
          cartList: cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Navbar />
        <Home />
      </AddingContext.Provider>
    )
  }
}

export default App
