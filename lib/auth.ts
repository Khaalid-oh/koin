import { jwtVerify } from 'jose'

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch {
    return null
  }
} 