import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import LoginPage from '@/app/login/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock fetch function
global.fetch = jest.fn()

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn()
  }

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()
    
    // Setup router mock
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    
    // Setup default fetch mock
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })
  })

  it('renders login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows error when submitting without password', async () => {
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)
    
    expect(await screen.findByText(/please enter password/i)).toBeInTheDocument()
  })

  it('handles successful login', async () => {
    render(<LoginPage />)
    
    // Enter password
    const passwordInput = screen.getByPlaceholderText(/enter password/i)
    await userEvent.type(passwordInput, 'test-password')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)
    
    // Verify API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: 'test-password' }),
      })
    })
    
    // Verify navigation
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin')
      expect(mockRouter.refresh).toHaveBeenCalled()
    })
  })

  it('shows error message on login failure', async () => {
    // Mock API failure
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' })
    })
    
    render(<LoginPage />)
    
    // Enter password
    const passwordInput = screen.getByPlaceholderText(/enter password/i)
    await userEvent.type(passwordInput, 'wrong-password')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)
    
    // Verify error message
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
    
    // Verify no navigation occurred
    expect(mockRouter.push).not.toHaveBeenCalled()
    expect(mockRouter.refresh).not.toHaveBeenCalled()
  })

  it('handles network errors', async () => {
    // Mock network error
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<LoginPage />)
    
    // Enter password
    const passwordInput = screen.getByPlaceholderText(/enter password/i)
    await userEvent.type(passwordInput, 'test-password')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)
    
    // Verify error message
    expect(await screen.findByText(/an error occurred/i)).toBeInTheDocument()
  })
}) 