import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { IProduct } from '../../../types/IProduct'

const fetchProducts = async () => {
  const response = await Axios.get(`http://localhost:3333/products`)
  return response.data
}

type ProductsListProps = {
  onProductDetail: (id: number) => void
}

export const ProductListNRQ = ({ onProductDetail }: ProductsListProps) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    fetchProducts()
      .then((data) => {
        setProducts(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading || !products) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Lista de Produtos</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <a
                  href="#"
                  onClick={() => {
                    onProductDetail(product.id)
                  }}
                >
                  Detalhe
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
