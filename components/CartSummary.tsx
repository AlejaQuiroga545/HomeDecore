'use client'

import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName } from '@/lib/translations'
import Image from 'next/image'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

export default function CartSummary() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart()
  const { language, t } = useLanguage()

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg border border-primary-100/50">
        <div className="max-w-sm mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-base text-primary-600 mb-6 font-medium">{t.cartSummary.empty}</p>
          <a href="/shop" className="inline-block px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-2xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            {t.cartSummary.continueShopping}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Cart items */}
      {cart.map((item) => (
        <div
          key={item.id}
          className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl border border-primary-100/50 p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-cream-50 to-cream-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
            <Image
              src={item.image}
              alt={translateProductName(item.name, language)}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="128px"
            />
          </div>
          
          {/* Info and controls */}
          <div className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-primary-900 mb-2 line-clamp-2">
                  {translateProductName(item.name, language)}
                </h3>
                <p className="text-sm text-primary-600 font-medium">{formatPrice(item.price)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2.5 rounded-2xl text-red-500 hover:text-white hover:bg-red-500 transition-all flex-shrink-0 shadow-sm hover:shadow-md"
                aria-label="Remove item"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-primary-100/50">
              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-10 h-10 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="w-14 text-center font-bold text-primary-900 text-base">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-10 h-10 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Total price */}
              <p className="text-lg font-bold text-primary-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="bg-gradient-to-br from-primary-50 via-cream-50 to-warm-50 rounded-3xl shadow-lg border border-primary-100/50 p-6 mt-6 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-primary-900">{t.cartSummary.total}</span>
          <span className="text-2xl font-bold text-primary-900">
            {formatPrice(getTotal())}
          </span>
        </div>
      </div>
    </div>
  )
}
