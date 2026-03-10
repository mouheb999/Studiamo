'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Sparkles, Loader2, AlertCircle } from 'lucide-react'
import type { Profile, ChatMessage } from '@/lib/types'
import Link from 'next/link'

const SUGGESTED_QUESTIONS = [
  "Comment obtenir l'apostille ?",
  "Qu'est-ce que la Dichiarazione di Valore ?",
  "Quelles universités acceptent ma licence informatique ?",
  "Comment s'inscrire sur Universitaly ?",
  "Quels sont les frais de candidature ?",
  "Comment obtenir la bourse DSU ?",
]

export default function ChatPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [questionsRemaining, setQuestionsRemaining] = useState<number | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input
    if (!textToSend.trim() || loading) return

    // Check free tier limit
    if (profile?.tier === 'free' && questionsRemaining !== null && questionsRemaining <= 0) {
      setShowUpgradeModal(true)
      return
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        assistantMessage += chunk

        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date().toISOString(),
          }
          return newMessages
        })
      }

      // Update questions count for free tier
      if (profile?.tier === 'free' && questionsRemaining !== null) {
        setQuestionsRemaining(questionsRemaining - 1)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
        timestamp: new Date().toISOString(),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-ink/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-ink">Guide IA StudiAmo</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-italian-green"></div>
              <span className="text-xs text-ink/60">En ligne</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {profile?.tier === 'free' && questionsRemaining !== null && (
            <Badge variant="outline" className="border-accent/50 text-accent">
              {questionsRemaining}/5 questions restantes
            </Badge>
          )}
          {(profile?.tier === 'premium' || profile?.tier === 'vip') && (
            <Badge className="bg-accent text-white">
              Questions illimitées
            </Badge>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-ink mb-2">
                Bonjour ! Comment puis-je vous aider ?
              </h2>
              <p className="text-ink/60">
                Posez-moi n'importe quelle question sur votre candidature aux universités italiennes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="p-4 rounded-lg border-2 border-ink/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-left text-sm text-ink"
                >
                  {question}
                </button>
              ))}
            </div>

            <p className="text-xs text-ink/40">
              Réponses basées sur le processus réel pour étudiants tunisiens
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <Avatar className={`w-8 h-8 flex-shrink-0 ${
                    message.role === 'assistant' ? 'bg-primary/10' : 'bg-accent/10'
                  }`}>
                    <AvatarFallback className={
                      message.role === 'assistant' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-accent/10 text-accent'
                    }>
                      {message.role === 'assistant' ? '🎓' : profile?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-mist border border-primary/10 text-ink'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <Avatar className="w-8 h-8 flex-shrink-0 bg-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary">🎓</AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl px-4 py-3 bg-mist border border-primary/10">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-ink/10 p-6">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex space-x-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-xs text-center text-ink/40 mt-3">
            Réponses basées sur le processus réel pour étudiants tunisiens
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-md w-full p-6 space-y-4">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-ink mb-2">
                Limite atteinte
              </h3>
              <p className="text-ink/60 mb-4">
                Vous avez utilisé vos 5 questions gratuites aujourd'hui.
              </p>
            </div>

            <div className="bg-mist rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">Premium</span>
                <span className="text-primary font-bold">249 TND</span>
              </div>
              <ul className="text-sm text-ink/70 space-y-1">
                <li>✓ Questions illimitées</li>
                <li>✓ Toutes les fonctionnalités</li>
                <li>✓ Support prioritaire</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1"
              >
                Fermer
              </Button>
              <Link href="/upgrade" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Passer Premium
                </Button>
              </Link>
            </div>

            <p className="text-xs text-center text-ink/50">
              Ou revenez demain pour 5 nouvelles questions gratuites
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}
