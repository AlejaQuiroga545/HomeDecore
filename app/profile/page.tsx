'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import Swal from '@/lib/swalConfig'
import { UserIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import api from '@/lib/api'

// User profile type
interface UserProfile {
  name: string
  email: string
  avatar: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    avatar: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load profile on mount
  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    fetchProfile()
  }, [user, router])

  // Get profile data from API
  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const email = user?.email || ''
      const response = await api.get(`/users/me?email=${encodeURIComponent(email)}`)
      if (response.data) {
        setProfile({
          name: response.data.name || '',
          email: response.data.email,
          avatar: response.data.image || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.image || '',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Save profile changes
  const handleSave = async () => {
    if (!profile.name.trim()) {
      toast.error(t.profile.nameRequired, {
        position: 'top-right',
        autoClose: 2000,
      })
      return
    }

    try {
      const response = await api.put('/users/me', {
        email: user?.email,
        name: profile.name,
        image: profile.avatar,
      })
      
      if (response.data) {
        toast.success(t.profile.profileUpdated, {
          position: 'top-right',
          autoClose: 2000,
        })
        setIsEditing(false)
        window.location.reload()
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || t.profile.errorUpdating
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2000,
      })
      console.error('Error updating profile:', error)
    }
  }

  // Cancel editing
  const handleCancel = () => {
    fetchProfile()
    setIsEditing(false)
  }

  // Logout
  const handleLogout = () => {
    Swal.fire({
      title: t.profile.logoutConfirm,
      text: t.profile.logoutConfirmText,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#C97D60',
      cancelButtonColor: '#2C2416',
      confirmButtonText: t.profile.yesLogOut,
      cancelButtonText: t.profile.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        router.push('/shop')
      }
    })
  }

  // Show loading while fetching data
  if (!user || isLoading) {
    return (
      <div className="pt-14 pb-12 min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-primary-600 text-sm">{t.profile.loading}</p>
      </div>
    )
  }

  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary-900 mb-3 tracking-tight">
            {t.profile.title}
          </h1>
          <p className="text-sm text-primary-600">Gestiona tu información personal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile image - Left side with glass effect */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-primary-100/50 p-6 sticky top-24">
              <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-cream-100 to-cream-200 overflow-hidden mb-6 shadow-lg">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserIcon className="w-24 h-24 text-primary-400" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-primary-900/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PencilIcon className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              
              {/* Avatar URL input when editing */}
              {isEditing && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-primary-700 mb-2">
                    {t.profile.avatarUrl}
                  </label>
                  <input
                    type="text"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    placeholder={t.profile.avatarUrlPlaceholder}
                    className="w-full px-4 py-2.5 rounded-2xl border border-primary-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 focus:outline-none bg-white/80 backdrop-blur-sm text-primary-900 text-sm placeholder-primary-400 transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Edit form - Right side */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-primary-100/50 p-8 space-y-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-100/50">
                <h2 className="text-xl font-semibold text-primary-900 tracking-tight">
                  {t.profile.profileInformation}
                </h2>
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    size="sm"
                    className="rounded-2xl flex items-center gap-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    {t.profile.editProfile}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="p-2 rounded-2xl bg-accent-500 text-white hover:bg-accent-600 transition-all shadow-md hover:shadow-lg"
                      aria-label="Save"
                    >
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 rounded-2xl bg-primary-200 text-primary-700 hover:bg-primary-300 transition-all shadow-md hover:shadow-lg"
                      aria-label="Cancel"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Name field */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-primary-700 mb-2">
                  {t.profile.name}
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-3 rounded-2xl border transition-all ${
                    isEditing
                      ? 'border-primary-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 bg-white/80 backdrop-blur-sm'
                      : 'border-transparent bg-primary-50/50'
                  } focus:outline-none text-primary-900 text-sm`}
                />
              </div>

              {/* Email field (read only) */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-primary-700 mb-2">
                  {t.profile.email}
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 rounded-2xl border border-transparent bg-primary-50/50 text-primary-600 text-sm cursor-not-allowed"
                />
              </div>

              {/* Logout button */}
              <div className="pt-6 border-t border-primary-100/50">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full rounded-2xl text-red-500 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all"
                >
                  {t.profile.logOut}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
