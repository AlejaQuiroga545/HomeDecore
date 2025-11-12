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
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">
              Featured Products
            </h2>
            <p className="text-brown-600 text-lg max-w-2xl mx-auto">
              Discover our selection of the most popular furniture and accessories
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}

