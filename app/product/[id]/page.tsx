'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProducts, Product } from '@/context/ProductsContext'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateCategory, translateProductName } from '@/lib/translations'
import Image from 'next/image'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import { formatPrice } from '@/lib/utils'
import api from '@/lib/api'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById, loading } = useProducts()
  const { addToCart } = useCart()
  const { language, t } = useLanguage()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load product on mount
  useEffect(() => {
    const fetchProduct = async () => {
      // Search first in local context
      const localProduct = getProductById(params.id as string)
      if (localProduct) {
        setProduct(localProduct)
        setIsLoading(false)
        return
      }

      // If not in context, fetch from API
      if (!loading) {
        try {
          const response = await api.get(`/products/${params.id}`)
          if (response.data) {
            setProduct(response.data)
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

  // Show loading
  if (isLoading) {
    return (
      <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-sm">{t.product.loading}</p>
      </div>
    )
  }

  // If product not found
  if (!product) {
    return (
      <div className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-2xl font-semibold text-primary-800 mb-3 tracking-tight">
            {t.product.notFound}
          </h1>
          <p className="text-gray-600 mb-6 text-sm">
            {t.product.notFoundDescription}
          </p>
          <Button onClick={() => router.push('/shop')}>{t.product.backToShop}</Button>
        </div>
      </div>
    )
  }

  // Add to cart
  const handleAddToCart = () => {
    const translatedName = translateProductName(product.name, language)
    addToCart({
      id: product.id,
      name: product.name, // Keep original name for cart/backend
      price: product.price,
      image: product.image,
    })
    toast.success(`${translatedName} ${t.cart.addedToCart}`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
            {/* Product image */}
            <div className="relative w-full h-64 sm:h-80 md:h-[450px] bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={translateProductName(product.name, language)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product information */}
            <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">
                {translateProductName(product.name, language)}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {t.product.category} <span className="font-medium text-primary-700">{translateCategory(product.category, language)}</span>
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary-700">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <Button onClick={handleAddToCart} size="lg" className="w-full sm:w-auto mt-2 sm:mt-4">
                {t.product.addToCart}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
