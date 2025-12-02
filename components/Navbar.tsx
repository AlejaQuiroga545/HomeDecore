'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { useProducts } from '@/context/ProductsContext'
import { getSearchableText } from '@/lib/translations'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, ArrowRightOnRectangleIcon, LanguageIcon, Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { getItemCount } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const { products } = useProducts()
  const itemCount = getItemCount()
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if a route is active
  const isActive = (path: string) => pathname === path
  const isAdminUser = isAdmin()

  // Search products - works in both languages
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
              <span className="text-base sm:text-lg font-semibold text-primary-800 tracking-tight">HomeDecor</span>
            </Link>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  logout()
                  router.push('/shop')
                }}
                className="px-2 sm:px-4 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all duration-200 flex items-center gap-1.5"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.navbar.logout}</span>
              </button>
              {/* Language Toggle - Last */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all duration-200 flex items-center gap-1.5"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <LanguageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
            </div>
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

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.navbar.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 focus:border-accent-300 focus:ring-1 focus:ring-accent-200 focus:outline-none bg-white/60 backdrop-blur-sm text-primary-800 text-xs placeholder-gray-400 transition-all"
              />
            </form>
          </div>

          {/* Navigation links - Desktop */}
          <div className="hidden lg:flex items-center space-x-5">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              {t.navbar.home}
            </Link>
            <Link
              href="/shop"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/shop')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              {t.navbar.shop}
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive('/contact')
                  ? 'text-accent-500 bg-accent-50'
                  : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
              }`}
            >
              {t.navbar.contact}
            </Link>
          </div>

          {/* User and cart buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Cart - Always visible */}
            <Link
              href="/cart"
              className="relative px-3 py-1.5 rounded-full text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                {/* Profile */}
                <Link
                  href="/profile"
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.navbar.profile}</span>
                </Link>
                {/* Favorites */}
                <Link
                  href="/favorites"
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive('/favorites')
                      ? 'text-red-500 bg-red-50'
                      : 'text-primary-700 hover:text-red-500 hover:bg-primary-50/50'
                  }`}
                >
                  <HeartIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.navbar.favorites}</span>
                </Link>
                {/* Logout */}
                <button
                  onClick={() => {
                    logout()
                    router.push('/shop')
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.navbar.logout}</span>
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/auth/login"
                  className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all flex items-center gap-1.5"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.navbar.login}</span>
                </Link>
                {/* Register */}
                <Link
                  href="/auth/register"
                  className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium bg-accent-400 text-white hover:bg-accent-500 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="hidden sm:inline">{t.navbar.register}</span>
                  <span className="sm:hidden">Reg</span>
                </Link>
              </>
            )}
            {/* Language Toggle - Always visible */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all duration-200 flex items-center gap-1.5"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <LanguageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-primary-700 hover:text-accent-500 hover:bg-primary-50/50 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.navbar.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:border-accent-300 focus:ring-1 focus:ring-accent-200 focus:outline-none bg-white/60 backdrop-blur-sm text-primary-800 text-xs placeholder-gray-400 transition-all"
                />
              </form>

              {/* Mobile navigation links */}
              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive('/')
                      ? 'text-accent-500 bg-accent-50'
                      : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
                  }`}
                >
                  {t.navbar.home}
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive('/shop')
                      ? 'text-accent-500 bg-accent-50'
                      : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
                  }`}
                >
                  {t.navbar.shop}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive('/contact')
                      ? 'text-accent-500 bg-accent-50'
                      : 'text-primary-700 hover:text-accent-500 hover:bg-primary-50/50'
                  }`}
                >
                  {t.navbar.contact}
                </Link>
                {user && (
                  <Link
                    href="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      isActive('/favorites')
                        ? 'text-red-500 bg-red-50'
                        : 'text-primary-700 hover:text-red-500 hover:bg-primary-50/50'
                    }`}
                  >
                    {t.navbar.favorites}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
