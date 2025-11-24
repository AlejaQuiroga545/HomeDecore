'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Input from './Input'
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
  const { t } = useLanguage()
  // Form states
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
      // Reset form for new product
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
      // Create local preview
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

    // Validate required fields
    if (!formData.name || !formData.price) {
      toast.error(t.productModal.fillRequiredFields)
      return
    }

    // Validate that there's an image
    if (!imageFile && !editingProduct) {
      toast.error(t.productModal.selectImage)
      return
    }

    setIsUploading(true)

    try {
      let imageUrl = editingProduct?.image || ''

      // Upload image to Cloudinary if there's a new file
      if (imageFile) {
        const formDataUpload = new FormData()
        formDataUpload.append('file', imageFile)
        const response = await api.post('/upload', formDataUpload)
        imageUrl = response.data.secure_url
        if (!imageUrl) {
          throw new Error('Failed to get image URL')
        }
      }

      // Save product
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-brown-800 mb-4">
            {editingProduct ? t.productModal.editProduct : t.productModal.addNewProduct}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name and category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t.productModal.name}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label={t.productModal.category}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <Input
              label={t.productModal.description}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            {/* Price, Stock and Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                type="number"
                label={t.productModal.price}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                step="1"
                min="0"
                required
              />
              <Input
                type="number"
                label={t.productModal.stock}
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                min="0"
                required
              />
              {/* Image upload */}
              <div className="w-full space-y-3">
                <label className="block text-xs font-medium text-primary-600 mb-1.5 tracking-wide">
                  {t.productModal.image}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-accent-50 file:text-accent-600 hover:file:bg-accent-100"
                />
                {imageFile && (
                  <p className="mt-1 text-xs text-gray-500">{t.productModal.selectedFile} {imageFile.name}</p>
                )}
                {/* Image preview */}
                {imagePreview && (
                  <div className="mt-2 relative w-full h-40 sm:h-48 rounded-lg overflow-hidden border bg-gray-50">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button type="submit" className="flex-1 w-full sm:w-auto" disabled={isUploading}>
                {isUploading ? t.productModal.uploading : editingProduct ? `${t.productModal.update} ${t.dashboard.products}` : `${t.productModal.add} ${t.dashboard.products}`}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 w-full sm:w-auto" disabled={isUploading}>
                {t.productModal.cancel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
