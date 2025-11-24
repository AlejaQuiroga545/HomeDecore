'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useLanguage } from '@/context/LanguageContext'
import Swal from 'sweetalert2'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import api from '@/lib/api'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/sendEmail', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })

      Swal.fire({
        title: t.contact.emailSentTitle,
        text: t.contact.emailSentText,
        icon: 'success',
        confirmButtonColor: '#C263F9',
        confirmButtonText: 'OK',
      })

      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: t.contact.emailError,
        icon: 'error',
        confirmButtonColor: '#C263F9',
        confirmButtonText: 'OK',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">{t.contact.title}</h1>
          <p className="text-gray-600 text-sm">{t.contact.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Form - Left Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label={t.contact.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.contact.namePlaceholder}
                required
                className="group"
              />
              
              <Input
                type="email"
                label={t.contact.email}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.contact.emailPlaceholder}
                required
                className="group"
              />
              
              <div className="w-full">
                <label className="block text-xs font-medium text-primary-600 mb-1.5 tracking-wide">
                  {t.contact.message}
                </label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-gray-300 focus:border-accent-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400 transition-all duration-300 hover:border-accent-300 resize-none"
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? t.contact.sending : t.contact.sendMessage}
              </Button>
            </form>
          </div>

          {/* Contact Info - Right Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base font-semibold text-primary-800 mb-4 tracking-tight">{t.contact.contactInfo}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent-50 text-accent-500">
                    <EnvelopeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary-700 mb-1">{t.contact.emailLabel}</p>
                    <a href="mailto:info@homedecor.com" className="text-xs text-gray-600 hover:text-accent-500 transition-colors">
                      info@homedecor.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent-50 text-accent-500">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary-700 mb-1">{t.contact.phoneLabel}</p>
                    <a href="tel:+15551234567" className="text-xs text-gray-600 hover:text-accent-500 transition-colors">
                      +57 314 297 0157
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent-50 text-accent-500">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary-700 mb-1">{t.contact.addressLabel}</p>
                    <p className="text-xs text-gray-600">
                      {t.contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.contact.helpText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

