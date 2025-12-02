'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t, language } = useLanguage()
  return (
    <div className="pt-14 pb-16 min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary-900 mb-2 tracking-tight">
            {t.about.title}
          </h1>
          <p className="text-sm text-primary-600">{t.about.subtitle}</p>
        </div>
        
        {/* Mission section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative group">
            <div className="absolute -inset-2 bg-accent-100/20 rounded-lg blur-xl"></div>
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-primary-100">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
                alt="HomeDecor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <div className="text-2xl font-light text-accent-600">01</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 tracking-tight">
              {t.about.mission}
            </h2>
            <p className="text-sm text-primary-600 leading-relaxed">
              {t.about.missionText}
            </p>
          </div>
        </div>

        {/* What we do */}
        <div className="bg-white rounded-lg shadow-sm border border-primary-100 p-6 md:p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 mb-3 tracking-tight">
              {t.about.whatWeDo}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-cream-50 border border-primary-100">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-primary-900">{t.about.qualityMaterials}</h3>
              <p className="text-xs text-primary-600 leading-relaxed">
                {t.about.qualityMaterialsText}
              </p>
            </div>
            
            <div className="space-y-3 p-5 rounded-2xl bg-cream-50 border border-primary-100">
              <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-primary-900">{t.about.curatedCollection}</h3>
              <p className="text-xs text-primary-600 leading-relaxed">
                {t.about.curatedCollectionText}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '✨', title: language === 'es' ? 'Calidad' : 'Quality', desc: language === 'es' ? 'Materiales premium y durabilidad garantizada' : 'Premium materials and guaranteed durability' },
            { icon: '🚀', title: language === 'es' ? 'Innovación' : 'Innovation', desc: language === 'es' ? 'Diseños modernos y tendencias actuales' : 'Modern designs and current trends' },
            { icon: '❤️', title: language === 'es' ? 'Compromiso' : 'Commitment', desc: language === 'es' ? 'Satisfacción del cliente como prioridad' : 'Customer satisfaction as priority' }
          ].map((value, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-primary-100">
              <div className="text-3xl mb-3">{value.icon}</div>
              <h3 className="text-sm font-semibold text-primary-900 mb-2">{value.title}</h3>
              <p className="text-xs text-primary-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
