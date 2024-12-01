'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react'

interface WaitlistEntry {
  timestamp: string
  email: string
  userType: 'athlete' | 'trainer'
}

export default function AdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch if authenticated
    if (isAuthenticated) {
      fetch('/api/waitlist')
        .then(res => res.json())
        .then(data => {
          setEntries(data.entries)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching entries:', error)
          setLoading(false)
        })
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        setError('Incorrect password')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  const downloadCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Timestamp,Email,User Type\n' +
      entries.map(entry => 
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
        // Remove the entry from the local state
        setEntries(entries.filter(entry => entry.email !== email))
      } else {
        console.error('Failed to delete entry:', data.error)
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
            <p className="mt-2 text-gray-600">Enter password to view waitlist entries</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full"
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Waitlist Entries</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              onClick={downloadCSV}
              className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
            >
              Download CSV
            </Button>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-1 sm:hidden gap-4 p-4">
              {entries.map((entry, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium text-gray-900">{entry.email}</div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the waitlist entry for {entry.email}.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(entry.email)}
                              className="bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                    <Badge 
                      variant={entry.userType as 'athlete' | 'trainer'} 
                      className="mt-2"
                    >
                      {entry.userType}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>

            <table className="hidden sm:table min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={entry.userType as 'athlete' | 'trainer'}>
                        {entry.userType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the waitlist entry for {entry.email}.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(entry.email)}
                              className="bg-red-600 text-white hover:bg-red-700"
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
        </div>

        {entries.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No entries yet</p>
        )}
      </div>
    </div>
  )
} 