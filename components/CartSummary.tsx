'use client'

import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { translateProductName } from '@/lib/translations'
import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

export default function CartSummary() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart()
  const { language, t } = useLanguage()

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-sm mb-3">{t.cartSummary.empty}</p>
        <a href="/shop" className="text-accent-500 hover:text-accent-600 text-xs font-medium transition-colors">
          {t.cartSummary.continueShopping}
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* List of products in cart */}
      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-4 flex flex-col sm:flex-row gap-4"
        >
          {/* Product image */}
          <div className="relative w-full sm:w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={translateProductName(item.name, language)}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          {/* Information and controls */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <div className="flex-1 flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary-800 mb-1 truncate">{translateProductName(item.name, language)}</h3>
                <p className="text-xs text-gray-600">{formatPrice(item.price)}</p>
              </div>
              {/* Delete button - top right on mobile */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1.5 sm:p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all flex-shrink-0"
                aria-label="Remove item"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium text-xs transition-all flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 sm:w-10 text-center font-medium text-primary-800 text-xs">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium text-xs transition-all flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              {/* Total price of item */}
              <p className="text-sm sm:text-base font-semibold text-primary-700 text-right">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Cart total */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-5 mt-6">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-primary-800">{t.cartSummary.total}</span>
          <span className="text-xl font-bold text-primary-700">
            {formatPrice(getTotal())}
          </span>
        </div>
      </div>
    </div>
  )
}
