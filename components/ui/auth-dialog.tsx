import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface AuthDialogProps {
  open?: boolean
  onSuccess?: () => void
}

export function AuthDialog({ 
  open = true,
  onSuccess
}: AuthDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!password) {
      setError("Please enter password")
      setLoading(false)
      return
    }

    try {
      console.log("Attempting authentication...")
      
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log("Authentication successful")
        // Add a small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100))
        // Call success callback if provided
        onSuccess?.()
        // Refresh the current page to reflect new auth state
        router.refresh()
      } else {
        console.log("Authentication failed:", data.error)
        setError(data.error || "Invalid credentials")
      }
    } catch (error) {
      console.error("Auth error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Admin Access Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter your password to access the admin area.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full"
            disabled={loading}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Continue"}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
} 