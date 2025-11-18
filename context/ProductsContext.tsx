'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '@/lib/api'

// Product type
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
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductById: (id: string) => Product | undefined
  loading: boolean
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Get all products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Add new product
  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await api.post('/products', product)
      // Refresh complete list
      await fetchProducts()
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  // Update existing product
  const updateProduct = async (id: string, updatedProduct: Partial<Product>) => {
    try {
      if (!id || id.trim() === '') {
        throw new Error('Invalid product ID')
      }
      
      const response = await api.put(`/products/${id.trim()}`, updatedProduct)
      
      // Transform _id to id for consistency
      const updated = response.data
      if (updated?._id) {
        const { _id, ...rest } = updated
        updated.id = _id.toString()
      }
      
      // Update in local state
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updated : product))
      )
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      if (!id || id.trim() === '') {
        throw new Error('Invalid product ID')
      }
      
      await api.delete(`/products/${id.trim()}`)
      // Remove from local state
      setProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  // Find product by ID
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
        loading,
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
