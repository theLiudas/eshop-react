import React from 'react'
import classes from './Product.module.css'
import { Button } from '../shared/Button/Button'
import { Flex } from '../shared/Flex/Flex'

export const Product = ({ product, test }) => {
  const { image, name, description, price, quantity } = product
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'

  const addToCartHandler = () => {
    console.log(product.id)
    // we'll perform code which adds product to cart
  }

  return (
    <div className={classes.product}>
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.productName}>{name}</div>
      <div className={classes.shortDescription}>{shortDescription}</div>
      <div className={classes.bold}>Price: {price}€</div>
      <div className={classes.bold}>Quantity: {quantity}</div>
      <div className={classes.buttonList}>
        <Flex justify="center">
          <Button onClick={addToCartHandler}>Add to cart</Button>
          <Button type="secondary" test={test}>
            Preview
          </Button>
        </Flex>
      </div>
    </div>
  )
}
