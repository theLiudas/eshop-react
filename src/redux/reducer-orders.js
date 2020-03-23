import * as actionTypes from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.REPLACE_ORDERS:
      return action.newOrders
    case actionTypes.ADD_ORDER:
      return [...state, action.newOrder]
    default:
      return state
  }
}
