import { random } from 'faker'
import {
  addOrderAction,
  replaceCartAction,
  addCustomerAction
} from './actionCreators'

export const initiateCheckout = (customerData, setIsCheckout) => async (
  dispatch,
  getState
) => {
  const { cart } = getState()
  const newCustomer = { id: random.uuid(), ...customerData }

  const newOrder = {
    id: random.uuid(),
    products: cart.map(cartItem => cartItem.id),
    sum: cart.reduce(
      (lastReturnOfReduce, currentArrayItem) =>
        lastReturnOfReduce +
        currentArrayItem.price * currentArrayItem.cartQuantity,
      0
    ),
    customerId: newCustomer.id,
    orderDate: new Date().getTime()
  }
  await dispatch(createOrder(newOrder))
  await dispatch(createCustomer(newCustomer))

  setIsCheckout(false)
  dispatch(replaceCartAction([]))
}

export const createOrder = newOrder => async dispatch => {
  try {
    const orderResponse = await fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cors: true
      },
      body: JSON.stringify(newOrder)
    })
    const orderData = await orderResponse.json()
    dispatch(addOrderAction(orderData))
  } catch (err) {
    console.log('order response failed with following message:', err)
  }
}

export const createCustomer = newCustomer => async dispatch => {
  try {
    const customerResponse = await fetch('http://localhost:4000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cors: true
      },
      body: JSON.stringify(newCustomer)
    })
    const customerData = await customerResponse.json()
    dispatch(addCustomerAction(customerData))
  } catch (err) {
    console.log('customer response failed with following message:', err)
  }
}
