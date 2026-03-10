'use client'

import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function TopNav({ className = '' }: { className?: string }) {
  return (
    <div className={`h-16 bg-white border-b border-ink/10 flex items-center justify-between px-6 ${className}`}>
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-10 bg-bg border-ink/10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-lg hover:bg-bg transition-smooth">
          <Bell className="w-5 h-5 text-ink/60" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-italian-red rounded-full"></span>
        </button>
      </div>
    </div>
  )
}
