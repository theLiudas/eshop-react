import React, { useState } from 'react'
import Modal from 'react-modal'
import classes from './CreateProductModal.module.css'
import { random } from 'faker'

// TODO: productName instead of name
// TODO: no image present
// TODO: quantity is string
// TODO: user can push empty objects

export const CreateProductModal = ({ isModalOpen, toggleModal }) => {
  const [formState, setFormState] = useState({
    id: random.uuid(),
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: ''
  })

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

  const validate = () => {
    let isFormValid = true
    if (!formState.name || formState.name.length < 5) {
      isFormValid = false
    }
    return isFormValid
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    if (validate()) {
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      })
    } else {
      alert('Form is invalid')
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
        <form onSubmit={formSubmitHandler}>
          <div className={classes.formControl}>
            <label htmlFor="name">Product name</label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onInput={event => inputChangeHandler('name', event)}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              value={formState.description}
              onInput={event => inputChangeHandler('description', event)}
            />
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
              onInput={event => inputChangeHandler('price', event)}
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="quantity" value={formState.quantity}>
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              onInput={event => inputChangeHandler('quantity', event)}
            />
          </div>
          <div className={classes.buttonList}>
            <button>Cancel</button>
            <button>Create</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
