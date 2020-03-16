import React, { useState, useEffect } from 'react'
import Product from '../../components/Product'
import { Flex } from '../../components/shared/Flex/Flex'
import { CreateProductModal } from '../../components/CreateProductModal/CreateProductModal'
import { Button } from '../../components/shared/Button/Button'

const Products = ({ cart, test }) => {
  console.log('Products.js', cart)
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModalHandler = () => setIsModalOpen(!isModalOpen)
  const addNewProduct = newProduct => setProducts([...products, newProduct])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/products')
      const products = await response.json()
      setProducts(products)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Button onClick={toggleModalHandler}>Create product</Button>
      <Flex wrap="wrap" justify="space-between">
        {products.map(product => (
          <Product key={product.id} product={product} test={test} />
        ))}
      </Flex>
      <CreateProductModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModalHandler}
        addNewProduct={addNewProduct}
      />
    </>
  )
}

export default Products
