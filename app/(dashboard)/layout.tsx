import Sidebar from '@/components/layout/Sidebar'
import TopNav from '@/components/layout/TopNav'
import { BottomTabBar } from '@/components/layout/BottomTabBar'
import { MobileTopNav } from '@/components/layout/MobileTopNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-bg">
      {/* Sidebar — desktop only */}
      <Sidebar className="hidden md:flex" />
      
      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Desktop top nav */}
        <TopNav className="hidden md:flex" />
        
        {/* Mobile top nav */}
        <MobileTopNav />
        
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>
      
      {/* Bottom tab bar — mobile only */}
      <BottomTabBar />
    </div>
  )
}
