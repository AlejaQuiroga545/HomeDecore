'use client'

import { useProducts } from '@/context/ProductsContext'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  const { products } = useProducts()
  const featuredProducts = products.slice(0, 6)

  return (
    <div>
      <HeroSection />
      
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">
              Featured products
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Discover our selection of the most popular furniture and accessories
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}

