'use client'

import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LanguageSwitcher } from '@/components/language-switcher'

export default function MiniHeader() {
  return (
    <div className="sticky top-0 z-50 h-8 bg-gray-800 text-white flex items-center px-4 text-xs">
      {/* Left Section - Phone, Email */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-300">📞 (555) 123-4567</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-300">✉️ info@triangleliquidators.com</span>
      </div>
      
      {/* Center Section - Search Bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-full pl-7 pr-3 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Right Section - Language Selector, Notification Bell and Avatar */}
      <div className="flex items-center space-x-3">
        <LanguageSwitcher compact />
        <button className="relative p-1 text-gray-300 hover:text-white">
          <Bell className="h-3 w-3" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-1">
          <Avatar className="h-5 w-5">
            <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
            <AvatarFallback className="text-xs bg-gray-600 text-white">AD</AvatarFallback>
          </Avatar>
          <span className="text-gray-300">Admin</span>
        </div>
      </div>
    </div>
  )
}