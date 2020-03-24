import * as actionTypes from './actionTypes'

export const addOrderAction = newOrder => ({
  type: actionTypes.ADD_ORDER,
  newOrder
})

export const replaceCartAction = newCart => ({
  type: actionTypes.REPLACE_CART,
  newCart
})

export const addCustomerAction = newCustomer => ({
  type: actionTypes.ADD_CUSTOMER,
  newCustomer
})
