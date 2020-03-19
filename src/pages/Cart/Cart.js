import React from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import classes from './Cart.module.css'
import { Button } from '../../components/shared/Button/Button'
import { useSelector } from 'react-redux'

// 1. TODO: Rodyti checkout tik tada kai yra karte produktu
// 2. TODO: Sukurti forma naudojant Input.js komponenta.
//          Formoje turi buti sie fieldai: vardas, adresas, tel nr., el. p.
// 3. TODO: Forma turi atsirasti tik poto, kai paspaudziame checkout.
// 4. TODO: Uzsakymas turi buti siunciamas i serveri ir saugomas.
//          I uzsakyma ieina sie fieldai: suma, produktu ID's, data, ir userio ID.
// 5. TODO: Useris taip pat keliauja i serveri. Turi buti saugomi
//          visi nurodyti duomenys + uuid
// 6. TODO: Duomenys taip pat turi buti ir redux'e.
// 7. TODO: Atvaizduoti orderius "Orders" page lenteles pavidalu.
//          Turi matytis:  useris, suma, produktai, data.

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  const isSomeItemsInCart = !!cart.length
  return (
    <>
      <Flex
        wrap="wrap"
        justify={isSomeItemsInCart ? 'space-between' : 'center'}
      >
        {isSomeItemsInCart ? (
          cart.map(product => (
            <Product isCartPage key={product.id} product={product} />
          ))
        ) : (
          <h1 className={classes.heading}>Sorry, no items in cart :(</h1>
        )}
      </Flex>
      <Flex justify="center">
        <Button>Checkout</Button>
      </Flex>
      {/* cia reikia kad butu forma */}
    </>
  )
}
