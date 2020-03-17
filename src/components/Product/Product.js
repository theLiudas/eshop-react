import React, { useEffect, useState } from 'react'
import classes from './Product.module.css'
import { Button } from '../shared/Button/Button'
import { Flex } from '../shared/Flex/Flex'

export const Product = ({ product, cart, setCart, isInCart }) => {
  const [isAddToCartDisabled, setIsAddToCartDisabled] = useState(false)
  const { image, name, description, price, quantity, id } = product
  const shortDescription =
    (description || '')
      .split(' ')
      .splice(0, 20)
      .join(' ') + '...'

  const addToCartHandler = () => {
    const productIndex = cart.findIndex(cartItem => cartItem.id === id)
    if (productIndex >= 0) {
      // Sitas if'as praeina kai produktas jau yra krepselyje
      const cartCopy = [...cart]
      cartCopy[productIndex].cartQuantity += 1
      setCart(cartCopy)
    }
    if (productIndex === -1) {
      // Sitas if'as praeina kai produkto nera krepselyje
      setCart([...cart, { ...product, cartQuantity: 1 }])
    }
  }

  const removeHandler = () => {
    // cia reikia removinimo logika deti
  }

  useEffect(() => {
    if (!isInCart) {
      const productInCart = cart.find(cartItem => cartItem.id === id)
      const { cartQuantity } = productInCart || {}
      setIsAddToCartDisabled(cartQuantity >= quantity)
    }
  }, [cart, id, quantity])

  return (
    <div className={classes.product}>
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.productName}>{name}</div>
      {!isInCart && (
        <div className={classes.shortDescription}>{shortDescription}</div>
      )}
      <div className={classes.bold}>Price: {price}€</div>
      <div className={classes.bold}>
        Quantity: {isInCart ? product.cartQuantity : quantity}
      </div>
      <div className={classes.buttonList}>
        <Flex justify="center">
          {isInCart ? (
            <Button type="danger" onClick={removeHandler}>
              Delete
            </Button>
          ) : (
            <>
              <Button onClick={addToCartHandler} disabled={isAddToCartDisabled}>
                Add to cart
              </Button>
              <Button type="secondary">Edit</Button>
            </>
          )}
        </Flex>
      </div>
    </div>
  )
}
