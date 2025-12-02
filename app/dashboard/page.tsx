'use client'

// Admin dashboard - manage products, users and settings
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateCategory, translateProductName, getSearchableText } from '@/lib/translations'
import { useProducts, Product } from '@/context/ProductsContext'
import ProductModal from '@/components/ProductModal'
import Pagination from '@/components/Pagination'
import Swal from '@/lib/swalConfig'
import { toast } from 'react-toastify'
import { 
  TrashIcon, 
  PencilIcon, 
  MagnifyingGlassIcon,
  PlusIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

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
      cancelButtonColor: '#2C2416',
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
      'Furniture': { bg: 'bg-primary-50', text: 'text-primary-800', border: 'border-primary-200' },
      'Lighting': { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200' },
      'Decor': { bg: 'bg-warm-50', text: 'text-warm-700', border: 'border-warm-200' },
    }
    return colors[category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
  }

  // If not admin, don't show anything
  if (!isAdmin()) {
    return null
  }

  return (
    <div className="pt-14 lg:pt-0 min-h-screen bg-gradient-to-br from-cream-50 via-white to-cream-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar menu - Minimalist design */}
      <aside
        className={`fixed lg:static left-0 top-14 lg:top-0 z-50 w-56 lg:w-56 bg-white/95 lg:bg-white backdrop-blur-xl lg:backdrop-blur-sm shadow-xl lg:shadow-md border-r border-primary-100/30 h-[calc(100vh-3.5rem)] lg:h-screen overflow-y-auto transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-1">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between mb-6 lg:hidden pb-4 border-b border-primary-100/30">
            <h2 className="text-sm font-semibold text-primary-900">Menú</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-primary-600 hover:bg-primary-50 transition-all"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
          
          {/* Dashboard title for desktop */}
          <div className="hidden lg:block mb-6 pb-4 border-b border-primary-100/30">
            <h2 className="text-sm font-semibold text-primary-900">Dashboard</h2>
          </div>

          {/* Navigation items */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveMenu('products')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeMenu === 'products'
                  ? 'bg-primary-900 text-white'
                  : 'text-primary-700 hover:bg-primary-50'
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
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-primary-700 hover:bg-accent-50 hover:text-accent-600 transition-all border border-dashed border-primary-200 hover:border-accent-300"
            >
              <PlusIcon className="w-4 h-4" />
              <span>{t.dashboard.addProduct}</span>
            </button>
            
            <button
              onClick={() => {
                setActiveMenu('settings')
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                activeMenu === 'settings'
                  ? 'bg-primary-900 text-white'
                  : 'text-primary-700 hover:bg-primary-50'
              }`}
            >
              <Cog6ToothIcon className="w-4 h-4" />
              <span>{t.dashboard.settings}</span>
            </button>

            <Link
              href="/shop"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-primary-700 hover:bg-primary-50 transition-all mt-3"
            >
              <HomeIcon className="w-4 h-4" />
              <span>{language === 'es' ? 'Tienda' : 'Shop'}</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-primary-900 tracking-tight mb-0.5">
                  {t.dashboard.title}
                </h1>
                <p className="text-xs text-primary-500">
                  {language === 'es' ? 'Gestiona productos, usuarios y configuraciones' : 'Manage products, users and settings'}
                </p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-primary-700 hover:bg-primary-50 transition-all"
                aria-label="Open menu"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products view */}
          {activeMenu === 'products' && (
            <>
              {/* Search and filters */}
              <div className="mb-6 space-y-3">
                {/* Search bar */}
                <div className="relative max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <input
                    type="text"
                    placeholder={t.dashboard.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-primary-200 focus:border-accent-400 focus:ring-1 focus:ring-accent-200/30 focus:outline-none bg-white text-primary-800 text-xs placeholder-primary-400 transition-all shadow-sm hover:shadow-md"
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
                      className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-900 text-white shadow-md'
                          : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200 hover:border-primary-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {category === 'All' ? t.dashboard.all : translateCategory(category, language)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products count */}
              <div className="mb-4">
                <p className="text-xs text-primary-500">
                  {language === 'es' 
                    ? `Mostrando ${paginatedProducts.length} de ${filteredProducts.length} productos`
                    : `Showing ${paginatedProducts.length} of ${filteredProducts.length} products`}
                </p>
              </div>

              {/* Products cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
                {paginatedProducts.map((product) => {
                  const categoryColor = getCategoryColor(product.category)
                  return (
                    <div
                      key={product.id}
                      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg border border-primary-100/30 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    >
                      {/* Product image */}
                      <div className="relative w-full h-44 bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={translateProductName(product.name, language)}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        {/* Action buttons overlay */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-accent-600 hover:bg-accent-500 hover:text-white shadow-lg transition-all hover:scale-110"
                            title={t.dashboard.edit}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, translateProductName(product.name, language))}
                            className="p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-all hover:scale-110"
                            title={t.dashboard.delete}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Product information */}
                      <div className="p-4 space-y-2">
                        <div>
                          <h3 className="text-xs font-semibold text-primary-900 mb-1.5 line-clamp-2 leading-snug">
                            {translateProductName(product.name, language)}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-semibold ${categoryColor.bg} ${categoryColor.text} border ${categoryColor.border}`}>
                              {translateCategory(product.category, language)}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-semibold bg-accent-50 text-accent-600 border border-accent-200">
                              {product.stock || 0}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-primary-100/30">
                          <span className="text-sm font-bold text-primary-900">{formatPrice(product.price)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Message if no products */}
              {paginatedProducts.length === 0 && (
                <div className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-primary-100/50">
                  <div className="max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Squares2X2Icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-primary-600 text-sm font-medium">{t.dashboard.noProductsFound}</p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}

          {/* Settings view */}
          {activeMenu === 'settings' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-primary-100/50 p-10">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cog6ToothIcon className="w-8 h-8 text-primary-400" />
                </div>
                <h2 className="text-xl font-bold text-primary-900 mb-2 tracking-tight">{t.dashboard.settings}</h2>
                <p className="text-primary-600 text-sm">{t.dashboard.settingsComingSoon}</p>
              </div>
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
