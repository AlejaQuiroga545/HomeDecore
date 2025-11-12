'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import productsData from '@/data/products.json'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts)
      // Asegurar que todos los productos tengan stock
      const productsWithStock = parsed.map((p: Product) => ({
        ...p,
        stock: p.stock ?? 10
      }))
      setProducts(productsWithStock)
    } else {
      setProducts(productsData as Product[])
      localStorage.setItem('products', JSON.stringify(productsData))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products))
    }
  }, [products])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    )
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

