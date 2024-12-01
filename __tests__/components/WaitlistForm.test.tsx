import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaitlistForm } from '@/components/WaitlistForm'

// Mock fetch function
global.fetch = jest.fn()

describe('WaitlistForm', () => {
  beforeEach(() => {
    // Clear mock before each test
    jest.clearAllMocks()
    // Setup default fetch mock
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })
  })

  it('renders email input and role selection buttons', () => {
    render(<WaitlistForm />)
    
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /athlete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /trainer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument()
  })

  it('shows error when submitting without email', async () => {
    render(<WaitlistForm />)
    
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/please enter your email/i)).toBeInTheDocument()
  })

  it('shows error when submitting without selecting role', async () => {
    render(<WaitlistForm />)
    
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    await userEvent.type(emailInput, 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/please select if you are an athlete or trainer/i)).toBeInTheDocument()
  })

  it('submits form successfully with valid data', async () => {
    render(<WaitlistForm />)
    
    // Fill in email
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    await userEvent.type(emailInput, 'test@example.com')
    
    // Select role
    const athleteButton = screen.getByRole('button', { name: /athlete/i })
    fireEvent.click(athleteButton)
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)
    
    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          userType: 'athlete'
        }),
      })
    })
    
    // Verify success message
    expect(await screen.findByText(/thanks for joining/i)).toBeInTheDocument()
  })

  it('shows error message on API failure', async () => {
    // Mock API failure
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
    
    render(<WaitlistForm />)
    
    // Fill in form
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    await userEvent.type(emailInput, 'test@example.com')
    
    const athleteButton = screen.getByRole('button', { name: /athlete/i })
    fireEvent.click(athleteButton)
    
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })
    fireEvent.click(submitButton)
    
    // Verify error message
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
}) 