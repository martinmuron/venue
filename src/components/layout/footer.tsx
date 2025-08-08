import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo variant="black" size="md" href="/" />
            </div>
            <p className="text-body text-gray-600 max-w-md">
              The largest catalog of event venues in Prague. We connect event organizers with unique venues.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-headline font-semibold text-black mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/venues" className="text-body text-gray-600 hover:text-black transition-colors">
                  Venues
                </Link>
              </li>
              <li>
                <Link href="/requests" className="text-body text-gray-600 hover:text-black transition-colors">
                  Public Requests
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-body text-gray-600 hover:text-black transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-body text-gray-600 hover:text-black transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/add-venue" className="text-body text-gray-600 hover:text-black transition-colors">
                  Add Venue
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-headline font-semibold text-black mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-body text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-body text-gray-600 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-body text-gray-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-body text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-caption text-gray-500">
              © 2024 Venue Fusion. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms-of-service" className="text-caption text-gray-500 hover:text-black transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy" className="text-caption text-gray-500 hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="text-caption text-gray-500 hover:text-black transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}