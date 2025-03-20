import {Component} from 'react'

import './index.css'

import AddingContext from '../../context/AddingContext'

class Navbar extends Component {
  render() {
    return (
      <AddingContext.Consumer>
        {value => {
          const {cartList} = value
          const cartListLength = cartList.length
          return (
            <div className="header">
              <nav className="header-container">
                <h1 className="heading">UNI Resto cafe</h1>
                <div className="cart-container">
                  <p className="my-orders">My Orders</p>
                  <div className="cart-icon">
                    🛒
                    <span className="cart-badge">{cartListLength}</span>
                  </div>
                </div>
              </nav>
            </div>
          )
        }}
      </AddingContext.Consumer>
    )
  }
}

export default Navbar
