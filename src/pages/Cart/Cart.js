import React from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import classes from './Cart.module.css'
export const Cart = ({ cart }) => {
  const isSomeItemsInCart = !!cart.length
  return (
    <Flex wrap="wrap" justify={isSomeItemsInCart ? 'space-between' : 'center'}>
      {isSomeItemsInCart ? (
        cart.map(product => (
          <Product isInCart key={product.id} product={product} />
        ))
      ) : (
        <h1 className={classes.heading}>Sorry, no items in cart :(</h1>
      )}
    </Flex>
  )
}
