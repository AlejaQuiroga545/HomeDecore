'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProducts, Product } from '@/context/ProductsContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateCategory, translateProductName } from '@/lib/translations'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { formatPrice } from '@/lib/utils'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import api from '@/lib/api'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById, loading } = useProducts()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user } = useAuth()
  const { language, t } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      const localProduct = getProductById(params.id as string)
      if (localProduct) {
        setProduct(localProduct)
        setIsLoading(false)
        return
      }

      if (!loading) {
        try {
          const response = await api.get(`/products/${params.id}`)
          if (response.data) {
            const productData = response.data
            setProduct({
              ...productData,
              id: productData._id ? productData._id.toString() : productData.id,
            })
          }
        } catch (error) {
          console.error('Error fetching product:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, getProductById, loading])

  if (isLoading) {
    return (
      <div className="pt-14 pb-12 min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-primary-600 text-sm">{t.product.loading}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-2xl font-semibold text-primary-800 mb-3 tracking-tight">
            {t.product.notFound}
          </h1>
          <p className="text-primary-600 mb-6 text-sm">
            {t.product.notFoundDescription}
          </p>
          <button 
            onClick={() => router.push('/shop')}
            className="px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-sm font-semibold"
          >
            {t.product.backToShop}
          </button>
        </div>
      </div>
    )
  }

  const favorite = isFavorite(product.id)
  const translatedName = translateProductName(product.name, language)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${translatedName} ${t.cart.addedToCart}`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast.success(
      favorite ? `${translatedName} ${t.favorites.removedFromFavorites}` : `${translatedName} ${t.favorites.addedToFavorites}`,
      {
        position: 'top-right',
        autoClose: 2000,
      }
    )
  }

  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-primary-600 hover:text-primary-900 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'es' ? 'Volver' : 'Back'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image section - Organic design */}
          <div className="relative">
            {/* Decorative blobs */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-gradient-to-br from-accent-200/30 to-warm-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-warm-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/50 bg-white">
              <div className="relative w-full h-[400px] lg:h-[450px] bg-gradient-to-br from-cream-50 to-cream-100">
                <Image
                  src={product.image}
                  alt={translatedName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Favorite button overlay */}
                <button
                  onClick={handleToggleFavorite}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl transition-all duration-300 shadow-lg hover:scale-110 ${
                    favorite
                      ? 'bg-red-500/90 text-white'
                      : 'bg-white/80 text-primary-700 hover:bg-white/90'
                  }`}
                  aria-label="Toggle favorite"
                >
                  {favorite ? (
                    <HeartIconSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Product information - Modern layout */}
          <div className="space-y-5 lg:sticky lg:top-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-primary-200/30 mb-3">
                <span className="text-[10px] font-semibold text-primary-600">
                  {translateCategory(product.category, language)}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-3 tracking-tight leading-tight">
                {translatedName}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <p className="text-2xl font-bold text-primary-900">
                  {formatPrice(product.price)}
                </p>
                {product.stock > 0 && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold">
                    {language === 'es' ? 'En stock' : 'In stock'}
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-primary-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={handleAddToCart}
                className="group relative px-6 py-2.5 bg-primary-900 hover:bg-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 text-xs font-semibold overflow-hidden flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t.product.addToCart}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-warm-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className={`px-6 py-2.5 rounded-full border-2 transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 ${
                  favorite
                    ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                    : 'bg-white border-primary-200 text-primary-700 hover:border-primary-300'
                }`}
              >
                {favorite ? (
                  <>
                    <HeartIconSolid className="w-4 h-4" />
                    {language === 'es' ? 'En favoritos' : 'In favorites'}
                  </>
                ) : (
                  <>
                    <HeartIcon className="w-4 h-4" />
                    {language === 'es' ? 'Agregar a favoritos' : 'Add to favorites'}
                  </>
                )}
              </button>
            </div>

            {/* Additional info */}
            <div className="pt-4 border-t border-primary-100/50 space-y-2">
              <div className="flex items-center gap-2 text-xs text-primary-600">
                <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{language === 'es' ? 'Envío gratuito en compras superiores a $200.000' : 'Free shipping on orders over $200,000'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-600">
                <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{language === 'es' ? 'Pago 100% seguro' : '100% secure payment'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
