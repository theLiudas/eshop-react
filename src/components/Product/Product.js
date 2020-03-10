import React from 'react'
import classes from './Product.module.css'

export const Product = ({ product }) => {
  const { image, name, description, price, quantity } = product
  return (
    <div className={classes.product}>
      <div className="image">
        <img src={image} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="short-description">{description}</div>
      <div className="price">{price}</div>
      <div className="quantity">{quantity}</div>
      <div className="button-list">
        <button>Add to cart</button>
        <button>Preview</button>
      </div>
    </div>
  )
}
