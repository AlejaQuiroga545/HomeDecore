'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/Button'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError(t.login.fillAllFields)
      setIsLoading(false)
      return
    }

    try {
      const success = await login(email, password)
      if (success) {
        toast.success(t.login.loginSuccessful, {
          position: 'top-right',
          autoClose: 2000,
        })
        setTimeout(() => {
          const isAdminEmail = email.toLowerCase() === 'admin@homedecor.com'
          if (isAdminEmail) {
            router.push('/dashboard')
          } else {
            router.push('/shop')
          }
        }, 300)
      } else {
        setError(t.login.incorrectCredentials)
        setIsLoading(false)
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || t.login.errorOccurred
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { callbackUrl: '/shop' })
    } catch (error) {
      toast.error(t.login.googleSignInFailed)
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-16 pb-12 min-h-screen bg-gradient-to-br from-cream-50 via-white to-cream-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-warm-100/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-sm w-full backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl border border-primary-100/50 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-primary-800 tracking-tight">
            {t.login.title}
          </h1>
          <p className="text-xs text-gray-500">{t.login.welcome}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-700 mb-2">
              {t.login.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.login.emailPlaceholder}
              className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-700 mb-2">
              {t.login.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.login.passwordPlaceholder}
              className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-600 px-3 py-2.5 rounded-xl text-xs">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full rounded-full" size="lg" disabled={isLoading}>
            {isLoading ? t.login.signingIn : t.login.signIn}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white/80 text-gray-500">{t.login.orContinueWith}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{t.login.signInWithGoogle}</span>
        </button>

        <p className="text-center text-xs text-gray-500">
          {t.login.noAccount}{' '}
          <Link href="/auth/register" className="text-accent-500 font-medium hover:text-accent-600 transition-colors">
            {t.login.registerHere}
          </Link>
        </p>
      </div>
    </div>
  )
}
