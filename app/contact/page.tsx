'use client'

import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Mensaje enviado exitosamente. Te contactaremos pronto.', {
      position: 'top-right',
      autoClose: 3000,
    })
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-brown-800 mb-8 text-center">Contáctanos</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-brown-700 mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:border-brown-500 focus:ring-2 focus:ring-brown-500 focus:outline-none transition-colors duration-200 bg-white text-brown-900 resize-none"
                rows={6}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              Enviar Mensaje
            </Button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-beige-200">
            <h3 className="font-semibold text-brown-800 mb-4">Información de Contacto</h3>
            <div className="space-y-2 text-brown-600">
              <p><strong>Email:</strong> info@homedecor.com</p>
              <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
              <p><strong>Dirección:</strong> 123 Design St, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

