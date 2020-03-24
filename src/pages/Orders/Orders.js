import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, getCustomers, getProducts } from '../../redux/selectors'

export const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(getOrders)
  const products = useSelector(getProducts)
  const customers = useSelector(getCustomers)

  useEffect(() => {
    const fetchData = async () => {
      const ordersResponse = await fetch('http://localhost:4000/orders')
      const newOrders = await ordersResponse.json()
      const customersResponse = await fetch('http://localhost:4000/customers')
      const newCustomers = await customersResponse.json()

      dispatch({ type: 'REPLACE_ORDERS', newOrders })
      dispatch({ type: 'REPLACE_CUSTOMERS', newCustomers })
    }
    fetchData()
  }, [])

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Order date</th>
          <th>Products</th>
          <th>Sum €</th>
          <th>Customer name</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          const date = new Date(order.orderDate)
          const dateToShow = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
          const orderProducts = products.filter(product =>
            order.products.some(orderProduct => orderProduct === product.id)
          )
          const customerName =
            customers.find(customer => {
              console.log(customer.id)
              console.log(order.customerId)
              return customer.id === order.customerId
            }) || {}

          return (
            <tr key={order.id}>
              <td>{dateToShow}</td>
              <td>{orderProducts.map(product => product.name).join(';')}</td>
              <td>{order.sum}</td>
              <td>{customerName.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
