import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import classes from './CreateProductModal.module.css'
import { random } from 'faker'

const emptyObject = () => ({
  id: random.uuid(),
  name: '',
  description: '',
  price: 0,
  quantity: '',
  image: `https://picsum.photos/id/${random.number(200) || 1}/600`
})

export const CreateProductModal = ({
  isModalOpen,
  toggleModal,
  addNewProduct
}) => {
  const [formState, setFormState] = useState(emptyObject())
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const resetForm = () => {
    setFormState(emptyObject())
    setSuccess(false)
  }

  // Variantas
  useEffect(() => {
    resetForm()
  }, [isModalOpen])

  const generateDescriptionHandler = event => {
    event.preventDefault()
    setFormState({
      ...formState,
      description: random.words(250)
    })
  }

  const inputChangeHandler = (formStateKey, event) =>
    setFormState({
      ...formState,
      [formStateKey]: event.target.value
    })

  const quantityChangeHandler = event => {
    const numberQuantity = Number(event.target.value)
    const quantity = numberQuantity <= 0 ? 0 : numberQuantity
    setFormState({ ...formState, quantity })
  }

  const validate = () => {
    let isFormValid = true
    const errors = {}
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
      errors.name = 'Name must be longer than 5 symbols'
    }
    if (!formState.quantity || formState.quantity <= 0) {
      isFormValid = false
      errors.quantity = 'Quantity is required'
    }
    if (!formState.price) {
      isFormValid = false
      errors.price = 'Price is required'
    }
    setErrors(errors)
    return isFormValid
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    if (validate()) {
      const formStateCopy = {
        ...formState,
        price: Number(formState.price).toFixed(2)
      }
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formStateCopy)
      })

      if (response.status === 201) {
        setSuccess(true)
        const newProduct = await response.json()
        addNewProduct(newProduct)
      }
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <div>
        <h2 className={classes.heading}>Create product</h2>
        {success ? (
          <>
            <h2>Product created!</h2>
            <div className={classes.buttonList}>
              <button onClick={toggleModal}>Close</button>
              <button onClick={resetForm}>Create new product</button>
            </div>
          </>
        ) : (
          <form onSubmit={formSubmitHandler}>
            <div className={classes.formControl}>
              <label htmlFor="name">Product name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={event => inputChangeHandler('name', event)}
              />
              {errors.name && (
                <div className={classes.error}>{errors.name}</div>
              )}
            </div>
            <div className={classes.formControl}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="4"
                value={formState.description}
                onChange={event => inputChangeHandler('description', event)}
              />
              {errors.description && (
                <div className={classes.error}>{errors.description}</div>
              )}
              <button onClick={generateDescriptionHandler}>
                Generate description
              </button>
            </div>
            <div className={classes.formControl}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={formState.price}
                onChange={event => inputChangeHandler('price', event)}
              />
              {errors.price && (
                <div className={classes.error}>{errors.price}</div>
              )}
            </div>
            <div className={classes.formControl}>
              <label htmlFor="quantity" value={formState.quantity}>
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="0"
                onChange={quantityChangeHandler}
                value={formState.quantity}
              />
              {errors.quantity && (
                <div className={classes.error}>{errors.quantity}</div>
              )}
            </div>
            <div className={classes.buttonList}>
              <button onClick={toggleModal}>Cancel</button>
              <button>Create</button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}
