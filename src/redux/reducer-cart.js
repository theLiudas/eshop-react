import * as actionTypes from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return [...state, action.newCartItem]
    case actionTypes.REPLACE_CART:
      return action.newCart
    case actionTypes.REMOVE_FROM_CART:
      return state.filter(cartItem => cartItem.id !== action.id)
    default:
      return state
  }
}
