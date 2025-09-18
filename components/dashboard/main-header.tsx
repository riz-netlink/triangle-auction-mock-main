'use client'

import { useState } from 'react'
import { Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 h-14">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search auctions, bidders, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}