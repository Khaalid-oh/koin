import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Initialize rate limiting map
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 50 // Maximum requests per minute

// JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip || 'unknown'
  
  // Basic rate limiting for all API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Skip rate limiting for auth endpoint
    if (!request.nextUrl.pathname.startsWith('/api/auth')) {
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
          { 
            status: 429, 
            headers: { 
              'Content-Type': 'application/json',
              'Retry-After': '60'
            } 
          }
        )
      }
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      console.log('No auth token found, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const verified = await jwtVerify(token, JWT_SECRET)
      
      if (verified.payload.role !== 'admin') {
        console.log('Invalid role in token:', verified.payload.role)
        throw new Error('Insufficient permissions')
      }

      console.log('Token verified successfully')
      return NextResponse.next()
    } catch (error) {
      console.error('Token verification failed:', error)
      // Clear invalid cookie
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
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