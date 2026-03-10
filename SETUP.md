# StudiAmo Setup Guide

## Quick Start Checklist

Follow these steps to get StudiAmo running locally:

### ✅ Step 1: Install Dependencies

```bash
npm install
```

### ✅ Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready (2-3 minutes)
4. Note down your project URL and anon key

### ✅ Step 3: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial.sql`
4. Paste and click **Run**
5. Verify tables were created in **Table Editor** 

### ✅ Step 4: Get Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### ✅ Step 5: Configure Environment Variables

Create `.env.local` in the root directory:

```bash
# Supabase (from your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Anthropic (from console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-your_key_here

# Resend (optional - for email notifications)
RESEND_API_KEY=re_your_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Where to find Supabase keys:**
- Go to Project Settings → API
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` = service_role key (keep secret!)

### ✅ Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Testing the Platform

### 1. Test Registration
- Go to `/register`
- Create an account with email/password
- Verify you're redirected to onboarding

### 2. Test Onboarding
- Complete all 5 steps of the wizard
- Verify you're redirected to dashboard

### 3. Test Dashboard
- Check that your profile loads
- Verify progress card displays
- Check sidebar navigation

### 4. Test AI Chat
- Go to `/chat`
- Ask a question (e.g., "Comment obtenir l'apostille ?")
- Verify streaming response works
- Check question counter (free tier: 5/day)

### 5. Test Coming Soon Pages
- Visit `/documents`, `/universities`, `/apply`, `/scholarships`
- Verify "Coming Soon" screens display correctly

### 6. Test Upgrade Page
- Go to `/upgrade`
- Check pricing cards display
- Test FAQ accordion

---

## Common Issues & Solutions

### Issue: "Invalid API key" error in chat

**Solution:** Check that your `ANTHROPIC_API_KEY` in `.env.local` is correct and starts with `sk-ant-`

### Issue: Database connection error

**Solution:** 
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
2. Check that the database migration ran successfully
3. Ensure RLS policies are enabled

### Issue: Middleware redirect loop

**Solution:** 
1. Clear browser cookies
2. Restart dev server
3. Check that `student_profiles` table has `onboarding_completed` column

### Issue: TypeScript errors about Button/Badge variants

**Solution:** These are false positives from the IDE. The code will run correctly. The shadcn/ui components are properly typed.

### Issue: Chat not streaming

**Solution:**
1. Check browser console for errors
2. Verify Anthropic API key is valid
3. Check that `/api/chat` route is accessible

---

## Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

### Set Up Production Database

1. Create a production Supabase project
2. Run the migration in production SQL Editor
3. Update environment variables in Vercel

### Configure Custom Domain (Optional)

1. Add domain in Vercel dashboard
2. Update DNS records
3. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Feature Flags

Currently, the following features show "Coming Soon":
- Document Hub (`/documents`)
- University Explorer (`/universities`)
- Application Assistant (`/apply`)
- Scholarship Finder (`/scholarships`)

To enable these features, replace the page content with actual implementations.

---

## Payment Integration

The upgrade page currently shows a modal for payment. To integrate Konnect:

1. Sign up for Konnect merchant account
2. Get API credentials
3. Create `/api/webhooks/payment/route.ts`
4. Implement payment flow in upgrade page
5. Handle webhook callbacks

---

## Monitoring & Analytics

### Add PostHog (Optional)

1. Sign up at [posthog.com](https://posthog.com)
2. Get project API key
3. Install PostHog SDK
4. Add tracking to key pages

### Error Tracking

Consider adding Sentry for error tracking:
```bash
npm install @sentry/nextjs
```

---

## Support

For issues or questions:
- Check the main README.md
- Review Supabase documentation
- Check Anthropic API documentation
- Review Next.js 14 App Router docs

---

## Next Steps

After setup, consider:
1. Implementing the "Coming Soon" features
2. Adding payment integration
3. Setting up email notifications
4. Adding analytics
5. Implementing mobile app (React Native)
6. Adding Arabic language support
7. Building admin dashboard

---

**Platform Status:** ✅ Core features complete and functional
**Ready for:** Development, testing, and initial deployment
