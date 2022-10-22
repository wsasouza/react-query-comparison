import React, { useState } from 'react'
import './App.css'
import { ProductDetail } from './pages/Products/Detail'
import { ProductList } from './pages/Products/List'
import { ProductDetailNRQ } from './pages/ProductsNoReactQuery/DetailNRQ'
import { ProductListNRQ } from './pages/ProductsNoReactQuery/ListNRQ'

function App() {
  const [productId, setProductId] = useState<number | null>(null)
  const [productIdNRQ, setProductIdNRQ] = useState<number | null>(null)

  const onProductDetail = (id: number) => {
    setProductId(id)
  }

  const onProductDetailNRQ = (id: number) => {
    setProductIdNRQ(id)
  }

  const onBackToList = () => {
    setProductId(null)
  }

  const onBackToListNRQ = () => {
    setProductIdNRQ(null)
  }

  return (
    <div className="app">
      <div className="react-query">
        <h1>Com React Query</h1>
        <hr />
        {productId !== null ? (
          <ProductDetail id={productId} onBack={onBackToList} />
        ) : (
          <ProductList onProductDetail={onProductDetail} />
        )}
      </div>
      <div className="default">
        <h1>Requisições Normais</h1>
        <hr />
        {productIdNRQ !== null ? (
          <ProductDetailNRQ id={productIdNRQ} onBack={onBackToListNRQ} />
        ) : (
          <ProductListNRQ onProductDetail={onProductDetailNRQ} />
        )}
      </div>
    </div>
  )
}

export default App
