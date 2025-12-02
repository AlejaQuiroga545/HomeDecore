'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName } from '@/lib/translations'
import { toast } from 'react-toastify'
import { formatPrice } from '@/lib/utils'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface ProductCardProps {
  id: string
  name: string
  originalName?: string
  price: number
  image: string
  category?: string
}

// Product card component - favorite in image, cart next to name
export default function ProductCard({ id, name, originalName, price, image, category = '' }: ProductCardProps) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { t, language } = useLanguage()
  const favorite = isFavorite(id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id,
      name: originalName || name,
      price,
      image,
    })
    toast.success(`${name} ${t.cart.addedToCart}`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id,
      name: originalName || name,
      price,
      image,
      category,
    })
    toast.success(
      favorite ? `${name} ${t.favorites.removedFromFavorites}` : `${name} ${t.favorites.addedToFavorites}`,
      {
        position: 'top-right',
        autoClose: 2000,
      }
    )
  }

  return (
    <div className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-xl border border-primary-100/30 transition-all duration-500 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-40 bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Favorite button - only in image */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-xl transition-all duration-300 shadow-md hover:scale-110 ${
              favorite
                ? 'bg-red-500/90 text-white'
                : 'bg-white/80 text-primary-700 hover:bg-white/90'
            }`}
            aria-label="Toggle favorite"
          >
            {favorite ? (
              <HeartIconSolid className="w-4 h-4" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </Link>
      
      {/* Info */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${id}`} className="block">
          <h3 className="text-sm font-medium text-primary-900 hover:text-accent-600 transition-colors line-clamp-2 leading-snug">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-2 border-t border-primary-100/30">
          <p className="text-base font-semibold text-primary-900">{formatPrice(price)}</p>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-primary-900 text-white hover:bg-accent-500 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 flex-shrink-0"
            aria-label="Add to cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
