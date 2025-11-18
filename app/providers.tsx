'use client'

import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/CartContext'
import { ProductsProvider } from '@/context/ProductsContext'
import { AuthProvider } from '@/context/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>{children}</CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

