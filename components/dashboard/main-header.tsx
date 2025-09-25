'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function MainHeader() {
  return (
    <header className="sticky top-0 z-20 bg-slate-50 h-14">
      <div className="flex items-center justify-end h-full px-6">
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