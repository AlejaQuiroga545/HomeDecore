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

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = () => {
      if (!isAdmin()) {
        router.push('/auth/login')
      }
    }
    const timer = setTimeout(checkAdmin, 100)
    return () => clearTimeout(timer)
  }, [isAdmin, router])

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter products
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

  // Calculate pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Delete product
  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C263F9',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id)
          toast.success('Product deleted successfully', {
            position: 'top-right',
            autoClose: 2000,
          })
        } catch (error) {
          toast.error('Failed to delete product', {
            position: 'top-right',
            autoClose: 2000,
          })
        }
      }
    })
  }

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  // Add new product
  const handleAddNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  // Save product (create or update)
  const handleSave = async (productData: Omit<Product, 'id'>) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        toast.success('Product updated successfully', {
          position: 'top-right',
          autoClose: 2000,
        })
      } else {
        await addProduct(productData)
        toast.success('Product added successfully', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      toast.error('Failed to save product', {
        position: 'top-right',
        autoClose: 2000,
      })
    }
  }

  // Get color by category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      'Furniture': { bg: 'bg-primary-100', text: 'text-primary-800', border: 'border-primary-300' },
      'Lighting': { bg: 'bg-accent-100', text: 'text-accent-700', border: 'border-accent-300' },
      'Decor': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
    }
    return colors[category] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
  }

  // If not admin, don't show anything
  if (!isAdmin()) {
    return null
  }

  return (
    <div className="pt-14 min-h-screen bg-gradient-to-b from-white to-gray-50 flex">
      {/* Sidebar menu */}
      <aside className="w-56 bg-white/80 backdrop-blur-sm shadow-sm border-r border-gray-200/50 fixed left-0 top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveMenu('products')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeMenu === 'products'
                ? 'bg-accent-400 text-white shadow-sm'
                : 'text-primary-700 hover:bg-accent-50 hover:text-accent-500'
            }`}
          >
            <Squares2X2Icon className="w-4 h-4" />
            <span>Products</span>
          </button>
          <button
            onClick={() => handleAddNew()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium text-primary-700 hover:bg-accent-50 hover:text-accent-500 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add product</span>
          </button>
          <button
            onClick={() => setActiveMenu('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeMenu === 'settings'
                ? 'bg-accent-400 text-white shadow-sm'
                : 'text-primary-700 hover:bg-accent-50 hover:text-accent-500'
            }`}
          >
            <Cog6ToothIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-primary-800 mb-6 tracking-tight">Dashboard</h1>

          {/* Products view */}
          {activeMenu === 'products' && (
            <>
              {/* Search and filters */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-5 mb-6">
                <div className="space-y-3">
                  {/* Search bar */}
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:border-accent-300 focus:ring-1 focus:ring-accent-200 focus:outline-none bg-white/60 backdrop-blur-sm text-primary-800 text-xs placeholder-gray-400 transition-all"
                    />
                  </div>

                  {/* Category buttons */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setCurrentPage(1)
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-accent-400 text-white shadow-sm'
                            : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-accent-50 hover:text-accent-500 border border-gray-200/50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="w-16 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Image</th>
                        <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Name</th>
                        <th className="w-28 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Category</th>
                        <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Price</th>
                        <th className="w-24 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Stock</th>
                        <th className="w-24 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {paginatedProducts.map((product) => {
                        const categoryColor = getCategoryColor(product.category)
                        return (
                          <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-3 py-3">
                              <div className="relative w-12 h-12 rounded-lg bg-gray-50 overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <p className="text-sm font-medium text-primary-800 truncate" title={product.name}>
                                {product.name}
                              </p>
                            </td>
                            <td className="px-3 py-3">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text} border-2 ${categoryColor.border} shadow-sm`}>
                                {product.category}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <span className="text-sm font-semibold text-primary-700">{formatPrice(product.price)}</span>
                            </td>
                            <td className="px-3 py-3">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-accent-50 text-accent-600 border-2 border-accent-200 shadow-sm">
                                {product.stock || 0}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="p-1.5 rounded-full text-accent-500 hover:bg-accent-50 transition-all"
                                  title="Edit"
                                >
                                  <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id, product.name)}
                                  className="p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-all"
                                  title="Delete"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Message if no products */}
              {paginatedProducts.length === 0 && (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50">
                  <p className="text-gray-600 text-sm">No products found.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}

          {/* Settings view */}
          {activeMenu === 'settings' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-3 tracking-tight">Settings</h2>
              <p className="text-gray-600 text-sm">Settings panel coming soon.</p>
            </div>
          )}
        </div>
      </main>

      {/* Product modal */}
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
