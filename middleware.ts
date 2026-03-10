import { type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Public routes
  const publicRoutes = ['/', '/login', '/register']
  const isPublicRoute = publicRoutes.includes(pathname)

  // Protected routes
  const protectedRoutes = [
    '/dashboard',
    '/documents',
    '/universities',
    '/apply',
    '/scholarships',
    '/chat',
    '/upgrade',
    '/onboarding'
  ]
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Get user session
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect logic
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if ((pathname === '/login' || pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (user && isProtectedRoute && pathname !== '/onboarding') {
    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('onboarding_completed')
      .eq('user_id', user.id)
      .single()

    if (!studentProfile?.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
