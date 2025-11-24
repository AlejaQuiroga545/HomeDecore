'use client'

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

  // Load search term from URL
  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  // Get all unique categories
  const allCategoryLabel = t.shop.all
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  // Filter products by search and category
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
      // Filter by category
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  // Calculate pages and paginated products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 pt-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">
            {t.shop.title}
          </h1>
          <p className="text-gray-600 text-sm">
            {t.shop.description}
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-6 space-y-3">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.shop.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:border-accent-300 focus:ring-1 focus:ring-accent-200 focus:outline-none bg-white/60 backdrop-blur-sm text-primary-800 text-xs placeholder-gray-400 transition-all"
            />
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2 justify-center px-2">
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
                {category === 'All' ? allCategoryLabel : translateCategory(category, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <ProductGrid 
          products={paginatedProducts.map(p => ({
            ...p,
            name: translateProductName(p.name, language),
            originalName: p.name // Keep original name for cart
          }))} 
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
