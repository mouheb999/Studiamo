'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  ArrowRight, 
  Clock,
  FileText,
  Building2,
  Target,
  DollarSign,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import type { Profile, StudentProfile } from '@/lib/types'

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        const { data: studentData } = await supabase
          .from('student_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        setProfile(profileData)
        setStudentProfile(studentData)
      }
      
      setLoading(false)
    }

    fetchData()
  }, [])

  const roadmapSteps = [
    { id: 1, title: 'Profil créé', status: 'completed' },
    { id: 2, title: 'Roadmap générée', status: 'completed' },
    { id: 3, title: 'Apostille en cours', status: 'in_progress' },
    { id: 4, title: 'Dichiarazione di Valore', status: 'locked' },
    { id: 5, title: 'Inscription Universitaly', status: 'locked' },
  ]

  const completedSteps = roadmapSteps.filter(s => s.status === 'completed').length
  const progressPercentage = (completedSteps / roadmapSteps.length) * 100

  const upcomingDeadlines = [
    { title: 'Apostille - Ministère', date: '2025-04-15', daysLeft: 45, priority: 'low' },
    { title: 'Traduction assermentée', date: '2025-05-01', daysLeft: 61, priority: 'low' },
    { title: 'Rendez-vous Consulat', date: '2025-03-20', daysLeft: 10, priority: 'high' },
  ]

  const features = [
    {
      icon: FileText,
      title: 'Documents',
      description: 'Gérez tous vos documents requis',
      href: '/documents',
      locked: profile?.tier === 'free',
      comingSoon: true,
    },
    {
      icon: Building2,
      title: 'Universités',
      description: 'Explorez 50+ universités italiennes',
      href: '/universities',
      locked: profile?.tier === 'free',
      comingSoon: true,
    },
    {
      icon: Target,
      title: 'Candidatures',
      description: 'Suivez vos applications',
      href: '/apply',
      locked: profile?.tier === 'free',
      comingSoon: true,
    },
    {
      icon: DollarSign,
      title: 'Bourses',
      description: 'Trouvez des opportunités de financement',
      href: '/scholarships',
      locked: profile?.tier === 'free',
      comingSoon: true,
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink/60">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-4 md:p-8 text-white">
        <h1 className="text-xl md:text-3xl font-display font-bold mb-2">
          Bienvenue, {profile?.full_name || 'Étudiant'} 👋
        </h1>
        <p className="text-white/90">
          Voici où vous en êtes dans votre candidature pour les universités italiennes
        </p>
      </div>

      {/* Progress Card */}
      <Card className="p-4 md:p-6">
        <h2 className="text-xl font-display font-bold text-ink mb-6">Votre progression</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Circular Progress */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-mist"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                className="text-primary transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
          </div>

          {/* Steps List */}
          <div className="flex-1 space-y-3 w-full">
            {roadmapSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-3">
                {step.status === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-italian-green flex-shrink-0" />
                )}
                {step.status === 'in_progress' && (
                  <Circle className="w-5 h-5 text-accent flex-shrink-0 animate-pulse" />
                )}
                {step.status === 'locked' && (
                  <Lock className="w-5 h-5 text-ink/30 flex-shrink-0" />
                )}
                <span className={`${
                  step.status === 'locked' ? 'text-ink/40' : 'text-ink'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Next Action */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-display font-bold text-ink mb-4">Prochaine étape</h3>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-1">Obtenir l&apos;apostille</h4>
              <p className="text-sm text-ink/60">
                Rendez-vous au Ministère des Affaires Étrangères pour faire apostiller votre diplôme
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Commencer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Deadlines */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-display font-bold text-ink mb-4">Deadlines importantes</h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  deadline.priority === 'high' ? 'text-italian-red' :
                  deadline.priority === 'medium' ? 'text-orange-500' :
                  'text-italian-green'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{deadline.title}</p>
                  <p className="text-xs text-ink/60">Dans {deadline.daysLeft} jours</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Guide Quick Access */}
        <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="text-lg font-display font-bold text-ink mb-4">Guide IA</h3>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-ink/70">
              Posez vos questions sur le processus de candidature
            </p>
            {profile?.tier === 'free' && (
              <Badge variant="outline" className="border-accent/50 text-accent">
                5 questions/jour
              </Badge>
            )}
            {(profile?.tier === 'premium' || profile?.tier === 'vip') && (
              <Badge className="bg-accent text-white">
                Questions illimitées
              </Badge>
            )}
            <Link href="/chat">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Ouvrir le chat
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-display font-bold text-ink mb-4">Fonctionnalités</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-4 md:p-6 relative overflow-hidden group hover:shadow-lg transition-all">
                {feature.comingSoon && (
                  <Badge className="absolute top-3 right-3 bg-accent text-white text-xs">
                    Bientôt
                  </Badge>
                )}
                {feature.locked && !feature.comingSoon && (
                  <Lock className="absolute top-3 right-3 w-4 h-4 text-ink/40" />
                )}
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-ink mb-1">{feature.title}</h3>
                <p className="text-sm text-ink/60 mb-4">{feature.description}</p>
                {feature.locked && !feature.comingSoon && (
                  <Link href="/upgrade">
                    <Button variant="outline" size="sm" className="w-full">
                      Débloquer
                    </Button>
                  </Link>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* CTA for Free Users */}
      {profile?.tier === 'free' && (
        <Card className="p-4 md:p-8 bg-gradient-to-r from-primary to-accent text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                Passez en Premium
              </h3>
              <p className="text-white/90">
                Débloquez toutes les fonctionnalités pour seulement 249 TND
              </p>
            </div>
            <Link href="/upgrade">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Voir les offres
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
