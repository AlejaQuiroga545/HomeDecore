'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative mt-14 min-h-[75vh] flex items-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-white to-accent-50/30"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-200/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-warm-200/20 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      
      {/* Organic shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-accent-100/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-32 left-32 w-32 h-32 bg-warm-100/30 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur-xl rounded-full border border-primary-200/30 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-medium text-primary-700 tracking-wide">{t.home.newCollection}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-primary-900 leading-[1.1] tracking-tight">
              {t.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-warm-500 to-accent-600 animate-gradient font-light">
                {t.hero.titleHighlight}
              </span>
            </h1>
            
            <p className="text-sm text-primary-600/90 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Link href="/shop">
                <button className="group relative px-6 py-2.5 bg-primary-900 hover:bg-primary-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 text-xs font-semibold overflow-hidden">
                  <span className="relative z-10 flex items-center gap-1.5">
                    {t.hero.shopNow}
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-warm-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </Link>
              <Link href="/shop">
                <button className="px-6 py-2.5 bg-white/80 backdrop-blur-xl hover:bg-white border-2 border-primary-200 text-primary-700 hover:text-primary-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 text-xs font-semibold">
                  {t.hero.exploreCollection}
                </button>
              </Link>
            </div>
          </div>

          {/* Image with organic shape */}
          <div className="relative hidden lg:block">
            {/* Decorative blob */}
            <div className="absolute -top-8 -right-8 w-56 h-56 bg-gradient-to-br from-accent-200/40 to-warm-200/40 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-warm-200/40 to-accent-200/40 rounded-full blur-3xl"></div>
            
            {/* Image container with organic border */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-100/50 via-warm-100/30 to-accent-100/50 rounded-[2.5rem] blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1000&fit=crop"
                  alt="HomeDecor"
                  width={600}
                  height={700}
                  className="object-cover w-full h-[450px] transform hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
