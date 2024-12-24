import { jwtVerify } from 'jose'

// Default to a development secret if JWT_SECRET is not set
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'development_secret' : undefined)
)

// Only throw error in production if JWT_SECRET is missing
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('Missing JWT_SECRET environment variable in production')
}

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch {
    return null
  }
} 