'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const success = login(email, password)
    if (success) {
      toast.success('Login successful', {
        position: 'top-right',
        autoClose: 2000,
      })
      if (email === 'admin@admin.com') {
        router.push('/dashboard')
      } else {
        router.push('/shop')
      }
    } else {
      setError('Incorrect email or password')
    }
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-brown-800 mb-6 text-center">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-brown-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-brown-700 font-semibold hover:underline">
            Register here
          </Link>
        </p>

        <div className="mt-6 p-4 bg-beige-100 rounded-lg text-sm text-brown-600">
          <p className="font-semibold mb-2">Admin credentials:</p>
          <p>Email: admin@admin.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}

