import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['de', 'en', 'ro']
const defaultLocale = 'de'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes are locale-free — never redirect them
  if (pathname.startsWith('/admin')) return

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip _next internals, api, static files, and admin routes
    '/((?!_next|api|admin|favicon.ico|wp-content|images|.*\\..*).*)',
  ],
}
