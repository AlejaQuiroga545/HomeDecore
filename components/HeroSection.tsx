'use client'

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative mt-14 min-h-[500px] md:min-h-[550px] flex items-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
          alt="Home Decor"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-primary-800/50 to-primary-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight tracking-tight">
            {t.hero.title}
            <br />
            <span className="text-accent-200">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-100 mb-6 max-w-xl">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop">
              <Button size="lg" className="bg-accent-400 hover:bg-accent-500 text-white border-0">
                {t.hero.shopNow}
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="border border-white/80 text-white hover:bg-white/10 backdrop-blur-sm">
                {t.hero.exploreCollection}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

