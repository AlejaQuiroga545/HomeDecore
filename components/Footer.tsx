import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">HomeDecor</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Bringing light, comfort, and style to every room in your home.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">Quick links</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-accent-300 transition-colors text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-accent-300 transition-colors text-gray-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-300 transition-colors text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-300 transition-colors text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">Customer service</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  Shipping info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent-300 transition-colors text-gray-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm text-white">Contact</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>Email: info@homedecor.com</li>
              <li>Phone: +57 314 297 0157</li>
              <li>19th street # 53 -50, Medellín - Colombia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-6 pt-6 text-center text-xs text-gray-400">
          <p>&copy; 2025 HomeDecor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

