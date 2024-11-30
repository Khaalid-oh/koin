import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WaitlistFormProps {
  darkMode?: boolean
  buttonText?: string
  className?: string
}

export function WaitlistForm({ darkMode = false, buttonText = "Join Waitlist", className = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'athlete' | 'trainer' | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !userType) {
      setStatus('error')
      setMessage('Please fill in all fields')
      return
    }

    setStatus('loading')
    try {
      console.log('Submitting form with:', { email, userType })
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userType }),
      })

      const data = await response.json()
      console.log('Server response:', data)

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Submission failed')
      }
      
      setStatus('success')
      setMessage('Thanks for joining! We\'ll be in touch soon.')
      setEmail('')
      setUserType(null)
    } catch (error: any) {
      console.error('Form submission error:', error)
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${className} space-y-4`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${
            darkMode
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-gray-100 border-gray-300 text-black'
          } placeholder:text-gray-400`}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            size="lg"
            variant={userType === 'athlete' ? 'default' : 'outline'}
            className={`flex-1 ${
              userType === 'athlete'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : darkMode
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-gray-300 text-black hover:bg-gray-100'
            }`}
            onClick={() => setUserType('athlete')}
          >
            Athlete
          </Button>
          <Button
            type="button"
            size="lg"
            variant={userType === 'trainer' ? 'default' : 'outline'}
            className={`flex-1 ${
              userType === 'trainer'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : darkMode
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-gray-300 text-black hover:bg-gray-100'
            }`}
            onClick={() => setUserType('trainer')}
          >
            Trainer
          </Button>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading'}
        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
      >
        {status === 'loading' ? 'Submitting...' : buttonText}
      </Button>
      {message && (
        <p
          className={`text-sm ${
            status === 'error'
              ? 'text-red-500'
              : status === 'success'
              ? 'text-green-500'
              : ''
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
} 