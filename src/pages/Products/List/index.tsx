import React from 'react'
import Axios from 'axios'
import { IProduct } from '../../../types/IProduct'
import { useQuery } from 'react-query'

const fetchProducts = async () => {
  const response = await Axios.get(`https://my-json-server.typicode.com/wsasouza/react-query-comparison/products/products`)
  return response.data
}

type ProductsListProps = {
  onProductDetail: (id: number) => void
}

export const ProductList = ({ onProductDetail }: ProductsListProps) => {
  const { data: products, isLoading } = useQuery<IProduct[]>(['products'], () =>
    fetchProducts(),
  )

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
