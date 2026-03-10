# StudiAmo — Platform for Tunisian Students Applying to Italian Universities

A comprehensive SaaS platform that guides Tunisian students through the entire process of applying to Italian universities, replacing expensive agencies with AI-powered guidance.

## 🎯 Overview

StudiAmo helps Tunisian students navigate the complex process of applying to Italian universities by providing:
- AI-powered guidance (Claude Sonnet 4)
- Personalized roadmaps
- Document management
- University database
- Application tracking
- Scholarship finder

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Email:** Resend
- **Payments:** Konnect (Tunisian payment gateway)
- **Hosting:** Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Anthropic API key
- Resend API key (optional, for emails)

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd studiamo
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Resend (optional)
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the contents of `supabase/migrations/001_initial.sql`
4. Run the migration

This will create:
- `profiles` table (user profiles)
- `student_profiles` table (onboarding data)
- `documents` table (document tracking)
- `applications` table (university applications)
- `chat_sessions` table (AI chat history)
- Row Level Security (RLS) policies
- Auto-create profile trigger

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
studiamo/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/       # Main dashboard
│   │   ├── documents/       # Document hub (coming soon)
│   │   ├── universities/    # University explorer (coming soon)
│   │   ├── apply/           # Application assistant (coming soon)
│   │   ├── scholarships/    # Scholarship finder (coming soon)
│   │   ├── chat/            # AI chat interface
│   │   └── upgrade/         # Pricing page
│   ├── api/
│   │   └── chat/            # Claude AI streaming endpoint
│   ├── onboarding/          # Multi-step onboarding wizard
│   ├── layout.tsx
│   ├── page.tsx             # Landing page
│   └── globals.css
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components (Sidebar, TopNav)
│   └── shared/              # Shared components (ComingSoon)
├── lib/
│   ├── supabase/            # Supabase client utilities
│   ├── claude.ts            # Anthropic client + system prompt
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
├── supabase/
│   └── migrations/          # Database migrations
└── middleware.ts            # Route protection
```

## 🎨 Design System

### Colors
- **Background:** `#F0F8F8` (light teal-white)
- **Ink:** `#053D4E` (deep teal navy)
- **Primary:** `#007A8A` (mid teal)
- **Accent:** `#00BCD4` (bright cyan)
- **Mist:** `#E0F4F7` (very light teal)
- **Italian Red:** `#8B1A2A` (VIP tier)
- **Italian Green:** `#006B3C` (success states)
- **Dark BG:** `#042D3A` (sidebar)

### Typography
- **Display:** Playfair Display (headings)
- **Body:** DM Sans (UI text)
- **Mono:** DM Mono (labels, tags)

## 🔐 Authentication Flow

1. User registers via `/register` (email/password or Google OAuth)
2. Profile auto-created in database via trigger
3. Redirected to `/onboarding` for 5-step wizard
4. After onboarding completion, redirected to `/dashboard`
5. Middleware enforces authentication and onboarding completion

## 💬 AI Chat System

The AI chat uses Claude Sonnet 4 with streaming responses:

- **Free tier:** 5 questions per day (resets every 24 hours)
- **Premium/VIP:** Unlimited questions
- System prompt includes Tunisian-specific context
- Responses stream in real-time for better UX
- Questions counter enforced at API level

## 💳 Pricing Tiers

### Free (0 TND)
- 5 AI questions per day
- Personalized roadmap
- Basic guides

### Premium (249 TND)
- Unlimited AI questions
- Document hub
- 50+ universities database
- Application assistant
- Scholarship finder
- Priority support

### VIP (949 TND)
- Everything in Premium
- Full concierge service
- Appointments booked
- Translations handled
- Apostilles obtained
- Universitaly account created
- Applications submitted
- 50% refund guarantee

## 🚧 Coming Soon Features

The following pages show "Coming Soon" screens:
- `/documents` - Document hub with upload and AI audit
- `/universities` - University explorer with filters
- `/apply` - Application wizard
- `/scholarships` - Scholarship finder

## 📱 Mobile Responsive

All pages are fully responsive and optimized for mobile devices, as many Tunisian students access the platform via smartphones.

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Middleware protects all dashboard routes
- API routes verify authentication
- Environment variables for sensitive data

## 🌐 Deployment

### Deploy to Vercel

```bash
npm run build
```

Then deploy to Vercel:
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Database Setup on Production

Run the migration in your production Supabase instance before deploying.

## 📝 Environment Variables Checklist

Before deploying, ensure all environment variables are set:

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `ANTHROPIC_API_KEY`
- [ ] `RESEND_API_KEY` (optional)
- [ ] `NEXT_PUBLIC_APP_URL`

## 🐛 Known Issues / TypeScript Warnings

The IDE may show TypeScript errors about `variant` and `size` props on Button and Badge components. These are false positives - the shadcn/ui components are correctly typed and will work properly at runtime.

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

For support, contact via WhatsApp or email (configure in upgrade page).

---

Built with ❤️ for Tunisian students pursuing their Italian university dreams.
