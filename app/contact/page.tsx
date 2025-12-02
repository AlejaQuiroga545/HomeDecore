'use client'

// Contact page - form to send messages to HomeDecor
import { useState } from 'react'
import Button from '@/components/Button'
import { useLanguage } from '@/context/LanguageContext'
import Swal from '@/lib/swalConfig'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import api from '@/lib/api'
import Image from 'next/image'

export default function ContactPage() {
  const { t, language } = useLanguage()
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
        confirmButtonColor: '#C97D60',
        confirmButtonText: 'OK',
      })

      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.errors?.[0]?.message || t.contact.emailError,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-14 pb-16 min-h-screen bg-gradient-to-br from-cream-50 via-white to-cream-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-warm-100/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-primary-200/30 shadow-md mb-4">
            <ChatBubbleLeftRightIcon className="w-4 h-4 text-accent-500" />
            <span className="text-xs font-medium text-primary-700">{t.contact.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary-900 mb-3 tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-sm text-primary-600 max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form - Enhanced design */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-accent-100/30 to-warm-100/30 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary-100/50 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-primary-700 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-primary-700 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-primary-700 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors resize-none min-h-[120px]"
                    placeholder={t.contact.messagePlaceholder}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full rounded-full shadow-lg hover:shadow-xl" size="lg" disabled={isLoading}>
                  {isLoading ? t.contact.sending : t.contact.sendMessage}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info - Enhanced with image */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-800/90"></div>
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Contact"
                width={600}
                height={400}
                className="w-full h-[300px] object-cover opacity-30"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-white mb-6 tracking-tight">
                  {t.contact.contactInfo}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                      <EnvelopeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/80 mb-1">{t.contact.emailLabel}</p>
                      <a href="mailto:info@homedecor.com" className="text-sm text-white hover:text-accent-200 transition-colors font-medium">
                        info@homedecor.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/80 mb-1">{t.contact.phoneLabel}</p>
                      <a href="tel:+15551234567" className="text-sm text-white hover:text-accent-200 transition-colors font-medium">
                        +57 314 297 0157
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/80 mb-1">{t.contact.addressLabel}</p>
                      <p className="text-sm text-white font-medium">
                        {t.contact.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-primary-100/50 p-6">
              <p className="text-xs text-primary-500 leading-relaxed">
                {t.contact.helpText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
