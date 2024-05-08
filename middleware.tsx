

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = [
    '/main'
]
const publicRoutes = [
    '/auth/signin', 
    '/auth/signup', 
    '/auth/forgot'
]
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const session = JSON.parse(cookies().get('session')?.value.toString() || '{}')
  
 
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith('/main')
  ) {
    return NextResponse.redirect(new URL('/main', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}