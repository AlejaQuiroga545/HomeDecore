'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface PayPalButtonProps {
  total: number
  onSuccess?: () => void
}

// PayPal payment button component - redirects to login if not authenticated
export default function PayPalButton({ total, onSuccess }: PayPalButtonProps) {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''

  if (!paypalClientId) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-primary-600">{language === 'es' ? 'PayPal no está configurado' : 'PayPal is not configured'}</p>
      </div>
    )
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="text-center py-6">
        <div className="mb-4">
          <svg className="w-12 h-12 text-primary-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-sm font-medium text-primary-700 mb-2">
            {language === 'es' ? 'Inicia sesión para continuar con el pago' : 'Sign in to continue with payment'}
          </p>
          <p className="text-xs text-primary-500 mb-4">
            {language === 'es' ? 'Tu carrito se guardará automáticamente' : 'Your cart will be saved automatically'}
          </p>
        </div>
        <button
          onClick={() => router.push('/auth/login')}
          className="px-8 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold"
        >
          {language === 'es' ? 'Iniciar sesión' : 'Sign in'}
        </button>
      </div>
    )
  }

  const createOrder = async () => {
    try {
      const response = await api.post('/paypal/create-order', {
        items: cart,
        total: total,
      })
      return response.data.orderId
    } catch (error: any) {
      console.error('Error creating PayPal order:', error)
      toast.error(language === 'es' ? 'Error al crear la orden de pago' : 'Error creating payment order')
      throw error
    }
  }

  const onApprove = async (data: { orderID: string }) => {
    try {
      const response = await api.post('/paypal/capture-order', {
        orderId: data.orderID,
      })

      if (response.data.success) {
        clearCart()
        toast.success(language === 'es' ? 'Pago completado exitosamente' : 'Payment completed successfully')
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/shop')
        }
      }
    } catch (error: any) {
      console.error('Error capturing PayPal order:', error)
      toast.error(language === 'es' ? 'Error al procesar el pago' : 'Error processing payment')
    }
  }

  const onError = (err: any) => {
    console.error('PayPal error:', err)
    toast.error(language === 'es' ? 'Error en el proceso de pago' : 'Error in payment process')
  }

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{
          layout: 'vertical',
          color: 'purple',
          shape: 'pill',
          label: 'paypal',
        }}
      />
    </PayPalScriptProvider>
  )
}
