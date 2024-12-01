import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { createHash } from 'crypto'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

if (!process.env.ADMIN_PASSWORD_HASH) {
  throw new Error('Missing ADMIN_PASSWORD_HASH environment variable')
}

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const TOKEN_EXPIRY = '2h' // 2 hours

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; timestamp: number }>()
const LOGIN_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_LOGIN_ATTEMPTS = 5

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    console.log('Attempting login with password:', password)
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

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

    console.log('Auth debug:')
    console.log('Provided password hash:', hashedPassword)
    console.log('Expected password hash:', ADMIN_PASSWORD_HASH)
    console.log('Match:', hashedPassword === ADMIN_PASSWORD_HASH)

    // Compare with stored hash
    if (hashedPassword !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await new SignJWT({ 
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(JWT_SECRET)

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({ 
      success: true,
      message: 'Authentication successful'
    })

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7200 // 2 hours in seconds
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 