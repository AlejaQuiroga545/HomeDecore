'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'
import Button from './Button'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
}

// Product card to display in shop
export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCart } = useCart()

  // Add product to cart
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    })
    toast.success(`${name} added to cart`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/50 transition-all duration-300 overflow-hidden group">
      {/* Product image */}
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      {/* Product information */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-primary-800 hover:text-accent-500 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-primary-700">{formatPrice(price)}</p>
          <Button onClick={handleAddToCart} size="sm">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
