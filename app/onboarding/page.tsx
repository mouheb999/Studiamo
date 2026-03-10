'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { 
  GraduationCap, 
  Briefcase, 
  Target, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react'

const DEGREE_OPTIONS = [
  { value: 'licence', label: 'Licence (Bac+3)', icon: '🎓' },
  { value: 'master', label: 'Master (Bac+5)', icon: '🏆' },
  { value: 'ingenieur', label: 'Ingénieur (Bac+5)', icon: '⚙️' },
  { value: 'bts', label: 'BTS / Technicien Supérieur', icon: '📋' },
]

const FIELD_OPTIONS = [
  'Informatique / IT',
  'Génie Civil',
  'Génie Électrique',
  'Architecture',
  'Médecine / Pharmacie',
  'Commerce / Gestion',
  'Droit',
  'Lettres / Sciences Humaines',
  'Sciences (Math, Physique, Chimie)',
  'Autre',
]

const ITALIAN_LEVELS = [
  { value: 'none', label: 'Aucun' },
  { value: 'A1', label: 'A1' },
  { value: 'A2', label: 'A2' },
  { value: 'B1', label: 'B1' },
  { value: 'B2', label: 'B2' },
  { value: 'C1', label: 'C1' },
]

const CITIES = [
  'Roma', 'Milano', 'Torino', 'Bologna', 'Napoli', 'Firenze', 'Palermo', 'Altro'
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [degreeType, setDegreeType] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [customField, setCustomField] = useState('')
  const [targetField, setTargetField] = useState('')
  const [customTargetField, setCustomTargetField] = useState('')
  const [sameField, setSameField] = useState(false)
  const [italianLevel, setItalianLevel] = useState('none')
  const [cityPreferences, setCityPreferences] = useState<string[]>([])
  const [intakeYear, setIntakeYear] = useState(2025)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const toggleCity = (city: string) => {
    setCityPreferences(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    )
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return degreeType !== ''
      case 2:
        return fieldOfStudy !== '' && (fieldOfStudy !== 'Autre' || customField !== '')
      case 3:
        return sameField || (targetField !== '' && (targetField !== 'Autre' || customTargetField !== ''))
      case 4:
        return true
      case 5:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const finalFieldOfStudy = fieldOfStudy === 'Autre' ? customField : fieldOfStudy
    const finalTargetField = sameField 
      ? finalFieldOfStudy 
      : (targetField === 'Autre' ? customTargetField : targetField)

    const { error } = await supabase
      .from('student_profiles')
      .upsert({
        user_id: user.id,
        degree_type: degreeType,
        field_of_study: finalFieldOfStudy,
        target_field: finalTargetField,
        italian_level: italianLevel,
        city_preferences: cityPreferences,
        intake_year: intakeYear,
        onboarding_completed: true,
      }, {
        onConflict: 'user_id'
      })

    setLoading(false)

    if (error) {
      console.error('Error saving profile:', error)
    } else {
      router.push('/dashboard')
    }
  }

  const getRoadmapSteps = () => {
    return [
      'Obtenir l\'apostille sur votre diplôme',
      'Faire traduire vos diplômes par un traducteur assermenté',
      'Prendre rendez-vous au Consulat d\'Italie à Tunis',
      'Créer votre compte Universitaly',
      'Choisir 3 universités cibles et soumettre vos candidatures',
    ]
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-display font-bold text-primary">StudiAmo</h1>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-ink/60 hover:text-ink"
          >
            Sauvegarder et quitter
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-ink">Étape {step} sur {totalSteps}</span>
            <span className="text-sm text-ink/60">{Math.round(progress)}% complété</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Step 1: Degree Type */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-ink mb-2">
                  Quel est votre diplôme actuel ?
                </h2>
                <p className="text-ink/60">Sélectionnez votre niveau d&apos;études</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEGREE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDegreeType(option.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      degreeType === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-ink/10 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <div className="font-semibold text-ink">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Field of Study */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Briefcase className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-ink mb-2">
                  Qu&apos;avez-vous étudié ?
                </h2>
                <p className="text-ink/60">Votre domaine d&apos;études actuel</p>
              </div>

              <div className="space-y-3">
                {FIELD_OPTIONS.map((field) => (
                  <button
                    key={field}
                    onClick={() => setFieldOfStudy(field)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      fieldOfStudy === field
                        ? 'border-primary bg-primary/5'
                        : 'border-ink/10 hover:border-primary/50'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>

              {fieldOfStudy === 'Autre' && (
                <div className="mt-4">
                  <Label htmlFor="customField">Précisez votre domaine</Label>
                  <Input
                    id="customField"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                    placeholder="Ex: Design graphique"
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Target Field */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-ink mb-2">
                  Qu&apos;aimeriez-vous étudier en Italie ?
                </h2>
                <p className="text-ink/60">Votre domaine cible</p>
              </div>

              <button
                onClick={() => setSameField(!sameField)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  sameField
                    ? 'border-primary bg-primary/5'
                    : 'border-ink/10 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Même domaine que mes études actuelles</span>
                  {sameField && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </div>
              </button>

              {!sameField && (
                <div className="space-y-3 mt-6">
                  {FIELD_OPTIONS.map((field) => (
                    <button
                      key={field}
                      onClick={() => setTargetField(field)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        targetField === field
                          ? 'border-primary bg-primary/5'
                          : 'border-ink/10 hover:border-primary/50'
                      }`}
                    >
                      {field}
                    </button>
                  ))}

                  {targetField === 'Autre' && (
                    <div className="mt-4">
                      <Label htmlFor="customTargetField">Précisez votre domaine cible</Label>
                      <Input
                        id="customTargetField"
                        value={customTargetField}
                        onChange={(e) => setCustomTargetField(e.target.value)}
                        placeholder="Ex: Intelligence Artificielle"
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Preferences */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-ink mb-2">
                  Vos préférences
                </h2>
                <p className="text-ink/60">Aidez-nous à personnaliser votre expérience</p>
              </div>

              {/* Italian Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Niveau d&apos;italien</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {ITALIAN_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setItalianLevel(level.value)}
                      className={`p-3 rounded-lg border-2 transition-all font-medium ${
                        italianLevel === level.value
                          ? 'border-primary bg-primary text-white'
                          : 'border-ink/10 hover:border-primary/50'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Preferences */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Villes préférées (plusieurs choix possibles)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => toggleCity(city)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        cityPreferences.includes(city)
                          ? 'border-primary bg-primary/5'
                          : 'border-ink/10 hover:border-primary/50'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intake Year */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Année de rentrée</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIntakeYear(2025)}
                    className={`p-4 rounded-lg border-2 transition-all font-medium ${
                      intakeYear === 2025
                        ? 'border-primary bg-primary/5'
                        : 'border-ink/10 hover:border-primary/50'
                    }`}
                  >
                    2025
                  </button>
                  <button
                    onClick={() => setIntakeYear(2026)}
                    className={`p-4 rounded-lg border-2 transition-all font-medium ${
                      intakeYear === 2026
                        ? 'border-primary bg-primary/5'
                        : 'border-ink/10 hover:border-primary/50'
                    }`}
                  >
                    2026
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-italian-green mx-auto mb-4" />
                <h2 className="text-3xl font-display font-bold text-ink mb-2">
                  Votre roadmap personnalisée
                </h2>
                <p className="text-ink/60">Basée sur votre profil, voici vos prochaines étapes</p>
              </div>

              <div className="bg-white rounded-xl border border-ink/10 p-6 space-y-4">
                {getRoadmapSteps().map((stepText, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-ink flex-1 pt-1">{stepText}</p>
                  </div>
                ))}
              </div>

              <div className="bg-mist rounded-xl p-6 border border-primary/20">
                <p className="text-ink/70 text-sm">
                  <strong className="text-ink">Note:</strong> Ces étapes sont personnalisées selon votre profil. 
                  Vous pourrez suivre votre progression et obtenir de l&apos;aide à chaque étape dans votre tableau de bord.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90"
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-italian-green hover:bg-italian-green/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Finalisation...
                  </>
                ) : (
                  <>
                    Commencer mon voyage
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
