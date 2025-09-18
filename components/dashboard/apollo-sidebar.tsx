'use client'

import { useState } from 'react'
import { 
  Search, 
  MessageSquare, 
  CheckSquare, 
  Settings, 
  Plus, 
  ChevronDown, 
  ChevronRight,
  Pin,
  PinOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function ApolloSidebar() {
  const [isPinned, setIsPinned] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const shouldShowExpanded = isPinned || isHovered

  const togglePin = () => {
    setIsPinned(!isPinned)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <>
      {/* Hover trigger area - invisible strip on the left edge */}
      <div 
        className="fixed left-0 top-0 w-4 h-full z-40 bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
      />
      
      {/* Overlay sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-50 shadow-lg ${
          shouldShowExpanded ? 'w-64 translate-x-0' : 'w-16 translate-x-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
         <div className="p-4 border-b border-gray-200">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
               <div className="w-8 h-8 relative flex-shrink-0">
                 <img
                   src="/images/triangle-logo.png"
                   alt="Triangle Logo"
                   className="w-full h-full object-contain"
                 />
               </div>
               {shouldShowExpanded && (
                 <span className="text-lg font-semibold text-gray-900">Triangle</span>
               )}
             </div>
             {shouldShowExpanded && (
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={togglePin}
                 className="p-1"
               >
                 {isPinned ? (
                   <PinOff className="w-4 h-4" />
                 ) : (
                   <Pin className="w-4 h-4" />
                 )}
               </Button>
             )}
           </div>
         </div>

        {/* Quick Actions */}
         <div className="p-4 border-b border-gray-200">
           {shouldShowExpanded ? (
             <Button className="w-full" size="sm">
               <Plus className="w-4 h-4 mr-2" />
               New Search
             </Button>
           ) : (
             <Button 
               className="w-8 h-8 p-0 mx-auto flex items-center justify-center" 
               size="sm"
               title="New Search"
             >
               <Plus className="w-4 h-4" />
             </Button>
           )}
         </div>

        {/* Navigation */}
         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
           {/* Search Section */}
           <div>
             <button
               onClick={() => toggleSection('search')}
               className={`w-full flex items-center ${shouldShowExpanded ? 'justify-between px-3' : 'justify-center px-2'} py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg`}
               title={!shouldShowExpanded ? "Search" : undefined}
             >
               <div className={`flex items-center ${shouldShowExpanded ? 'space-x-3' : ''}`}>
                 <Search className="w-4 h-4 flex-shrink-0" />
                 {shouldShowExpanded && <span>Search</span>}
               </div>
               {shouldShowExpanded && (
                 expandedSections.includes('search') ? (
                   <ChevronDown className="w-4 h-4" />
                 ) : (
                   <ChevronRight className="w-4 h-4" />
                 )
               )}
             </button>
             {expandedSections.includes('search') && shouldShowExpanded && (
               <div className="ml-6 mt-1 space-y-1">
                 <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                   <span>People</span>
                 </button>
                 <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                   <span>Companies</span>
                 </button>
               </div>
             )}
           </div>

           {/* Conversations */}
           <button className={`w-full flex items-center ${shouldShowExpanded ? 'justify-between px-3' : 'justify-center px-2'} py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg`}
             title={!shouldShowExpanded ? "Conversations" : undefined}
           >
             <div className={`flex items-center ${shouldShowExpanded ? 'space-x-3' : ''}`}>
               <MessageSquare className="w-4 h-4 flex-shrink-0" />
               {shouldShowExpanded && <span>Conversations</span>}
             </div>
             {shouldShowExpanded && (
               <Badge variant="secondary" className="text-xs">
                 3
               </Badge>
             )}
           </button>

           {/* Tasks */}
           <button className={`w-full flex items-center ${shouldShowExpanded ? 'justify-between px-3' : 'justify-center px-2'} py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg`}
             title={!shouldShowExpanded ? "Tasks" : undefined}
           >
             <div className={`flex items-center ${shouldShowExpanded ? 'space-x-3' : ''}`}>
               <CheckSquare className="w-4 h-4 flex-shrink-0" />
               {shouldShowExpanded && <span>Tasks</span>}
             </div>
             {shouldShowExpanded && (
               <Badge variant="secondary" className="text-xs">
                 7
               </Badge>
             )}
           </button>
         </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <button className={`w-full flex items-center ${shouldShowExpanded ? 'justify-start px-3 space-x-3' : 'justify-center px-2'} py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg`}
            title={!shouldShowExpanded ? "Settings" : undefined}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {shouldShowExpanded && <span>Settings</span>}
          </button>
        </div>
      </div>
    </>
  )
}