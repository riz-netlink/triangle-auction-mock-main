'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Image from 'next/image'
import { 
  Home, 
  Gavel, 
  MapPin, 
  Building2, 
  Tag, 
  Users, 
  UserCheck, 
  TrendingUp, 
  Eye, 
  Settings, 
  Pin, 
  PinOff,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Create context for sidebar state
const SidebarContext = createContext<{
  isPinned: boolean
  isExpanded: boolean
}>({
  isPinned: false,
  isExpanded: false
})

export const useSidebar = () => useContext(SidebarContext)

export function ApolloSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update CSS custom property for main content margin
  useEffect(() => {
    const root = document.documentElement
    if (isPinned) {
      root.style.setProperty('--sidebar-width', '240px') // 60 * 4 = 240px (w-60)
    } else {
      root.style.setProperty('--sidebar-width', '64px') // 16 * 4 = 64px (w-16)
    }
  }, [isPinned])

  const shouldShowExpanded = isExpanded || isPinned

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', badge: null },
    { icon: Gavel, label: 'Auctions', href: '/auctions', badge: '97' },
    { icon: Building2, label: 'Company', href: '/company', badge: null },
    { icon: Tag, label: 'Categories', href: '/categories', badge: null },
    { icon: Users, label: 'Partners', href: '/partners', badge: null },
    { icon: UserCheck, label: 'Users', href: '/users', badge: null },
    { icon: UserCheck, label: 'Bidders', href: '/bidders', badge: null },
    { icon: TrendingUp, label: 'Insights', href: '/insights', badge: null },
    { icon: Eye, label: 'Appearance', href: '/appearance', badge: null },
  ]

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsExpanded(false)
    }
  }

  const togglePin = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      setIsExpanded(true)
    }
  }

  return (
    <SidebarContext.Provider value={{ isPinned, isExpanded }}>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md hover:bg-gray-50"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'fixed top-0 left-0 translate-x-0 z-50' : 'fixed top-0 left-0 -translate-x-full z-50'}
          md:translate-x-0
          ${shouldShowExpanded ? 'w-60' : 'w-16'}
          ${isPinned ? 'md:fixed md:z-10' : 'md:fixed md:z-40 md:shadow-lg'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Header with Logo */}
        <div className="flex items-center justify-between p-4 h-14 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Image
              src={shouldShowExpanded ? "/images/triangle-logo.png" : "/images/Logo_triangle_mini.png"}
              alt="Triangle Liquidators"
              width={shouldShowExpanded ? 140 : 32}
              height={shouldShowExpanded ? 32 : 32}
              className="transition-all duration-300"
              priority
            />
          </div>
          
          {/* Pin Toggle - Only show when expanded */}
          {shouldShowExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePin}
              className="hidden md:flex p-1.5 hover:bg-gray-100 transition-colors rounded-md"
              title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              {isPinned ? (
                <PinOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Pin className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1" role="menubar">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = item.label === 'Auctions' // Highlight Auctions as active based on the image
            return (
              <button
                key={index}
                className={`
                  w-full flex items-center space-x-3 px-3 rounded-lg text-left h-9
                  transition-colors group relative text-sm
                  ${shouldShowExpanded ? 'justify-start' : 'justify-center'}
                  ${isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                `}
                title={!shouldShowExpanded ? item.label : undefined}
                role="menuitem"
                aria-label={item.label}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-600'}`} />
                {shouldShowExpanded && (
                  <>
                    <span className={`font-medium flex-1 text-sm ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed state */}
                {!shouldShowExpanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Settings at Bottom */}
        <div className="p-4 border-t border-gray-100">
          <button
            className={`
              w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left
              hover:bg-gray-100 transition-colors
              ${shouldShowExpanded ? 'justify-start' : 'justify-center'}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            title={!shouldShowExpanded ? 'Settings' : undefined}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-600" />
            {shouldShowExpanded && <span className="text-gray-700 font-medium">Settings</span>}
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  )
}