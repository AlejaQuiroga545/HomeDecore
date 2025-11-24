'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateCategory, translateProductName, getSearchableText } from '@/lib/translations'
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
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

const ITEMS_PER_PAGE = 12

export default function DashboardPage() {
  const router = useRouter()
  const { isAdmin } = useAuth()
  const { language, t } = useLanguage()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMenu, setActiveMenu] = useState('products')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      // Search in name (both languages) and description
      const searchLower = searchTerm.toLowerCase()
      const searchableText = getSearchableText(product.name)
      const matchesSearch =
        searchableText.en.includes(searchLower) ||
        searchableText.es.includes(searchLower) ||
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
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
      title: t.dashboard.deleteConfirm,
      text: `${t.dashboard.deleteConfirmText} "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#C263F9',
      confirmButtonText: t.dashboard.yesDelete,
      cancelButtonText: t.common.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id)
          toast.success(t.dashboard.productDeleted, {
            position: 'top-right',
            autoClose: 2000,
          })
        } catch (error) {
          toast.error(t.dashboard.deleteFailed, {
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
        toast.success(t.dashboard.productUpdated, {
          position: 'top-right',
          autoClose: 2000,
        })
      } else {
        await addProduct(productData)
        toast.success(t.dashboard.productAdded, {
          position: 'top-right',
          autoClose: 2000,
        })
      }
      setIsModalOpen(false)
      setEditingProduct(null)
    } catch (error) {
      toast.error(t.dashboard.saveFailed, {
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
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar menu */}
      <aside
        className={`fixed lg:static left-0 top-14 z-50 w-64 lg:w-56 bg-white/95 lg:bg-white/80 backdrop-blur-xl lg:backdrop-blur-sm shadow-xl lg:shadow-sm border-r border-gray-200/50 h-[calc(100vh-3.5rem)] overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-2">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="text-sm font-semibold text-primary-800">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full text-primary-700 hover:bg-primary-50 transition-all"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setActiveMenu('products')
              setIsSidebarOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeMenu === 'products'
                ? 'bg-accent-400 text-white shadow-sm'
                : 'text-primary-700 hover:bg-accent-50 hover:text-accent-500'
            }`}
          >
            <Squares2X2Icon className="w-4 h-4" />
            <span>{t.dashboard.products}</span>
          </button>
          <button
            onClick={() => {
              handleAddNew()
              setIsSidebarOpen(false)
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium text-primary-700 hover:bg-accent-50 hover:text-accent-500 transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <span>{t.dashboard.addProduct}</span>
          </button>
          <button
            onClick={() => {
              setActiveMenu('settings')
              setIsSidebarOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              activeMenu === 'settings'
                ? 'bg-accent-400 text-white shadow-sm'
                : 'text-primary-700 hover:bg-accent-50 hover:text-accent-500'
            }`}
          >
            <Cog6ToothIcon className="w-4 h-4" />
            <span>{t.dashboard.settings}</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Mobile header with menu button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-full text-primary-700 hover:bg-primary-50 transition-all"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-primary-800 tracking-tight">{t.dashboard.title}</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
          <h1 className="hidden lg:block text-2xl font-semibold text-primary-800 mb-6 tracking-tight">{t.dashboard.title}</h1>

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
                      placeholder={t.dashboard.searchPlaceholder}
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
                        {category === 'All' ? t.dashboard.all : translateCategory(category, language)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products table */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden mb-6">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full table-fixed divide-y divide-gray-200/50">
                    <thead className="bg-gray-50/50 border-b border-gray-200">
                      <tr>
                        <th className="w-16 sm:w-20 px-2 sm:px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.image}</th>
                        <th className="w-24 sm:w-32 px-2 sm:px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.name}</th>
                        <th className="hidden sm:table-cell w-28 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.category}</th>
                        <th className="w-20 sm:w-32 px-2 sm:px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.price}</th>
                        <th className="hidden md:table-cell w-24 px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.stock}</th>
                        <th className="w-20 sm:w-24 px-2 sm:px-3 py-3 text-left text-xs font-semibold text-primary-700 uppercase tracking-wider">{t.dashboard.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {paginatedProducts.map((product) => {
                        const categoryColor = getCategoryColor(product.category)
                        return (
                          <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-2 sm:px-3 py-3">
                              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-50 overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={translateProductName(product.name, language)}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 py-3">
                              <p className="text-xs sm:text-sm font-medium text-primary-800 truncate" title={translateProductName(product.name, language)}>
                                {translateProductName(product.name, language)}
                              </p>
                              {/* Show category on mobile */}
                              <span className={`sm:hidden mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColor.bg} ${categoryColor.text} border ${categoryColor.border}`}>
                                {translateCategory(product.category, language)}
                              </span>
                            </td>
                            <td className="hidden sm:table-cell px-3 py-3">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text} border-2 ${categoryColor.border} shadow-sm`}>
                                {translateCategory(product.category, language)}
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 py-3">
                              <span className="text-xs sm:text-sm font-semibold text-primary-700">{formatPrice(product.price)}</span>
                            </td>
                            <td className="hidden md:table-cell px-3 py-3">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-accent-50 text-accent-600 border-2 border-accent-200 shadow-sm">
                                {product.stock || 0}
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 py-3">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="p-1 sm:p-1.5 rounded-full text-accent-500 hover:bg-accent-50 transition-all"
                                  title={t.dashboard.edit}
                                >
                                  <PencilIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id, translateProductName(product.name, language))}
                                  className="p-1 sm:p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-all"
                                  title={t.dashboard.delete}
                                >
                                  <TrashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
              </div>

              {/* Message if no products */}
              {paginatedProducts.length === 0 && (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50">
                  <p className="text-gray-600 text-sm">{t.dashboard.noProductsFound}</p>
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
              <h2 className="text-lg font-semibold text-primary-800 mb-3 tracking-tight">{t.dashboard.settings}</h2>
              <p className="text-gray-600 text-sm">{t.dashboard.settingsComingSoon}</p>
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
