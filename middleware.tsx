
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SetSessionData } from './app/services/auth0service';
 

const protectedRoutes = [
    '/game/nav',
    '/game/lobby',
]
const publicRoutes = [
    '/auth/signin', 
    '/auth/signup', 
    '/auth/forgot'
]
 
export default async function middleware(req: NextRequest) {
  
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  
  const session = JSON.parse(cookies().get('session')?.value.toString() || '{}')
  
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
  }

  
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith('/game/nav')
  ) {
    return NextResponse.redirect(new URL('/game/nav', req.nextUrl))
  }
 
  return NextResponse.next()
}
 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}