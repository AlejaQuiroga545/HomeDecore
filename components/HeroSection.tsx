import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function HeroSection() {
  return (
    <section className="relative mt-16 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
          alt="Home Decor"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/70 via-brown-800/60 to-brown-900/70"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bring Light, Comfort, and Style
            <br />
            <span className="text-beige-200">to Every Room</span>
          </h1>
          <p className="text-lg md:text-xl text-beige-100 mb-8 max-w-2xl">
            Discover our curated collection of modern furniture and accessories
            designed to transform your living spaces into havens of comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-brown-600 hover:bg-brown-700 text-white border-0">
                Shop Now
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

