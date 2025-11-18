'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { UserIcon } from '@heroicons/react/24/outline'
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
      // Send email as parameter for manual login
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
      // If it fails, use context data
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
    // Validate that name is not empty
    if (!profile.name.trim()) {
      toast.error('Name is required', {
        position: 'top-right',
        autoClose: 2000,
      })
      return
    }

    try {
      // Update profile in database (include email for manual login)
      const response = await api.put('/users/me', {
        email: user?.email,
        name: profile.name,
        image: profile.avatar,
      })
      
      if (response.data) {
        toast.success('Profile updated successfully', {
          position: 'top-right',
          autoClose: 2000,
        })
        setIsEditing(false)
        // Reload page to update data
        window.location.reload()
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error updating profile'
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
      title: 'Log out?',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#C263F9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        router.push('/')
      }
    })
  }

  // Show loading while fetching data
  if (!user || isLoading) {
    return (
      <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-primary-800 mb-6 tracking-tight">My profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile image - Left side */}
          <div className="md:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6">
              <div className="relative w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-4">
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
                    <UserIcon className="w-20 h-20 text-gray-400" />
                  </div>
                )}
              </div>
              {/* Field to edit avatar URL when in edit mode */}
              {isEditing && (
                <div className="mt-4">
                  <Input
                    type="text"
                    label="Avatar URL"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    placeholder="https://example.com/avatar.jpg"
                    className="group"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Edit form - Right side */}
          <div className="md:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 space-y-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary-800 tracking-tight">Profile information</h2>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    Edit profile
                  </Button>
                )}
              </div>

              {/* Name field */}
              <Input
                label="Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                required
                className="group"
              />

              {/* Email field (read only) */}
              <Input
                label="Email"
                value={profile.email}
                disabled
                className="group"
              />

              {/* Save/cancel buttons when editing */}
              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    Cancel
                  </Button>
                </div>
              )}

              {/* Logout button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full text-red-500 border-red-300 hover:bg-red-50"
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
