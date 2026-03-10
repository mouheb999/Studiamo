'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, MessageCircle, Compass, Sparkles } from 'lucide-react'

const tabs = [
  { href: '/dashboard',     icon: Home,           label: 'Accueil' },
  { href: '/documents',     icon: FileText,       label: 'Docs' },
  { href: '/chat',          icon: MessageCircle,  label: 'AI Guide' },
  { href: '/universities',  icon: Compass,        label: 'Univs' },
  { href: '/upgrade',       icon: Sparkles,       label: 'Premium' },
]

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 
                    bg-[#042D3A] border-t border-white/10
                    flex items-center justify-around
                    pb-safe-area-inset-bottom"
         style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      {tabs.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-3 min-w-[56px]
                        transition-all duration-200 relative
                        ${active 
                          ? 'text-[#00BCD4]' 
                          : 'text-white/40 hover:text-white/70 active:text-white/90'}`}
          >
            {active && (
              <div className="absolute top-0 w-8 h-0.5 bg-[#00BCD4] rounded-full" />
            )}
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
