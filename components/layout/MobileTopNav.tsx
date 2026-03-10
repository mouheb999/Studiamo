'use client'

import { Logo } from '@/components/shared/Logo'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function MobileTopNav() {
  const [profile, setProfile] = useState<any>(null)

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
        setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  return (
    <header className="md:hidden sticky top-0 z-40 
                       bg-[#042D3A]/95 backdrop-blur-md
                       flex items-center justify-between 
                       px-4 py-3
                       border-b border-white/10">
      <Logo size="sm" />
      
      <div className="flex items-center gap-3">
        {profile && (
          <>
            <Badge 
              variant={profile.tier === 'free' ? 'outline' : 'default'}
              className={`text-xs ${
                profile.tier === 'free' 
                  ? 'border-white/30 text-white/70' 
                  : 'bg-[#00BCD4] text-white border-none'
              }`}
            >
              {profile.tier === 'free' ? 'Gratuit' : profile.tier.toUpperCase()}
            </Badge>
            <Avatar className="w-8 h-8 border-2 border-white/20">
              <AvatarFallback className="bg-[#00BCD4] text-white text-xs font-semibold">
                {profile.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </header>
  )
}
