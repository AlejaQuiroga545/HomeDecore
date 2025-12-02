'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useAuth } from './AuthContext'
import api from '@/lib/api'

// Cart item type
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  // Track previous user email to detect login/logout
  const [previousUserEmail, setPreviousUserEmail] = useState<string | undefined>(undefined)

  // Load cart from localStorage or database
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)
      try {
        if (user?.email) {
          // User is logged in - load from database
          try {
            const response = await api.get('/cart', {
              params: { userEmail: user.email }
            }).catch(async () => {
              // If GET fails, try POST with userEmail in body
              const savedCart = localStorage.getItem('cart')
              const localCart = savedCart ? JSON.parse(savedCart) : []
              try {
                const postResponse = await api.post('/cart', { 
                  items: localCart,
                  userEmail: user.email 
                })
                return postResponse
              } catch {
                return { data: { items: localCart } }
              }
            })
            
            if (response.data.items && response.data.items.length > 0) {
              // Merge local cart with DB cart if user just logged in
              if (previousUserEmail === undefined && user.email) {
                const savedCart = localStorage.getItem('cart')
                if (savedCart) {
                  const localCart = JSON.parse(savedCart)
                  // Merge: combine items, prefer local quantities if same item exists
                  const mergedCart = [...response.data.items]
                  localCart.forEach((localItem: CartItem) => {
                    const existingIndex = mergedCart.findIndex(item => item.id === localItem.id)
                    if (existingIndex >= 0) {
                      // Item exists in both - use higher quantity
                      mergedCart[existingIndex].quantity = Math.max(
                        mergedCart[existingIndex].quantity,
                        localItem.quantity
                      )
                    } else {
                      // New item from local cart
                      mergedCart.push(localItem)
                    }
                  })
                  setCart(mergedCart)
                  localStorage.setItem('cart', JSON.stringify(mergedCart))
                  // Save merged cart to DB
                  try {
                    await api.post('/cart', { 
                      items: mergedCart,
                      userEmail: user.email 
                    })
                  } catch (error) {
                    console.error('Error syncing merged cart to DB:', error)
                  }
                } else {
                  setCart(response.data.items)
                  localStorage.setItem('cart', JSON.stringify(response.data.items))
                }
              } else {
                setCart(response.data.items)
                localStorage.setItem('cart', JSON.stringify(response.data.items))
              }
            } else {
              // No cart in DB, try localStorage and sync
              const savedCart = localStorage.getItem('cart')
              if (savedCart) {
                const localCart = JSON.parse(savedCart)
                setCart(localCart)
                // Sync localStorage to DB
                try {
                  await api.post('/cart', { 
                    items: localCart,
                    userEmail: user.email 
                  })
                } catch (error) {
                  console.error('Error syncing cart to DB:', error)
                }
              }
            }
          } catch (error) {
            // If API fails, fallback to localStorage
            console.error('Error loading cart from DB:', error)
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
              setCart(JSON.parse(savedCart))
            }
          }
          setPreviousUserEmail(user.email)
        } else {
          // User not logged in - load from localStorage only
          const savedCart = localStorage.getItem('cart')
          if (savedCart) {
            setCart(JSON.parse(savedCart))
          }
          setPreviousUserEmail(undefined)
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCart()
  }, [user?.email, previousUserEmail])

  // Save cart to localStorage and database
  const saveCart = useCallback(async (newCart: CartItem[]) => {
    // Always save to localStorage
    localStorage.setItem('cart', JSON.stringify(newCart))
    
    // If user is logged in, also save to database
    if (user?.email) {
      try {
        await api.post('/cart', { 
          items: newCart,
          userEmail: user.email 
        })
      } catch (error) {
        console.error('Error saving cart to DB:', error)
        // Continue even if DB save fails
      }
    }
  }, [user?.email])

  // Save cart when it changes
  useEffect(() => {
    if (!isLoading) {
      saveCart(cart)
    }
  }, [cart, isLoading, saveCart])

  // Add product to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  // Remove product from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Update product quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate cart total
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Count total items in cart
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
