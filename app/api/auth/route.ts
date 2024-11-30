import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { createHash } from 'crypto'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; timestamp: number }>()
const LOGIN_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_LOGIN_ATTEMPTS = 5

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Check rate limiting
    const now = Date.now()
    const attempts = loginAttempts.get(ip) || { count: 0, timestamp: now }
    
    if (now - attempts.timestamp > LOGIN_WINDOW) {
      attempts.count = 0
      attempts.timestamp = now
    }
    
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      )
    }

    attempts.count++
    loginAttempts.set(ip, attempts)

    // Hash the provided password
    const hashedPassword = createHash('sha256')
      .update(password)
      .digest('hex')

    // Compare with stored hash
    if (hashedPassword !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return NextResponse.json({ 
      success: true,
      token
    })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 