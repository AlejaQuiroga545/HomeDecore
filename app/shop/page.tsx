'use client'

// Shop page - displays all products with search, filters and pagination
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/context/ProductsContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateCategory, translateProductName, getSearchableText } from '@/lib/translations'
import ProductGrid from '@/components/ProductGrid'
import Pagination from '@/components/Pagination'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const ITEMS_PER_PAGE = 6

export default function ShopPage() {
  const searchParams = useSearchParams()
  const { products } = useProducts()
  const { language, t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  const allCategoryLabel = t.shop.all
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary-900 mb-2 tracking-tight">
            {t.shop.title}
          </h1>
          <p className="text-xs text-primary-600 max-w-xl mx-auto">
            {t.shop.description}
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 space-y-3">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input
              type="text"
              placeholder={t.shop.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 rounded-full border-2 border-primary-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-200/30 focus:outline-none bg-white/80 backdrop-blur-sm text-primary-900 text-xs placeholder-primary-400 transition-all shadow-md hover:shadow-lg"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                      className={`px-4 py-2 rounded-full text-[10px] font-semibold transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary-900 text-white shadow-md scale-105'
                          : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-white hover:text-primary-900 border-2 border-primary-200 shadow-sm hover:shadow-md hover:scale-105'
                      }`}
              >
                {category === 'All' ? allCategoryLabel : translateCategory(category, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="text-xs text-primary-500">
            {language === 'es' 
              ? `Mostrando ${paginatedProducts.length} de ${filteredProducts.length} productos`
              : `Showing ${paginatedProducts.length} of ${filteredProducts.length} products`}
          </p>
        </div>

        {/* Products */}
        <ProductGrid 
          products={paginatedProducts.map(p => ({
            ...p,
            name: translateProductName(p.name, language),
            originalName: p.name,
            category: p.category
          }))} 
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
