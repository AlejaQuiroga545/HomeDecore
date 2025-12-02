'use client'

// Landing page - displays hero section and featured products
import Link from 'next/link'
import { useProducts } from '@/context/ProductsContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName, translateCategory } from '@/lib/translations'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import Button from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  const { products } = useProducts()
  const { language, t } = useLanguage()
  const featuredProducts = products.slice(0, 3).map(p => ({
    ...p,
    name: translateProductName(p.name, language),
    originalName: p.name,
    category: p.category
  }))

  return (
    <div className="bg-cream-50">
      <HeroSection />
      
      {/* CTA section - Moved up */}
      <section className="py-12 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=800&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 tracking-tight">
              {t.home.modernHomeTitle}
            </h3>
            <p className="text-xs text-white/80 mb-6 max-w-xl mx-auto">
              {t.home.modernHomeDescription}
            </p>
            <Link href="/shop">
              <button className="bg-white text-primary-900 hover:bg-cream-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5 text-xs font-semibold transform hover:scale-105 hover:-translate-y-0.5 active:scale-100">
                {t.home.exploreAllProducts}
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Image showcase with text overlay - Creative section */}
      <section className="py-12 bg-gradient-to-b from-white via-cream-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-warm-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image with hover effect */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-100/40 to-warm-100/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary-100/50 bg-white/50 backdrop-blur-sm">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
                  alt={t.home.designInspires}
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-semibold text-white mb-1">{t.home.designInspires}</h3>
                    <p className="text-xs text-white/90">{t.home.designInspiresDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-primary-200/50 shadow-sm">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-primary-600">01</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-semibold text-primary-900 tracking-tight leading-tight">
                {language === 'es' ? 'Transforma tu hogar' : 'Transform your home'}
              </h2>
              
              <p className="text-sm text-primary-600 leading-relaxed">
                {language === 'es' ? 'Cada pieza de nuestra colección está diseñada para crear ambientes únicos que reflejen tu estilo personal y te hagan sentir como en casa.' : 'Every piece in our collection is designed to create unique spaces that reflect your personal style and make you feel at home.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100/50 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-primary-900">{t.home.premiumMaterials}</p>
                </div>
                
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100/50 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-primary-900">{t.home.modernDesigns}</p>
                </div>
                
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-100/50 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-primary-900">{t.home.fastShipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us - Glass effect cards */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 via-transparent to-warm-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-3 tracking-tight">
              {t.home.whyChooseUs}
            </h2>
            <p className="text-xs text-primary-600 max-w-xl mx-auto">
              {t.home.whyChooseUsDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group relative p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-primary-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-100/20 to-warm-100/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-primary-900 mb-2">{t.home.qualityTitle}</h3>
                <p className="text-xs text-primary-600 leading-relaxed">{t.home.qualityDesc}</p>
              </div>
            </div>
            
            <div className="group relative p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-primary-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -inset-1 bg-gradient-to-br from-warm-100/20 to-accent-100/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-warm-100 to-warm-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-primary-900 mb-2">{t.home.designTitle}</h3>
                <p className="text-xs text-primary-600 leading-relaxed">{t.home.designDesc}</p>
              </div>
            </div>

            <div className="group relative p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-primary-100/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-100/20 to-warm-100/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-primary-900 mb-2">{t.home.serviceTitle}</h3>
                <p className="text-xs text-primary-600 leading-relaxed">{t.home.serviceDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Interactive cards */}
      <section className="py-12 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-3 tracking-tight">
              {t.home.exploreCategories}
            </h2>
            <p className="text-xs text-primary-600 max-w-xl mx-auto">
              {t.home.exploreCategoriesDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Furniture', 'Lighting', 'Decor'].map((category, index) => {
              const categoryImages = [
                'https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?q=80&w=600&h=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
              ]
              return (
                <Link
                  key={category}
                  href={`/shop?category=${category}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02]"
                >
                  <div className="relative h-48">
                    <Image
                      src={categoryImages[index]}
                      alt={translateCategory(category, language)}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {translateCategory(category, language)}
                      </h3>
                      <p className="text-xs text-white/90">
                        {t.home.viewCollection}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-warm-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full border border-primary-200/50 shadow-sm mb-3">
              <span className="text-[10px] font-medium text-primary-600">{t.home.featuredProducts}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-3 tracking-tight">
              {t.home.featuredProducts}
            </h2>
            <p className="text-xs text-primary-600 max-w-2xl mx-auto">
              {t.home.featuredDescription}
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}
