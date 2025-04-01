import React from 'react'

const AddingContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
})

export default AddingContext
