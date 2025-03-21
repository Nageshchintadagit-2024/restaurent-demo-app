import {Component} from 'react'

import Navbar from './components/Navbar'

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
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dishId === id) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.dishId === id) {
          const updatedQuantity = eachItem.quantity - 1
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
          cartList,
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
