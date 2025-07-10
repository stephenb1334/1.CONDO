'use client'

import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is already authenticated
    const auth = sessionStorage.getItem('portal-auth')
    if (auth === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '246n3rd') {
      setIsAuthenticated(true)
      sessionStorage.setItem('portal-auth', 'authenticated')
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return <Dashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="card-dark max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold neon-text mb-2">
            246 N 3rd St Property Portal
          </h1>
          <p className="text-gray-400">
            Private collaboration portal for Stephen, Melissa & Realtor
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Access Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-neon w-full"
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="btn-neon w-full"
          >
            Access Portal
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Legal-grade property analysis and collaboration platform</p>
          <p className="mt-1">Philadelphia, PA 19106</p>
        </div>
      </div>
    </div>
  )
}