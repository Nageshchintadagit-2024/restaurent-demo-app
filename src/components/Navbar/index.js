import {Component} from 'react'

import './index.css'

import AddingContext from '../../context/AddingContext'

class Navbar extends Component {
  render() {
    const {restaurentName} = this.props
    console.log(restaurentName)
    return (
      <AddingContext.Consumer>
        {value => {
          const {cartList} = value
          const cartListLength = cartList.length
          return (
            <div className="header">
              <nav className="header-container">
                <h1 className="heading">{restaurentName}</h1>
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
