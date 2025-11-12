'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_EMAIL = 'admin@admin.com'
const ADMIN_PASSWORD = 'admin123'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ email: ADMIN_EMAIL })
      return true
    }
    const savedUsers = localStorage.getItem('registeredUsers')
    if (savedUsers) {
      const users = JSON.parse(savedUsers)
      const foundUser = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      )
      if (foundUser) {
        setUser({ email: foundUser.email, name: foundUser.name })
        return true
      }
    }
    return false
  }

  const register = (name: string, email: string, password: string): boolean => {
    const savedUsers = localStorage.getItem('registeredUsers')
    const users = savedUsers ? JSON.parse(savedUsers) : []
    
    if (users.some((u: { email: string }) => u.email === email)) {
      return false
    }

    users.push({ name, email, password })
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    setUser({ email, name })
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const isAdmin = (): boolean => {
    return user?.email === ADMIN_EMAIL
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

