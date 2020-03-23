import * as actionTypes from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PRODUCTS:
      return action.products
    case actionTypes.ADD_NEW_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}
