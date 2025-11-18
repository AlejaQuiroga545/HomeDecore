import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="pt-14 pb-12 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-800 mb-2 tracking-tight">About us</h1>
          <p className="text-gray-600 text-sm">Discover our story</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
              alt="Home Decor"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 flex flex-col justify-center space-y-4">
            <h2 className="text-xl font-semibold text-accent-500 tracking-tight">Our mission</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              At HomeDecor, we believe every home deserves to be a sanctuary of comfort and style.
              We specialize in offering carefully selected furniture and decor accessories that
              transform ordinary spaces into extraordinary environments.
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-accent-500 tracking-tight mb-3">What we do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-primary-700">Quality materials</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our mission is to help you create spaces that reflect your personality and make
                you feel at home. We work with quality materials and modern designs that combine
                functionality with aesthetics.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-primary-700">Curated collection</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                From comfortable sofas to elegant lamps, every product in our collection has been
                chosen with your well-being in mind and the creation of warm and welcoming environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

