'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const itemCount = getItemCount()
  const [searchTerm, setSearchTerm] = useState('')

  // Check if a route is active
  const isActive = (path: string) => pathname === path
  const isAdminUser = isAdmin()

  // Search products
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  // Navbar for admin (only logo and logout)
  if (isAdminUser) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-lg font-semibold text-primary-800 tracking-tight">HomeDecor</span>
            </Link>
            <button
              onClick={logout}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all duration-200 flex items-center gap-1.5"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }

  // Navbar for normal users
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-semibold text-primary-800 tracking-tight">HomeDecor</span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex items-center space-x-6 flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 focus:border-accent-300 focus:ring-1 focus:ring-accent-200 focus:outline-none bg-white/60 backdrop-blur-sm text-primary-800 text-xs placeholder-gray-400 transition-all"
              />
            </form>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/shop')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/about')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/contact')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* User and cart buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Profile */}
                <Link
                  href="/profile"
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                {/* Logout */}
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative px-3 py-1.5 rounded-full text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                {/* Register */}
                <Link
                  href="/auth/register"
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-accent-400 text-white hover:bg-accent-500 transition-all shadow-sm hover:shadow-md"
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
