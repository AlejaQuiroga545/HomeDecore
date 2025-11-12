import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brown-800 text-beige-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HomeDecor</h3>
            <p className="text-beige-200 text-sm">
              Bringing light, comfort, and style to every room in your home.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-beige-50 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-beige-50 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-beige-50 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-beige-50 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-beige-50 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-beige-50 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-beige-50 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@homedecor.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Design St, City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-700 mt-8 pt-8 text-center text-sm text-beige-200">
          <p>&copy; 2024 HomeDecor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

