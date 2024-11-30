import Airtable from 'airtable'

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Missing AIRTABLE_API_KEY')
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('Missing AIRTABLE_BASE_ID')
}

// Define user role types
export type UserRole = 'athlete' | 'trainer'

// Define record structure
export interface WaitlistRecord {
  id?: string
  timestamp: string
  email: string
  userRole: UserRole
  status?: 'pending' | 'approved' | 'rejected'
  notes?: string
}

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base(process.env.AIRTABLE_BASE_ID)
const table = base('Waitlist')

// Helper function to format record for Airtable
export const formatRecord = (data: Partial<WaitlistRecord>) => ({
  fields: {
    timestamp: data.timestamp || new Date().toISOString(),
    email: data.email,
    userRole: data.userRole,
    status: data.status || 'pending',
    notes: data.notes || ''
  }
})

// Helper function to parse Airtable record
export const parseRecord = (record: any): WaitlistRecord => ({
  id: record.id,
  timestamp: record.get('timestamp') as string,
  email: record.get('email') as string,
  userRole: record.get('userRole') as UserRole,
  status: record.get('status') as 'pending' | 'approved' | 'rejected',
  notes: record.get('notes') as string
})

export { base, table } 