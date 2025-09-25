'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronDown, User, LogOut, Settings, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ProfileDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const router = useRouter()

  // Mock user data - in real app, this would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john.doe@triangleauction.com',
    role: 'Auction Manager',
    avatar: '/avatars/john-doe.jpg',
    initials: 'JD'
  }

  const languages = [
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'de', flag: '🇩🇪' },
    { name: '中文', code: 'zh', flag: '🇨🇳' },
    { name: '日本語', code: 'ja', flag: '🇯🇵' },
    { name: '한국어', code: 'ko', flag: '🇰🇷' },
    { name: 'Português', code: 'pt', flag: '🇧🇷' },
    { name: 'Русский', code: 'ru', flag: '🇷🇺' },
    { name: 'العربية', code: 'ar', flag: '🇸🇦' },
  ]

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    // In real app, this would update the app language
  }

  const handleLogout = () => {
    // In real app, this would handle logout logic
    console.log('Logging out...')
    router.push('/')
  }

  const handleProfileClick = () => {
    // In real app, this would navigate to profile page
    console.log('Navigate to profile...')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 px-3 py-2 h-auto hover:bg-grasy-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-0"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8 m-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-64 p-0 rounded-xl" 
        align="end" 
        sideOffset={8}
        role="menu"
        aria-label="User menu"
      >
        {/* User Info Section */}
        <div className="px-4 py-3 rounded-lg border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={handleProfileClick}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:bg-gray-100"
            role="menuitem"
          >
            <User className="mr-3 h-4 w-4 text-gray-500" />
            <span>Profile Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:bg-gray-100"
            role="menuitem"
          >
            <Settings className="mr-3 h-4 w-4 text-gray-500" />
            <span>Account Settings</span>
          </DropdownMenuItem>

          {/* Language Selector */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:bg-gray-100">
              <Globe className="mr-3 h-4 w-4 text-gray-500" />
              <span>Language</span>
              <span className="ml-auto text-xs text-gray-500">{selectedLanguage}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48" sideOffset={8}>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language.name)}
                  className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 ${
                    selectedLanguage === language.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  role="menuitem"
                >
                  <span className="mr-3 text-base">{language.flag}</span>
                  <span>{language.name}</span>
                  {selectedLanguage === language.name && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50"
            role="menuitem"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}