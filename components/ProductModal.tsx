'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Button from './Button'
import { Product } from '@/context/ProductsContext'
import api from '@/lib/api'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, 'id'>) => void
  editingProduct?: Product | null
}

export default function ProductModal({ isOpen, onClose, onSave, editingProduct }: ProductModalProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const categories = [
    { 
      value: 'Furniture', 
      label: language === 'es' ? 'Muebles' : 'Furniture', 
      color: 'bg-primary-50 text-primary-700 border-primary-300 hover:bg-primary-100',
      activeColor: 'bg-primary-900 text-white border-primary-900',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      value: 'Lighting', 
      label: language === 'es' ? 'Iluminación' : 'Lighting', 
      color: 'bg-accent-50 text-accent-700 border-accent-300 hover:bg-accent-100',
      activeColor: 'bg-accent-500 text-white border-accent-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      value: 'Decor', 
      label: language === 'es' ? 'Decoración' : 'Decor', 
      color: 'bg-warm-50 text-warm-700 border-warm-300 hover:bg-warm-100',
      activeColor: 'bg-warm-500 text-white border-warm-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
  ]

  // Load product data if editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
        category: editingProduct.category,
        stock: editingProduct.stock?.toString() || '0',
      })
      setImagePreview(editingProduct.image)
      setImageFile(null)
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
      })
      setImagePreview('')
      setImageFile(null)
    }
  }, [editingProduct, isOpen])

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      toast.error(t.productModal.fillRequiredFields)
      return
    }

    if (!imageFile && !editingProduct) {
      toast.error(t.productModal.selectImage)
      return
    }

    setIsUploading(true)

    try {
      let imageUrl = editingProduct?.image || ''

      if (imageFile) {
        const formDataUpload = new FormData()
        formDataUpload.append('file', imageFile)
        const response = await api.post('/upload', formDataUpload)
        imageUrl = response.data.secure_url
        if (!imageUrl) {
          throw new Error('Failed to get image URL')
        }
      }

      onSave({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        image: imageUrl,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
      })
      onClose()
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || t.productModal.errorSaving
      toast.error(errorMessage)
      console.error('Error saving product:', error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-primary-100/50">
        {/* Header */}
        <div className="px-8 py-6 border-b border-primary-100/50 bg-gradient-to-r from-white to-cream-50/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-900 tracking-tight">
              {editingProduct ? t.productModal.editProduct : t.productModal.addNewProduct}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-primary-50 text-primary-600 hover:text-primary-900 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image upload section */}
            <div className="w-full space-y-2">
              <label className="block text-xs font-semibold text-primary-700 mb-3 uppercase tracking-wide">
                {t.productModal.image}
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary-200 rounded-2xl cursor-pointer hover:border-accent-400 hover:bg-accent-50/10 transition-all duration-300 group"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white font-medium text-xs transition-opacity duration-300 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          {language === 'es' ? 'Click para cambiar' : 'Click to change'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-primary-400 group-hover:text-accent-500 transition-colors py-8">
                      <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs font-medium">{language === 'es' ? 'Click para seleccionar imagen' : 'Click to select image'}</p>
                      <p className="text-[10px] text-primary-400 mt-1">{language === 'es' ? 'PNG, JPG, GIF hasta 10MB' : 'PNG, JPG, GIF up to 10MB'}</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2 space-y-1">
                <label className="block text-xs font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                  {t.productModal.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
                  placeholder={t.productModal.name}
                  required
                />
              </div>

              {/* Category selection - Compact design */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                  {t.productModal.category}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`p-2.5 rounded-xl border-2 transition-all duration-200 text-center group ${
                        formData.category === cat.value
                          ? `${cat.activeColor} shadow-md scale-[1.02]`
                          : `${cat.color} shadow-sm hover:shadow-md`
                      }`}
                    >
                      <div className="flex justify-center mb-1">
                        <div className="w-4 h-4">
                          {cat.icon}
                        </div>
                      </div>
                      <div className="text-[10px] font-semibold">{cat.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-1">
                <label className="block text-xs font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                  {t.productModal.description}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors resize-none min-h-[80px]"
                  placeholder={t.productModal.description}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                  {t.productModal.price}
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  step="1"
                  min="0"
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
                  placeholder="0"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                  {t.productModal.stock}
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  min="0"
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-primary-200 focus:border-accent-500 focus:outline-none text-primary-900 text-sm placeholder-primary-400 transition-colors"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-primary-100/50">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="rounded-full text-xs px-5 py-2" 
                disabled={isUploading}
              >
                {t.productModal.cancel}
              </Button>
              <Button 
                type="submit" 
                className="rounded-full text-xs px-5 py-2 shadow-md hover:shadow-lg" 
                disabled={isUploading}
              >
                {isUploading ? t.productModal.uploading : editingProduct ? t.productModal.update : t.productModal.add}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
