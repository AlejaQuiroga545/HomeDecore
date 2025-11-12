'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { UserIcon, CameraIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

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

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const savedProfile = localStorage.getItem(`profile_${user.email}`)
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile({
        name: parsed.name || user.name || '',
        email: user.email,
        avatar: parsed.avatar || '',
      })
    } else {
      setProfile({
        name: user.name || '',
        email: user.email,
        avatar: '',
      })
    }
  }, [user, router])

  const handleSave = () => {
    if (!profile.name.trim()) {
      toast.error('Name is required', {
        position: 'top-right',
        autoClose: 2000,
      })
      return
    }

    localStorage.setItem(`profile_${profile.email}`, JSON.stringify({
      name: profile.name,
      avatar: profile.avatar,
    }))

    toast.success('Profile updated successfully', {
      position: 'top-right',
      autoClose: 2000,
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    const savedProfile = localStorage.getItem(`profile_${user?.email}`)
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile({
        name: parsed.name || user?.name || '',
        email: user?.email || '',
        avatar: parsed.avatar || '',
      })
    } else {
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        avatar: '',
      })
    }
    setIsEditing(false)
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Log out?',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b7359',
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

  if (!user) {
    return null
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-brown-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-full bg-beige-100 overflow-hidden mb-4 border-4 border-brown-200">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-brown-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="mt-2">
                <Input
                  type="text"
                  label="Avatar URL"
                  value={profile.avatar}
                  onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-64"
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Input
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
              required
            />

            <Input
              label="Email"
              value={profile.email}
              disabled
              className="bg-beige-50"
            />

            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="pt-6 border-t border-beige-200">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

