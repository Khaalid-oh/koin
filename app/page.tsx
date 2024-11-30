'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sun, Moon } from 'lucide-react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col transition-colors duration-200`}>
      <header className={`sticky top-0 left-0 right-0 ${darkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm z-50 border-b ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500">Koin</Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleDarkMode}
              className={darkMode ? 'bg-white text-black' : 'bg-black text-white'}
            >
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Get Early Access
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="pt-24 md:pt-32 pb-12 md:pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Elite coaching, <span className="text-orange-500">anytime, anywhere</span>
                </h1>
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Connect with top coaches and elevate your game, no matter where you are.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-black'} placeholder:text-gray-400`}
                  />
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Get Early Access
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
                <Image
                  src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="NFL athlete training"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl object-cover w-full"
                />
                <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-white p-1 sm:p-2 rounded-lg shadow-xl z-10 w-24 sm:w-32 md:w-1/3 max-w-[150px]">
                  <Image
                    src="https://images.unsplash.com/photo-1494199505258-5f95387f933c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                    alt="Basketball"
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className={`py-16 md:py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Koin?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: "Flexible", description: "Train with elite coaches on your schedule, from anywhere in the world" },
                { title: "Affordable", description: "Access premium coaching at competitive rates with transparent pricing" },
                { title: "Connected", description: "Stay connected with your coach and track your progress in real-time" }
              ].map((feature, index) => (
                <div key={index} className={`${darkMode ? 'bg-black/50 border-gray-800' : 'bg-white border-gray-200'} p-6 rounded-lg border`}>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-orange-500">{feature.title}</h3>
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
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-16 md:py-20 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Koin App: Coming Soon</h2>
                <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Be among the first to experience elite coaching with the Koin app. Sign up for early access today.
                </p>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Get Early Access
                </Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Koin app preview"
                  width={250}
                  height={500}
                  className="rounded-xl shadow-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Ready to elevate your game?</h2>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Join the waitlist to get early access and exclusive benefits when we launch.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className={`${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-black'} placeholder:text-gray-400`}
              />
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Join Waitlist
              </Button>
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
              <Link href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Privacy</Link>
              <Link href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Terms</Link>
              <Link href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

