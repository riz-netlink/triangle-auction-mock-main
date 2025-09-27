'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  X,
  BarChart3,
  Package,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// Create context for sidebar state
const SidebarContext = createContext<{
  isPinned: boolean
  isExpanded: boolean
}>({
  isPinned: false,
  isExpanded: false
})

export const useSidebar = () => useContext(SidebarContext)

export function AppSidebar() {
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

  const shouldShowExpanded = isExpanded || isPinned

  // Update CSS custom property for main content margin - only when pinned
  useEffect(() => {
    const root = document.documentElement
    const sidebarWidth = isPinned ? '0px' : '64px'
    root.style.setProperty('--sidebar-width', sidebarWidth)
  }, [isPinned, shouldShowExpanded])

  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { label: 'Auctions', href: '/dashboard/auctions', icon: Gavel, badge: '97' },
    { type: 'divider' },
    { label: 'Company', href: '/dashboard/company', icon: Building2, badge: null },
    { label: 'Categories', href: '/dashboard/categories', icon: Tag, badge: null },
    { label: 'Partners', href: '/dashboard/partners', icon: Users, badge: null },
    { label: 'Users', href: '/dashboard/users', icon: UserCheck, badge: null },
    { label: 'Bidders', href: '/dashboard/bidders', icon: UserCheck, badge: null },
    { type: 'divider' },
    { label: 'All Reports', href: '/dashboard/reports', icon: TrendingUp, badge: null },
    { label: 'User Analytics', href: '/dashboard/analytics', icon: Activity, badge: null },
    { label: 'Inventory', href: '/dashboard/inventory', icon: Package, badge: null },
  ]

  const bottomNavigationItems = [
    { label: 'Settings', href: '/dashboard/settings', icon: Settings, badge: null },
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
    <TooltipProvider>
      <SidebarContext.Provider value={{ isPinned, isExpanded }}>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md hover:bg-slate-50"
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
          h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden
          ${isMobileOpen ? 'fixed top-0 left-0 translate-x-0 z-50' : 'fixed top-0 left-0 -translate-x-full z-50'}
          md:translate-x-0
          ${isPinned ? 'md:relative md:z-10 md:shadow-lg' : 'md:fixed md:z-50 md:shadow-lg'}
          transition-all duration-300 ease-out
          ${shouldShowExpanded ? 'w-60' : 'w-16'}
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
        <div className="flex items-center justify-between p-2 h-14 flex-shrink-0 overflow-hidden">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className={`relative transition-all duration-300 ${shouldShowExpanded ? 'w-[140px] h-[40px]' : 'w-[40px] h-[40px]'}`}>
              <Image
                src={shouldShowExpanded ? "/images/triangle-logo.png" : "./images/Logo_triangle_mini.png"}
                alt="Triangle Liquidators"
                fill
                className="object-contain transition-all duration-300"
                priority
              />
            </div>
          </div>
          
          {/* Pin Toggle - Only show when expanded */}
          {shouldShowExpanded && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePin}
                  className="w-8 h-8 md:flex p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
                >
                  {isPinned ? (
                      <PinOff className="h-5 w-5 text-gray-500 stroke-2" />
                    ) : (
                      <Pin className="h-5 w-5 text-gray-500 stroke-2" />
                    )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                 <p>{isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}</p>
               </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Navigation Items - Takes up remaining space */}
        <nav className="flex-1 p-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden" role="menubar">
          {navigationItems.map((item, index) => {
            // Handle dividers
            if (item.type === 'divider') {
              return shouldShowExpanded ? (
                <div 
                  key={index} 
                  className="my-2 border-t border-gray-200 transition-opacity duration-300"
                />
              ) : (
                <div 
                  key={index} 
                  className="my-2 mx-2 border-t border-gray-200 transition-opacity duration-300"
                />
              )
            }

            const Icon = item.icon
            if (!Icon) return null // Type guard to ensure Icon is defined
            
            const isActive = item.label === 'Auctions' // Highlight Auctions as active based on the image
            return (
              <button
                key={index}
                className={`
                  flex items-center rounded-lg text-left cursor-pointer
                  transition-all duration-300 ease-out group relative text-sm
                  ${shouldShowExpanded 
                    ? 'w-full h-9 px-3 space-x-3 justify-start' 
                    : 'w-9 h-9 justify-center mx-auto p-0'
                  }
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
                <Icon className={`
                  h-5 w-5 flex-shrink-0 transition-colors duration-300 stroke-2
                  ${isActive ? 'text-gray-900' : 'text-gray-600'}
                `} />
                {shouldShowExpanded && (
                  <div className="flex items-center flex-1 space-x-3 overflow-hidden">
                    <span className={`
                      font-medium flex-1 text-sm whitespace-nowrap
                      transition-colors duration-300
                      ${isActive ? 'text-gray-900' : 'text-gray-700'}
                    `}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
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

        {/* Bottom Navigation - Fixed at bottom */}
        <div className="px-2 flex-shrink-0">
          <div className="space-y-1 py-2">
            {bottomNavigationItems.map((item, index) => {
              const Icon = item.icon
              if (!Icon) return null

              const isActive = false // Bottom items are not active by default
              return (
                <button
                  key={index}
                  className={`
                    flex items-center rounded-lg text-left
                    transition-all duration-300 ease-out group relative text-sm
                    ${shouldShowExpanded 
                      ? 'w-full h-9 px-3 space-x-3 justify-start' 
                      : 'w-9 h-9 justify-center mx-auto p-0'
                    }
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
                  <Icon className={`
                    h-5 w-5 flex-shrink-0 transition-colors duration-300 stroke-2
                    ${isActive ? 'text-gray-900' : 'text-gray-600'}
                  `} />
                  {shouldShowExpanded && (
                    <span className={`
                      font-medium text-sm whitespace-nowrap
                      transition-colors duration-300
                      ${isActive ? 'text-gray-900' : 'text-gray-700'}
                    `}>
                      {item.label}
                    </span>
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
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
    </TooltipProvider>
  )
}