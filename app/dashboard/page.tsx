'use client'

import MiniHeader from '@/components/dashboard/mini-header'
import MainHeader from '@/components/dashboard/main-header'
import DashboardFooter from '@/components/dashboard/dashboard-footer'
import { ApolloSidebar } from '@/components/dashboard/apollo-sidebar'

export default function DashboardPage() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mini Header - 32px height, sticky */}
      <MiniHeader />
      
      {/* Main Header - 48px height, sticky */}
      <MainHeader />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Apollo Sidebar Navigation */}
        <ApolloSidebar />
        
        {/* Main Body Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Dashboard Cards */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Auctions</h3>
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Bids</h3>
                <p className="text-3xl font-bold text-green-600">156</p>
                <p className="text-sm text-gray-500 mt-1">+8% from last week</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">$45,230</p>
                <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New auction created</p>
                    <p className="text-xs text-gray-500">Electronics Lot #A-2024-001</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bid placed</p>
                    <p className="text-xs text-gray-500">$1,250 on Furniture Lot #F-2024-003</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Auction ending soon</p>
                    <p className="text-xs text-gray-500">Office Equipment Lot #O-2024-002</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Footer - 32px height, sticky */}
      <DashboardFooter />
    </div>
  )
}