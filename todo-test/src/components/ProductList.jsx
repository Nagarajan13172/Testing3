import React from 'react'
import ProductsCard from './ProductsCard'

export default function ProductList({products}) {
  return (
    <div>
        <h1>Prodcuts Search</h1>

        {products.map((product) => (
           <ProductsCard key={product.id} product={product}/>
        ))}
    </div>
  )
}
