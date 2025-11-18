'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent successfully. We will contact you soon.', {
      position: 'top-right',
      autoClose: 3000,
    })
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">Contact us</h1>
          <p className="text-gray-600 text-sm">Get in touch with our team</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form - Left Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="group"
              />
              
              <Input
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="group"
              />
              
              <div className="w-full">
                <label className="block text-xs font-medium text-primary-600 mb-1.5 tracking-wide">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-gray-300 focus:border-accent-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400 transition-all duration-300 hover:border-accent-300 resize-none"
                    rows={5}
                    placeholder="Your message..."
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                Send message
              </Button>
            </form>
          </div>

          {/* Contact Info - Right Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-primary-800 mb-4 tracking-tight">Contact information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent-50 text-accent-500">
                    <EnvelopeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary-700 mb-1">Email</p>
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
                    <p className="text-xs font-medium text-primary-700 mb-1">Phone</p>
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
                    <p className="text-xs font-medium text-primary-700 mb-1">Address</p>
                    <p className="text-xs text-gray-600">
                      19th street # 53 -50, Medellín - Colombia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                We're here to help! Send us a message and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

