'use client'

import { useProducts } from '@/context/ProductsContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName } from '@/lib/translations'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const { products } = useProducts()
  const { language, t } = useLanguage()
  const featuredProducts = products.slice(0, 6).map(p => ({
    ...p,
    name: translateProductName(p.name, language),
    originalName: p.name // Keep original name for cart
  }))

  return (
    <div>
      <HeroSection />
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">
              {t.home.featuredProducts}
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              {t.home.featuredDescription}
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}

