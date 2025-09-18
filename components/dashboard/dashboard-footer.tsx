'use client'

import { useEffect, useState } from 'react'

export default function DashboardFooter() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000) // Update every second
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky bottom-0 z-40 h-8 bg-gray-100 border-t border-gray-200 flex items-center px-6 text-xs text-gray-600">
      <div className="flex items-center space-x-4">
        <span>© 2024 Triangle Liquidators</span>
        <span className="text-gray-400">|</span>
        <span>Status: Online</span>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <span>Last updated: {currentTime}</span>
        <button className="text-blue-600 hover:text-blue-800">
          Help
        </button>
      </div>
    </div>
  )
}