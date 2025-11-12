'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useProducts, Product } from '@/context/ProductsContext'
import ProductModal from '@/components/ProductModal'
import Pagination from '@/components/Pagination'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { 
  TrashIcon, 
  PencilIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  Cog6ToothIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export default function DashboardPage() {
  const router = useRouter()
  const { isAdmin } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenu, setActiveMenu] = useState('products')

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/auth/login')
    }
  }, [isAdmin, router])

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#8b7359',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        toast.success('Product deleted successfully', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
    })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleSave = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      toast.success('Product updated successfully', {
        position: 'top-right',
        autoClose: 2000,
      })
    } else {
      addProduct(productData)
      toast.success('Product added successfully', {
        position: 'top-right',
        autoClose: 2000,
      })
    }
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  if (!isAdmin()) {
    return null
  }

  return (
    <div className="pt-16 min-h-screen bg-beige-50 flex">
      <aside className="w-64 bg-white shadow-lg fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveMenu('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'products'
                ? 'bg-brown-600 text-white'
                : 'text-brown-700 hover:bg-beige-100'
            }`}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span>Products</span>
          </button>
          <button
            onClick={() => handleAddNew()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brown-700 hover:bg-beige-100 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => setActiveMenu('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeMenu === 'settings'
                ? 'bg-brown-600 text-white'
                : 'text-brown-700 hover:bg-beige-100'
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-brown-800 mb-8">Dashboard</h1>

          {activeMenu === 'products' && (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="space-y-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-beige-300 focus:border-brown-500 focus:ring-2 focus:ring-brown-500 focus:outline-none bg-white text-brown-900"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setCurrentPage(1)
                        }}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-brown-600 text-white'
                            : 'bg-beige-100 text-brown-700 hover:bg-beige-200 border border-beige-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <div className="relative w-full h-48 bg-beige-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-brown-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-brown-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-brown-700">
                          {formatPrice(product.price)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            (product.stock || 0) > 10
                              ? 'bg-green-100 text-green-700'
                              : (product.stock || 0) > 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          Stock: {product.stock || 0}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {paginatedProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                  <p className="text-brown-600 text-lg">No products found.</p>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {activeMenu === 'settings' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-brown-800 mb-4">Settings</h2>
              <p className="text-brown-600">Settings panel coming soon.</p>
            </div>
          )}
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
    </div>
  )
}

