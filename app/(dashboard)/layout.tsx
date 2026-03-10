import Sidebar from '@/components/layout/Sidebar'
import TopNav from '@/components/layout/TopNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
