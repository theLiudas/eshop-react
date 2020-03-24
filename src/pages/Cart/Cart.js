import React from 'react'
import { Flex } from '../../components/shared/Flex/Flex'
import Product from '../../components/Product'
import classes from './Cart.module.css'
import { Button } from '../../components/shared/Button/Button'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '../../components/Input/Input'
import { useState } from 'react'
import { getCart } from '../../redux/selectors'
import { initiateCheckout } from '../../redux/actions'

// 8. TODO: <-- BONUS TASK --> Pasidaryti api wrapperi
export const Cart = () => {
  const cart = useSelector(getCart)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [formState, setFormState] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  })
  const inputChangeHandler = (formStateKey, event) =>
    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })
  const [isCheckout, setIsCheckout] = useState(false)
  const isSomeItemsInCart = !!cart.length
  const inputs = [
    { label: 'Name', value: formState.name, key: 'name' },
    {
      label: 'Address',
      value: formState.address,
      key: 'address'
    },
    {
      label: 'Phone number',
      value: formState.phone,
      key: 'phone'
    },
    {
      label: 'E - mail',
      value: formState.email,
      key: 'email'
    }
  ]

  const validate = () => {
    let isFormValid = true
    const errors = {}
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
      errors.name = 'Name must be longer than 5 symbols'
    }
    if (!formState.address) {
      isFormValid = false
      errors.address = 'Address is mandatory'
    }
    if (!formState.phone.includes('+')) {
      isFormValid = false
      errors.phone = 'Phone format is with +'
    }
    if (!formState.email.includes('@')) {
      isFormValid = false
      errors.email = 'Please provide valid email'
    }
    setErrors(errors)
    return isFormValid
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    if (validate()) {
      dispatch(initiateCheckout(formState, setIsCheckout))
    }
  }

  return (
    <>
      <Flex
        wrap="wrap"
        justify={isSomeItemsInCart ? 'space-between' : 'center'}
      >
        {isSomeItemsInCart ? (
          <>
            {cart.map(product => (
              <Product isCartPage key={product.id} product={product} />
            ))}
            <Flex justify="center">
              <Button
                onClick={() => setIsCheckout(!isCheckout)}
                type={isCheckout ? 'danger' : 'primary'}
              >
                {isCheckout ? 'Cancel' : 'Checkout'}
              </Button>
            </Flex>
          </>
        ) : (
          <h1 className={classes.heading}>Sorry, no items in cart :(</h1>
        )}
      </Flex>
      {isCheckout && isSomeItemsInCart && (
        <form onSubmit={formSubmitHandler}>
          {inputs.map(input => (
            <Input
              key={input.key}
              changeHandler={inputChangeHandler}
              errors={errors}
              inputKey={input.key}
              label={input.label}
              value={input.value}
            />
          ))}
          <Flex align="center" justify="center">
            <Button>Place order</Button>
          </Flex>
        </form>
      )}
    </>
  )
}
