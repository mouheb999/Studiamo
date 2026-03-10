'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Loader2, MessageSquare, GraduationCap, FileText } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) setError(error.message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError('Email ou mot de passe incorrect')
    } else {
      router.push(redirect)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 md:p-8 bg-bg">
        <div className="w-full max-w-md">
          {/* Logo on mobile */}
          <div className="md:hidden flex justify-center mb-8">
            <Logo size="md" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">Bon retour !</h2>
            <p className="text-ink/60">Connectez-vous pour continuer votre parcours</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google OAuth */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-ink/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-bg px-2 text-ink/50">ou</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmed@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-base"
                  style={{ fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-ink/70 cursor-pointer"
              >
                Se souvenir de moi
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60">
            Vous n'avez pas de compte ?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Commencer gratuitement →
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Animated Preview - Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-dark-bg text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[9px] flex">
          <div className="flex-1 bg-italian-green"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-italian-red"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-white">
            <Logo size="lg" />
          </div>
          <p className="text-xl text-white/80">Tout ce dont vous avez besoin pour étudier en Italie</p>
        </div>

        {/* Animated Chat Preview */}
        <div className="relative z-10 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-fade-in">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white/90 text-sm">
                  "Comment obtenir l'apostille sur mon diplôme ?"
                </p>
                <p className="text-white/50 text-xs mt-2">Réponse instantanée par IA</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-white/90 text-sm">
                  50+ universités italiennes dans notre base de données
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-italian-green/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-italian-green" />
              </div>
              <div>
                <p className="text-white/90 text-sm">
                  Guides complets pour chaque document requis
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
