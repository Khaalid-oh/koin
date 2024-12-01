import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info } from 'lucide-react'

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
  const [touched, setTouched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!userType) {
      setStatus('error')
      setMessage('Please select if you are an Athlete or Trainer')
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
      setTouched(false)
    } catch (error: any) {
      console.error('Form submission error:', error)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const showError = touched && !userType

  return (
    <form onSubmit={handleSubmit} className={`${className} space-y-4`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
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
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4 text-orange-500" />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Select your role below
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="lg"
            variant={userType === 'athlete' ? 'default' : 'outline'}
            className={`flex-1 ${
              userType === 'athlete'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : showError
                ? 'border-red-300 hover:border-red-400'
                : darkMode
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-gray-300 text-black hover:bg-gray-100'
            } transition-colors`}
            onClick={() => {
              setUserType('athlete')
              setTouched(true)
            }}
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
                : showError
                ? 'border-red-300 hover:border-red-400'
                : darkMode
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-gray-300 text-black hover:bg-gray-100'
            } transition-colors`}
            onClick={() => {
              setUserType('trainer')
              setTouched(true)
            }}
          >
            Trainer
          </Button>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading'}
        className={`w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white ${
          !userType && touched ? 'opacity-50 cursor-not-allowed' : ''
        }`}
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
      {showError && !message && (
        <p className="text-sm text-red-500">
          Please select if you are an Athlete or Trainer
        </p>
      )}
    </form>
  )
} 