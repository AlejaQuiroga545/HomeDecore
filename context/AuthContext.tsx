'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession, signOut as nextAuthSignOut } from 'next-auth/react'
import api from '@/lib/api'

// User type
interface User {
  id?: string
  email: string
  name?: string
  role?: string
  image?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  // Load user on mount (session persistence)
  useEffect(() => {
    const loadUser = async () => {
      // If there's a NextAuth session (Google)
      if (status === 'authenticated' && session?.user) {
        const userData = {
          email: session.user.email!,
          name: session.user.name || undefined,
          role: (session.user as any).role || 'user',
          image: session.user.image || undefined,
        }
        setUser(userData)
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData))
      } 
      // If no NextAuth session, check localStorage
      else if (status === 'unauthenticated') {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
          } catch (error) {
            localStorage.removeItem('user')
            setUser(null)
          }
        } else {
          setUser(null)
        }
      }
    }
    loadUser()
  }, [session, status])

  // Login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.user) {
        const userData = response.data.user
        setUser(userData)
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error: any) {
      console.error('Login error:', error)
      return false
    }
  }

  // Register new user
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      if (response.data.user) {
        const userData = response.data.user
        setUser(userData)
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error: any) {
      console.error('Register error:', error)
      return false
    }
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    if (session) {
      nextAuthSignOut()
    }
  }

  // Check if user is admin
  const isAdmin = (): boolean => {
    return user?.role === 'admin' || user?.email === 'admin@admin.com'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
