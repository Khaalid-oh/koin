import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

export async function GET() {
  try {
    const { data: entries, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('timestamp', { ascending: false })

    if (error) {
      console.error('Supabase GET error:', error)
      throw error
    }

    // Transform the data to ensure correct field names
    const transformedEntries = entries.map(entry => ({
      timestamp: entry.timestamp,
      email: entry.email,
      userType: entry.user_type // Map from snake_case to camelCase
    }))
    
    return NextResponse.json({ entries: transformedEntries })
  } catch (error) {
    console.error('Error reading waitlist entries:', error)
    return NextResponse.json(
      { error: 'Failed to read waitlist entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, userType } = body

    // Validate input
    if (!email || !userType) {
      return NextResponse.json(
        { error: 'Email and user type are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing user:', checkError)
      throw new Error(`Failed to check existing user: ${checkError.message}`)
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Insert new entry
    const timestamp = new Date().toISOString()
    const { error: insertError, data } = await supabase
      .from('waitlist')
      .insert({
        timestamp,
        email,
        user_type: userType
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      })
      throw new Error(`Failed to insert: ${insertError.message}`)
    }

    // Transform the response data
    const transformedData = {
      timestamp: data.timestamp,
      email: data.email,
      userType: data.user_type
    }

    return NextResponse.json({ 
      success: true, 
      data: transformedData,
      message: 'Successfully added to waitlist'
    })
  } catch (error: any) {
    console.error('Error saving waitlist entry:', error)
    return NextResponse.json(
      { 
        error: 'Failed to save waitlist entry',
        details: error.message
      },
      { status: 500 }
    )
  }
} 