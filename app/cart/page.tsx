'use client'

// Cart page - displays cart items and PayPal checkout
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import CartSummary from '@/components/CartSummary'
import PayPalButton from '@/components/PayPalButton'

export default function CartPage() {
  const { getTotal, cart } = useCart()
  const { t, language } = useLanguage()

  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-2 tracking-tight">
            {t.cart.title}
          </h1>
          {cart.length > 0 && (
            <p className="text-xs text-primary-500">
              {cart.length} {cart.length === 1 
                ? (language === 'es' ? 'producto' : 'product')
                : (language === 'es' ? 'productos' : 'products')} {language === 'es' ? 'en tu carrito' : 'in your cart'}
            </p>
          )}
        </div>

        {/* Cart summary */}
        <div className="mb-8">
          <CartSummary />
        </div>

        {/* PayPal checkout */}
        {cart.length > 0 && (
          <div className="mt-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-primary-100/50 p-6">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-base font-semibold text-primary-900 mb-1 tracking-tight">
                {language === 'es' ? 'Pago seguro con PayPal' : 'Secure payment with PayPal'}
              </h2>
              <p className="text-xs text-primary-500">
                {language === 'es' ? 'Proceso de pago 100% seguro y protegido' : '100% secure and protected payment process'}
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <PayPalButton total={getTotal()} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
