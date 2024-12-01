'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AuthDialog } from "@/components/ui/auth-dialog"
import { Trash2, ArrowUpDown, Download } from 'lucide-react'

interface WaitlistEntry {
  timestamp: string
  email: string
  userType: 'athlete' | 'trainer'
}

type SortField = 'timestamp' | 'email' | 'userType'
type SortOrder = 'asc' | 'desc'

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('timestamp')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check', {
        credentials: 'include'
      })
      const data = await response.json()
      setIsAuthenticated(data.success)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries()
    }
  }, [isAuthenticated])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/waitlist')
      const data = await response.json()
      setEntries(data.entries)
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedEntries = [...entries].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1
    switch (sortField) {
      case 'timestamp':
        return (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) * order
      case 'email':
        return a.email.localeCompare(b.email) * order
      case 'userType':
        return a.userType.localeCompare(b.userType) * order
      default:
        return 0
    }
  })

  const downloadCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Timestamp,Email,User Type\n' +
      sortedEntries.map(entry => 
        `${entry.timestamp},${entry.email},${entry.userType}`
      ).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `waitlist-${new Date().toISOString()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (email: string) => {
    try {
      const response = await fetch(`/api/waitlist?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setEntries(entries.filter(entry => entry.email !== email))
      } else {
        console.error('Failed to delete entry:', data.error)
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthDialog open={true} onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Waitlist Entries</h1>
          <p className="text-gray-500 mt-2">Total entries: {entries.length}</p>
        </div>
        <Button onClick={downloadCSV} className="gap-2">
          <Download className="h-4 w-4" /> Download CSV
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-left">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('timestamp')}
                    className="font-semibold text-sm flex items-center gap-2 hover:bg-transparent"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-4 text-left">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('email')}
                    className="font-semibold text-sm flex items-center gap-2 hover:bg-transparent"
                  >
                    Email
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-4 text-left">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('userType')}
                    className="font-semibold text-sm flex items-center gap-2 hover:bg-transparent"
                  >
                    Type
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedEntries.map((entry) => (
                <tr key={entry.email} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={entry.userType === 'athlete' ? 'athlete' : 'trainer'}
                      className="text-xs"
                    >
                      {entry.userType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this entry? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(entry.email)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No entries found</p>
        </div>
      )}
    </div>
  )
} 