'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Building2, 
  Target, 
  DollarSign, 
  MessageSquare,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Profile } from '@/lib/types'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Documents', href: '/documents', icon: FileText, comingSoon: true },
  { name: 'Universités', href: '/universities', icon: Building2, comingSoon: true },
  { name: 'Candidatures', href: '/apply', icon: Target, comingSoon: true },
  { name: 'Bourses', href: '/scholarships', icon: DollarSign, comingSoon: true },
  { name: 'Guide IA', href: '/chat', icon: MessageSquare, special: true },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [questionsRemaining, setQuestionsRemaining] = useState<number | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setProfile(data)
          
          // Calculate questions remaining for free tier
          if (data.tier === 'free') {
            const resetTime = new Date(data.questions_reset_at)
            const now = new Date()
            
            if (now > resetTime) {
              setQuestionsRemaining(5)
            } else {
              setQuestionsRemaining(Math.max(0, 5 - data.questions_today))
            }
          }
        }
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'premium':
        return <Badge className="bg-primary text-white">PREMIUM</Badge>
      case 'vip':
        return <Badge className="bg-italian-red text-white">VIP</Badge>
      default:
        return <Badge variant="outline" className="text-ink/60">FREE</Badge>
    }
  }

  return (
    <div className="w-64 bg-dark-bg text-white flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard">
          <h1 className="text-2xl font-display font-bold">StudiAmo</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-smooth group ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              
              {item.comingSoon && (
                <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                  Bientôt
                </Badge>
              )}
              
              {item.special && profile && (
                <>
                  {profile.tier === 'free' && questionsRemaining !== null && (
                    <Badge variant="outline" className="text-xs border-accent/50 text-accent">
                      {questionsRemaining}/5
                    </Badge>
                  )}
                  {(profile.tier === 'premium' || profile.tier === 'vip') && (
                    <Sparkles className="w-4 h-4 text-accent" />
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      {profile && (
        <div className="border-t border-white/10">
          <div className="p-4">
            {/* Tier Badge */}
            <div className="mb-3 flex justify-center">
              {getTierBadge(profile.tier)}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10 bg-primary/20">
                <AvatarFallback className="bg-primary/20 text-white font-semibold">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {profile.full_name || 'Utilisateur'}
                </p>
                <p className="text-xs text-white/60 truncate">{profile.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-1">
              <Link
                href="/upgrade"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-smooth"
              >
                <Sparkles className="w-4 h-4" />
                <span>Passer Premium</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-smooth"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
