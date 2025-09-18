'use client'

import { 
  Home, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  FileText, 
  Calendar,
  MessageSquare 
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Overview', active: true },
  { icon: Package, label: 'Auctions', active: false },
  { icon: Users, label: 'Users', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Calendar, label: 'Schedule', active: false },
  { icon: MessageSquare, label: 'Messages', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

export default function SidebarNav() {
  return (
    <div className="w-16 bg-slate-100 border-r border-slate-200 flex flex-col items-center py-4 space-y-2">
      {navItems.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={index}
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center transition-colors
              ${item.active 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }
            `}
            title={item.label}
          >
            <Icon className="h-5 w-5" />
          </button>
        )
      })}
    </div>
  )
}