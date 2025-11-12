'use client'

import { useParams, useRouter } from 'next/navigation'
import { useProducts } from '@/context/ProductsContext'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Button from '@/components/Button'
import { toast } from 'react-toastify'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getProductById } = useProducts()
  const { addToCart } = useCart()

  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-brown-800 mb-4">
            Producto no encontrado
          </h1>
          <p className="text-brown-600 mb-8">
            El producto que buscas no existe o ha sido eliminado.
          </p>
          <Button onClick={() => router.push('/shop')}>Volver a la tienda</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} añadido al carrito`, {
      position: 'top-right',
      autoClose: 2000,
    })
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative w-full h-96 md:h-[500px] bg-beige-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-brown-600 mb-2">
                Categoría: <span className="font-semibold">{product.category}</span>
              </p>
              <p className="text-3xl font-bold text-brown-700 mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-brown-600 mb-8 leading-relaxed">
                {product.description}
              </p>
              <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

