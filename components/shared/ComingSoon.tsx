'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

interface ComingSoonProps {
  icon: string
  title: string
  teaser: string[]
}

export default function ComingSoon({ icon, title, teaser }: ComingSoonProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-mist opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Badge */}
        <Badge className="bg-accent text-white text-sm px-4 py-1.5">
          BIENTÔT DISPONIBLE
        </Badge>

        {/* Icon */}
        <div className="text-8xl">{icon}</div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-display font-bold text-ink mb-3">{title}</h1>
          <p className="text-xl text-ink/60">Bientôt disponible</p>
        </div>

        {/* Description */}
        <p className="text-lg text-ink/70 max-w-xl mx-auto">
          Nous construisons quelque chose d&apos;extraordinaire. Cette fonctionnalité sera disponible très prochainement.
        </p>

        {/* Email Notification Form */}
        <div className="bg-white rounded-xl border border-ink/10 p-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-ink mb-4">Soyez le premier informé</h3>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Notifier moi
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-italian-green py-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Merci ! Nous vous tiendrons informé.</span>
            </div>
          )}
        </div>

        {/* Teaser Features */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-ink/10 p-6 max-w-md mx-auto">
          <h4 className="font-semibold text-ink mb-4">Ce qui arrive :</h4>
          <ul className="space-y-3 text-left">
            {teaser.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-ink/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
