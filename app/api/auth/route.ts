import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const isValid = password === process.env.ADMIN_PASSWORD

    return NextResponse.json({ success: isValid })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 