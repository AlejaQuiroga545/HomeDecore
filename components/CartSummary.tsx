'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

export default function CartSummary() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brown-600 text-lg mb-4">Your cart is empty</p>
        <a href="/shop" className="text-brown-600 hover:text-brown-800 underline">
          Continue shopping
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative w-full sm:w-32 h-32 bg-beige-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-brown-800">{item.name}</h3>
              <p className="text-brown-600">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-beige-200 hover:bg-beige-300 text-brown-700 font-semibold transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-brown-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-beige-200 hover:bg-beige-300 text-brown-700 font-semibold transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-bold text-brown-700 w-32 text-right">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-brown-800">Total:</span>
          <span className="text-2xl font-bold text-brown-700">
            {formatPrice(getTotal())}
          </span>
        </div>
      </div>
    </div>
  )
}
