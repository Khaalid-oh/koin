'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { WaitlistForm } from '@/components/WaitlistForm'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className={`${darkMode ? 'bg-gray-900/50 border-white/10' : 'bg-white/50 border-gray-200'} backdrop-blur-sm border-b`}>
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-orange-500">
                  Koin
                </Link>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                    className={darkMode ? 'text-white hover:text-orange-500' : 'text-gray-900 hover:text-orange-500'}
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Elite coaching, <span className="text-orange-500">anytime, anywhere</span>
                </h1>
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-xl`}>
                  Connect with top trainers and elevate your game, no matter where you are.
                </p>
                <WaitlistForm darkMode={darkMode} buttonText="Get Early Access" className="max-w-md" />
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Athlete weight training"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-16 md:py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Koin?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Flexible", description: "Train with elite coaches on your schedule, from anywhere in the world" },
                { title: "Affordable", description: "Access premium coaching at competitive rates with transparent pricing" },
                { title: "Connected", description: "Stay connected with your coach and track your progress in real-time" }
              ].map((feature, index) => (
                <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">{feature.title}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {["Find Your Coach", "Book a Session", "Train and Improve"].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-orange-500 rounded-full p-4 mb-4">
                    <ArrowRight className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {index === 0
                      ? "Browse and filter top coaches in your sport"
                      : index === 1
                      ? "Choose a time that works for you and book instantly"
                      : "Get personalized coaching and track your progress"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Ready to elevate your game?</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Join the waitlist to get early access and exclusive benefits when we launch.
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm darkMode={darkMode} />
            </div>
          </div>
        </section>
      </main>

      <footer className={`${darkMode ? 'bg-gray-900/50 border-white/10' : 'bg-gray-100 border-gray-200'} py-8 border-t`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 md:mb-0`}>
              © 2024 Koin. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                Terms
              </Link>
              <a 
                href="mailto:GCFlabsAI@gmail.com"
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

