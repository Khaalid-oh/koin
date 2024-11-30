import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize rate limiting map
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 50 // Maximum requests per minute

export async function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip || 'unknown'
  
  // Basic rate limiting
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const now = Date.now()
    const windowData = rateLimitMap.get(ip) || { count: 0, timestamp: now }
    
    // Reset counter if outside window
    if (now - windowData.timestamp > RATE_LIMIT_WINDOW) {
      windowData.count = 0
      windowData.timestamp = now
    }
    
    windowData.count++
    rateLimitMap.set(ip, windowData)
    
    if (windowData.count > MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const token = authHeader.split(' ')[1]
    // Verify token validity (implement proper JWT verification)
    if (!isValidToken(token)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ]
}

// TODO: Implement proper token verification
function isValidToken(token: string): boolean {
  // Implement JWT verification here
  return true // Temporary
} 