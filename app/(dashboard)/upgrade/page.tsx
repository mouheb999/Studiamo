'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  Sparkles, 
  Crown, 
  MessageSquare,
  FileText,
  Building2,
  Target,
  DollarSign,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const WHATSAPP_NUMBER = '21612345678' // Replace with actual number

export default function UpgradePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handlePremiumUpgrade = () => {
    // Show modal for now (payment integration coming soon)
    alert('Paiement bientôt disponible. En attendant, contactez-nous sur WhatsApp pour débloquer votre accès Premium manuellement.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20pack%20Premium%20StudiAmo%20(249%20TND)`, '_blank')
  }

  const handleVipUpgrade = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20pack%20VIP%20StudiAmo%20(949%20TND)`, '_blank')
  }

  const faqs = [
    {
      question: 'Comment fonctionne le paiement ?',
      answer: 'Nous acceptons les paiements via Konnect (carte bancaire tunisienne, D17, e-dinar). Le paiement est sécurisé et vous recevez un accès immédiat après confirmation.',
    },
    {
      question: 'Le VIP, comment ça marche exactement ?',
      answer: 'Avec le pack VIP, nous nous occupons de TOUT : rendez-vous au consulat, traductions, apostilles, création du compte Universitaly, soumission des candidatures. Vous n\'avez qu\'à nous fournir vos documents et nous gérons le reste.',
    },
    {
      question: 'Puis-je passer du Premium au VIP ?',
      answer: 'Oui ! Si vous avez déjà le Premium et souhaitez passer au VIP, vous ne payez que la différence (700 TND). Contactez-nous sur WhatsApp pour effectuer la mise à niveau.',
    },
    {
      question: 'Et si je ne suis pas accepté ?',
      answer: 'Le pack VIP inclut une garantie : si vous n\'êtes accepté dans aucune des 3 universités que nous ciblons ensemble, nous vous remboursons 50% du montant payé.',
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge className="bg-accent text-white mb-4">OFFRES PREMIUM</Badge>
        <h1 className="text-4xl font-display font-bold text-ink mb-4">
          Choisissez votre plan
        </h1>
        <p className="text-lg text-ink/60">
          Débloquez toutes les fonctionnalités et maximisez vos chances d&apos;admission
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="p-6 relative border-ink/10">
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-ink/40 mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-ink mb-2">Gratuit</h3>
            <div className="text-4xl font-bold text-ink mb-2">0 TND</div>
            <p className="text-sm text-ink/60">Pour découvrir la plateforme</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-green flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">5 questions IA par jour</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-green flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Roadmap personnalisée</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-green flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Guides de base</span>
            </div>
          </div>

          <Button disabled className="w-full" variant="outline">
            Plan actuel
          </Button>
        </Card>

        {/* Premium Plan */}
        <Card className="p-6 relative border-2 border-primary shadow-xl scale-105">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
            POPULAIRE
          </Badge>

          <div className="text-center mb-6">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-ink mb-2">Premium</h3>
            <div className="text-4xl font-bold text-primary mb-2">249 TND</div>
            <p className="text-sm text-ink/60">Paiement unique</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink font-medium">Questions IA illimitées</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Hub de documents complet</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Base de 50+ universités</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Assistant d&apos;IA personnel</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Finder de bourses</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Support prioritaire</span>
            </div>
          </div>

          <Button onClick={handlePremiumUpgrade} className="w-full bg-primary hover:bg-primary/90">
            Passer en Premium
          </Button>
        </Card>

        {/* VIP Plan */}
        <Card className="p-6 relative border-2 border-italian-red">
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-italian-red text-white">
            TOUT INCLUS
          </Badge>

          <div className="text-center mb-6">
            <Crown className="w-12 h-12 text-italian-red mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-ink mb-2">VIP</h3>
            <div className="text-4xl font-bold text-italian-red mb-2">949 TND</div>
            <p className="text-sm text-ink/60">On s&apos;occupe de tout</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink font-medium">Tout du Premium +</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Rendez-vous consulat pris</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Traductions gérées</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Apostilles obtenues</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Compte Universitaly créé</span>
            </div>
            <div className="flex items-start space-x-2">
              <Check className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink">Candidatures soumises</span>
            </div>
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-italian-red flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink font-medium">Garantie remboursement 50%</span>
            </div>
          </div>

          <Button onClick={handleVipUpgrade} className="w-full bg-italian-red hover:bg-italian-red/90 text-white">
            Demander VIP
          </Button>
        </Card>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-ink mb-6 text-center">
          Comparaison détaillée
        </h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-mist">
                <tr>
                  <th className="text-left p-4 font-semibold text-ink">Fonctionnalité</th>
                  <th className="text-center p-4 font-semibold text-ink">Gratuit</th>
                  <th className="text-center p-4 font-semibold text-primary">Premium</th>
                  <th className="text-center p-4 font-semibold text-italian-red">VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                <tr>
                  <td className="p-4 text-ink">Questions IA</td>
                  <td className="p-4 text-center text-ink/60">5/jour</td>
                  <td className="p-4 text-center text-primary font-semibold">Illimité</td>
                  <td className="p-4 text-center text-italian-red font-semibold">Illimité</td>
                </tr>
                <tr className="bg-mist/30">
                  <td className="p-4 text-ink">Documents Hub</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-italian-red mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-ink">Base universités</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-italian-red mx-auto" /></td>
                </tr>
                <tr className="bg-mist/30">
                  <td className="p-4 text-ink">Assistant candidature</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-italian-red mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-ink">Service conciergerie</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-italian-red mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-display font-bold text-ink mb-6 text-center">
          Questions fréquentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-mist/30 transition-colors"
              >
                <span className="font-semibold text-ink">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-ink/60 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-ink/60 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4 text-ink/70">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="p-8 bg-gradient-to-r from-primary to-accent text-white max-w-4xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold mb-2">
            Prêt à commencer votre voyage ?
          </h3>
          <p className="text-white/90 mb-6">
            Rejoignez des centaines d&apos;étudiants tunisiens qui réalisent leur rêve d&apos;étudier en Italie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handlePremiumUpgrade} size="lg" className="bg-white text-primary hover:bg-white/90">
              Choisir Premium
            </Button>
            <Button onClick={handleVipUpgrade} size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Choisir VIP
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
