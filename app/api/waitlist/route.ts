import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'waitlist.csv')

    try {
      // Check if file exists
      await fs.access(filePath)
    } catch {
      // Return empty array if file doesn't exist
      return NextResponse.json({ entries: [] })
    }

    // Read and parse CSV file
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const lines = fileContent.split('\n')
    
    // Remove header and empty lines, then parse entries
    const entries = lines
      .slice(1) // Skip header
      .filter(line => line.trim()) // Remove empty lines
      .map(line => {
        const [timestamp, email, userType] = line.split(',')
        return { timestamp, email, userType }
      })

    return NextResponse.json({ entries })
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
    const { email, userType } = await request.json()

    // Validate input
    if (!email || !userType) {
      return NextResponse.json(
        { error: 'Email and user type are required' },
        { status: 400 }
      )
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir)
    }

    const filePath = path.join(dataDir, 'waitlist.csv')
    const timestamp = new Date().toISOString()
    const newEntry = `${timestamp},${email},${userType}\n`

    try {
      // Check if file exists
      await fs.access(filePath)
    } catch {
      // Create file with headers if it doesn't exist
      await fs.writeFile(filePath, 'timestamp,email,userType\n')
    }

    // Append new entry
    await fs.appendFile(filePath, newEntry)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving waitlist entry:', error)
    return NextResponse.json(
      { error: 'Failed to save waitlist entry' },
      { status: 500 }
    )
  }
} 