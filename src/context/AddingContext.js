import React from 'react'

const AddingContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default AddingContext
