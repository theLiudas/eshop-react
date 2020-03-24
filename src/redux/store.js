import cartReducer from './reducer-cart'
import productsReducer from './reducer-products'
import customersReducer from './reducer-customers'
import ordersReducer from './reducer-orders'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  customers: customersReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
