'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const itemCount = getItemCount()
  const [searchTerm, setSearchTerm] = useState('')

  const isActive = (path: string) => pathname === path
  const isAdminUser = isAdmin()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  // Admin navbar: only logo and logout
  if (isAdminUser) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-brown-700">HomeDecor</span>
            </Link>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm font-medium text-brown-600 hover:text-brown-800 hover:bg-beige-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }

  // Normal user or not logged in navbar
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-brown-700">HomeDecor</span>
          </Link>

          {/* Search bar - only for non-admin users */}
          <div className="hidden md:flex items-center space-x-8 flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-beige-300 focus:border-brown-500 focus:ring-2 focus:ring-brown-500 focus:outline-none bg-white text-brown-900 text-sm"
              />
            </form>
          </div>

          {/* Store links - only for non-admin users */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-brown-700 bg-beige-100'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-beige-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/shop')
                  ? 'text-brown-700 bg-beige-100'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-beige-50'
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-brown-700 bg-beige-100'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-beige-50'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-brown-700 bg-beige-100'
                  : 'text-brown-600 hover:text-brown-800 hover:bg-beige-50'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-brown-600 hover:text-brown-800 hover:bg-beige-50 transition-colors flex items-center gap-1"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-brown-600 hover:text-brown-800 hover:bg-beige-50 transition-colors"
                >
                  Logout
                </button>
                <Link
                  href="/cart"
                  className="relative px-3 py-2 rounded-md text-brown-600 hover:text-brown-800 hover:bg-beige-50 transition-colors"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-brown-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-brown-600 hover:text-brown-800 hover:bg-beige-50 transition-colors flex items-center gap-1"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-brown-600 text-white hover:bg-brown-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

