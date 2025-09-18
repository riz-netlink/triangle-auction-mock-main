'use client'

import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export function DashboardFooter() {
  return (
    <footer className=" border-t border-slate-200 py-1 px-6 mt-auto sticky bottom-0 bg-slate-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Left Section - Contact Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3" />
            <span>support@triangleauction.com</span>
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-xs">
          <div className="flex items-center space-x-4 text-gray-600">
            <Link 
              href="/privacy" 
              className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="Terms & Conditions"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="text-gray-500">
            © {new Date().getFullYear()} Triangle Auction. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}