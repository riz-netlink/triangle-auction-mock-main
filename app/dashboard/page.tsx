'use client'

import { MainHeader } from '@/components/dashboard/main-header'
import { ApolloSidebar } from '@/components/dashboard/apollo-sidebar'
import { DashboardFooter } from '@/components/dashboard/dashboard-footer'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Always positioned as overlay */}
      <ApolloSidebar />
      
      {/* Main Container - Dynamic margin based on sidebar state */}
      <div 
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: 'var(--sidebar-width, 64px)' }}
      >
        {/* Header Section */}
        <MainHeader />
        
        {/* Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              
              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Active Auctions</h2>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-500">Currently running</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Bidders</h2>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-sm text-gray-500">Registered users</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h2>
                  <p className="text-3xl font-bold text-purple-600">$45,230</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
              </div>

                {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-dvw">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Active Auctions</h2>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-500">Currently running</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Total Bidders</h2>
                  <p className="text-3xl font-bold text-green-600">1,247</p>
                  <p className="text-sm text-gray-500">Registered users</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h2>
                  <p className="text-3xl font-bold text-purple-600">$45,230</p>
                  <p className="text-sm text-gray-500">This month</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer Section */}
        <DashboardFooter />
      </div>
    </div>
  )
}