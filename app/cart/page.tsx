'use client'

import { useCart } from '@/context/CartContext'
import CartSummary from '@/components/CartSummary'
import Button from '@/components/Button'
import Swal from 'sweetalert2'

export default function CartPage() {
  const { getTotal, cart } = useCart()

  const handleCheckout = () => {
    Swal.fire({
      title: '🚧 This feature will be available soon!',
      text: 'Payment gateway will be available shortly',
      icon: 'info',
      confirmButtonText: 'Got it',
      confirmButtonColor: '#8b7359',
    })
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-brown-800 mb-8">Shopping Cart</h1>

        <CartSummary />

        {cart.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Button onClick={handleCheckout} size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

