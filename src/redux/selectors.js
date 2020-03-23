// Selectors related to products
export const getProducts = state => state.products
export const getPorduct = (state, productId) =>
  state.products.find(product => product.id === productId)

// Selectors related to cart
export const getCart = state => state.cart

// Selectors related to order
export const getOrders = state => state.orders

// Selectors related to customers
export const getCustomers = state => state.customers
