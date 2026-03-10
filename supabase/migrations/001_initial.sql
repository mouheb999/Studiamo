-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  tier text not null default 'free' check (tier in ('free', 'premium', 'vip')),
  preferred_lang text default 'fr' check (preferred_lang in ('ar', 'fr', 'en')),
  questions_today int default 0,
  questions_reset_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- STUDENT PROFILES (onboarding data)
create table public.student_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique,
  degree_type text,
  field_of_study text,
  target_field text,
  italian_level text default 'none',
  city_preferences text[] default '{}',
  budget_range text,
  intake_year int default 2025,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

-- DOCUMENTS
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  doc_type text not null,
  storage_path text,
  status text default 'needed' check (status in ('needed', 'in_progress', 'uploaded', 'valid', 'needs_action')),
  audit_result jsonb,
  notes text,
  uploaded_at timestamptz,
  created_at timestamptz default now()
);

-- APPLICATIONS
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  university_name text not null,
  program_name text,
  city text,
  deadline date,
  status text default 'planning' check (status in ('planning', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted')),
  universitaly_link text,
  notes text,
  submitted_at timestamptz,
  created_at timestamptz default now()
);

-- CHAT SESSIONS
create table public.chat_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  messages jsonb default '[]'::jsonb,
  token_count int default 0,
  created_at timestamptz default now(),
  last_message_at timestamptz default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.documents enable row level security;
alter table public.applications enable row level security;
alter table public.chat_sessions enable row level security;

-- RLS Policies (users can only see their own data)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view own student profile" on public.student_profiles for select using (auth.uid() = user_id);
create policy "Users can insert own student profile" on public.student_profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own student profile" on public.student_profiles for update using (auth.uid() = user_id);
create policy "Users can delete own student profile" on public.student_profiles for delete using (auth.uid() = user_id);
create policy "Users own documents" on public.documents for all using (auth.uid() = user_id);
create policy "Users own applications" on public.applications for all using (auth.uid() = user_id);
create policy "Users own chat sessions" on public.chat_sessions for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
