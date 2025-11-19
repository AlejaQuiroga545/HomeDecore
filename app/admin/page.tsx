'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useProducts } from '@/context/ProductsContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { TrashIcon, PencilIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function AdminPage() {
  const router = useRouter()
  const { isAdmin } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/auth/login')
    }
  }, [isAdmin, router])

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#8b7359',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        toast.success('Product successfully removed', {
          position: 'top-right',
          autoClose: 2000,
        })
      }
    })
  }

  const handleEdit = (product: typeof products[0]) => {
    setIsEditing(true)
    setEditingId(product.id)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock?.toString() || '0',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && editingId) {
      updateProduct(editingId, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
      })
      toast.success('Product updated successfully', {
        position: 'top-right',
        autoClose: 2000,
      })
    } else {
      addProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
      })
      toast.success('Product successfully added', {
        position: 'top-right',
        autoClose: 2000,
      })
    }

    setIsEditing(false)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
    })
  }

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  if (!isAdmin()) {
    return null
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-brown-800 mb-8">Administration panel</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-brown-800 mb-4">
            {isEditing ? 'Edit product' : 'Add new product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <Input
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                step="0.01"
                required
              />
              <Input
                type="number"
                label="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                min="0"
                required
              />
              <Input
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">
                {isEditing ? 'Update' : 'Add'} Producto
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-brown-800 mb-4">Lista de Productos</h2>
          
          <div className="mb-6 space-y-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-brown-600 text-white'
                      : 'bg-beige-100 text-brown-700 hover:bg-beige-200 border border-beige-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-beige-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-brown-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-beige-50">
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-16 bg-beige-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-brown-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-brown-600">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-brown-700">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-brown-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        (product.stock || 0) > 10 
                          ? 'bg-green-100 text-green-700' 
                          : (product.stock || 0) > 0 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}