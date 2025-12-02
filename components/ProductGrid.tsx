'use client'

import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  price: number
  image: string
  originalName?: string
  category?: string
}

interface ProductGridProps {
  products: Product[]
}

// Product grid component
export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-primary-500 font-medium">
          No se encontraron productos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          originalName={product.originalName || product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  )
}
