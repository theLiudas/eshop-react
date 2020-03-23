import * as actionTypes from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.REPLACE_CUSTOMERS:
      return action.newCustomers
    case actionTypes.ADD_CUSTOMER:
      return [...state, action.newCustomer]
    default:
      return state
  }
}
