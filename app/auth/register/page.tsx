'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Register new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate fields
    if (!name || !email || !password) {
      setError(t.register.fillAllFields)
      setIsLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError(t.register.passwordMinLength)
      setIsLoading(false)
      return
    }

    try {
      const success = await register(name, email, password)
      if (success) {
        toast.success(t.register.registrationSuccessful, {
          position: 'top-right',
          autoClose: 2000,
        })
        router.push('/shop')
      } else {
        setError(t.register.emailAlreadyRegistered)
      }
    } catch (error) {
      setError(t.register.errorOccurred)
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { callbackUrl: '/shop' })
    } catch (error) {
      toast.error(t.register.googleSignInFailed)
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-16 pb-12 min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full backdrop-blur-xl bg-white/60 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 p-6 sm:p-8 space-y-5 sm:space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-primary-800 tracking-tight">
            {t.register.title}
          </h1>
          <p className="text-xs text-gray-500">{t.register.joinUs}</p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label={t.register.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.register.namePlaceholder}
            required
            className="group"
          />

          <Input
            type="email"
            label={t.register.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.register.emailPlaceholder}
            required
            className="group"
          />

          <Input
            type="password"
            label={t.register.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.register.passwordPlaceholder}
            required
            className="group"
          />

          {/* Error message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-600 px-3 py-2.5 rounded-xl text-xs">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? t.register.registering : t.register.register}
          </Button>
        </form>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white/60 text-gray-500">{t.register.orContinueWith}</span>
          </div>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
          <span>{t.register.signUpWithGoogle}</span>
        </button>

        {/* Link to login */}
        <p className="text-center text-xs text-gray-500">
          {t.register.haveAccount}{' '}
          <Link href="/auth/login" className="text-accent-500 font-medium hover:text-accent-600 transition-colors">
            {t.register.signInHere}
          </Link>
        </p>
      </div>
    </div>
  )
}
