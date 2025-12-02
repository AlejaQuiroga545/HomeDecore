'use client'

// Favorites page - displays user's favorite products
import { useFavorites } from '@/context/FavoritesContext'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName, translateCategory } from '@/lib/translations'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { t, language } = useLanguage()

  const handleAddToCart = (item: typeof favorites[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    toast.success(`${translateProductName(item.name, language)} ${t.cart.addedToCart}`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const handleRemoveFavorite = (item: typeof favorites[0]) => {
    removeFromFavorites(item.id)
    toast.success(`${translateProductName(item.name, language)} ${t.favorites.removedFromFavorites}`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  if (favorites.length === 0) {
    return (
      <div className="pt-14 pb-16 min-h-screen bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-primary-100/50">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center shadow-lg">
                <HeartIcon className="w-12 h-12 text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-primary-900 mb-3">{t.favorites.empty}</h2>
              <p className="text-sm text-primary-600 mb-6">{t.favorites.emptyDescription}</p>
              <Link href="/shop">
                <button className="px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-2xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  {t.favorites.continueShopping}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary-900 mb-3 tracking-tight">
            {t.favorites.title}
          </h1>
          <p className="text-sm text-primary-500">
            {favorites.length} {favorites.length === 1 
              ? (language === 'es' ? 'producto favorito' : 'favorite product')
              : (language === 'es' ? 'productos favoritos' : 'favorite products')}
          </p>
        </div>

        {/* Favorites grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl border border-primary-100/50 transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Image */}
              <Link href={`/product/${item.id}`}>
                <div className="relative w-full h-48 bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={translateProductName(item.name, language)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Favorite button overlay */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemoveFavorite(item)
                      }}
                      className="p-2 rounded-full bg-red-500/90 text-white backdrop-blur-md shadow-lg hover:bg-red-600 transition-all"
                      aria-label="Remove from favorites"
                    >
                      <HeartIconSolid className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
              
              {/* Info */}
              <div className="p-5 space-y-3">
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium text-primary-900 hover:text-accent-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {translateProductName(item.name, language)}
                  </h3>
                </Link>
                <p className="text-xs text-primary-500">{translateCategory(item.category, language)}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-primary-100/50">
                  <p className="text-lg font-semibold text-primary-900">{formatPrice(item.price)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2.5 rounded-2xl bg-primary-900 text-white hover:bg-primary-800 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-label="Add to cart"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

