'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-primary-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">HomeDecor</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.navbar.home}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.navbar.shop}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.navbar.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.navbar.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">{t.footer.customerService}</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.footer.shippingInfo}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.footer.returns}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">{t.footer.contact}</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>Email: info@homedecor.com</li>
              <li>Phone: +57 314 297 0157</li>
              <li>{t.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-6 pt-6 text-center text-xs text-gray-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

