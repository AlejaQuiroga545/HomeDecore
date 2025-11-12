export default function AboutPage() {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-beige-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-brown-800 mb-8 text-center">Sobre Nosotros</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <p className="text-brown-600 text-lg leading-relaxed">
            En HomeDecor, creemos que cada hogar merece ser un refugio de comodidad y estilo.
            Nos especializamos en ofrecer muebles y accesorios de decoración cuidadosamente
            seleccionados que transforman espacios ordinarios en ambientes extraordinarios.
          </p>
          
          <p className="text-brown-600 text-lg leading-relaxed">
            Nuestra misión es ayudarte a crear espacios que reflejen tu personalidad y te
            hagan sentir en casa. Trabajamos con materiales de calidad y diseños modernos
            que combinan funcionalidad con estética.
          </p>
          
          <p className="text-brown-600 text-lg leading-relaxed">
            Desde sofás cómodos hasta lámparas elegantes, cada producto en nuestra colección
            ha sido elegido pensando en tu bienestar y en la creación de ambientes cálidos
            y acogedores.
          </p>
        </div>
      </div>
    </div>
  )
}

