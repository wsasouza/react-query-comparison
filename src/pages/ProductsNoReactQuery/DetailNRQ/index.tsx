import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { IProduct } from '../../../types/IProduct'

const fetchProduct = async (id: number) => {
  const response = await Axios.get(`https://my-json-server.typicode.com/wsasouza/react-query-comparison/products/${id}`)
  return response.data
}

type ProductDetailProps = {
  id: number
  onBack: () => void
}

export const ProductDetailNRQ = ({ id, onBack }: ProductDetailProps) => {
  const [product, setProduct] = useState<IProduct>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    fetchProduct(id)
      .then((data) => {
        setProduct(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (isLoading || !product) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container-detail">
      <a
        href="#"
        onClick={() => {
          onBack()
        }}
      >
        Voltar a lista de produtos
      </a>

      <div className="row">
        <label>ID:</label>
        {product.id}
      </div>

      <div className="row">
        <label>Nome:</label>
        {product.name}
      </div>

      <div className="row">
        <label>Preço:</label>
        {product.price}
      </div>

      <div className="row">
        <label>Descrição:</label>
        {product.description}
      </div>

      <div className="row">
        <label>Imagem:</label>
        <img src={product.image} alt={product.name} />
      </div>
    </div>
  )
}
