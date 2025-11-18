'use client'

import { useCart } from '@/context/CartContext'
import CartSummary from '@/components/CartSummary'
import Button from '@/components/Button'
import Swal from 'sweetalert2'

export default function CartPage() {
  const { getTotal, cart } = useCart()

  // Process checkout (for now only shows message)
  const handleCheckout = () => {
    Swal.fire({
      title: '🚧 This feature will be available soon!',
      text: 'Payment gateway will be available shortly',
      icon: 'info',
      confirmButtonText: 'Got it',
      confirmButtonColor: '#C263F9',
    })
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-primary-800 mb-6 tracking-tight">Shopping cart</h1>

        {/* Cart summary */}
        <CartSummary />

        {/* Checkout button if there are products */}
        {cart.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleCheckout} size="lg">
              Proceed to checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
