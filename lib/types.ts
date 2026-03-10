export type UserTier = 'free' | 'premium' | 'vip'
export type Language = 'ar' | 'fr' | 'en'
export type DegreeType = 'licence' | 'master' | 'ingenieur' | 'bts'
export type ItalianLevel = 'none' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type DocumentStatus = 'needed' | 'in_progress' | 'uploaded' | 'valid' | 'needs_action'
export type ApplicationStatus = 'planning' | 'in_progress' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  tier: UserTier
  preferred_lang: Language
  questions_today: number
  questions_reset_at: string
  created_at: string
  updated_at: string
}

export interface StudentProfile {
  id: string
  user_id: string
  degree_type: DegreeType | null
  field_of_study: string | null
  target_field: string | null
  italian_level: ItalianLevel
  city_preferences: string[]
  budget_range: string | null
  intake_year: number
  onboarding_completed: boolean
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  doc_type: string
  storage_path: string | null
  status: DocumentStatus
  audit_result: any
  notes: string | null
  uploaded_at: string | null
  created_at: string
}

export interface Application {
  id: string
  user_id: string
  university_name: string
  program_name: string | null
  city: string | null
  deadline: string | null
  status: ApplicationStatus
  universitaly_link: string | null
  notes: string | null
  submitted_at: string | null
  created_at: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

export interface ChatSession {
  id: string
  user_id: string
  messages: ChatMessage[]
  token_count: number
  created_at: string
  last_message_at: string
}
