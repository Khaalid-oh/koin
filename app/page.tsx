'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { WaitlistForm } from '@/components/WaitlistForm'
import { Header } from '@/components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
              <img
                src="/hero-bg.jpg"
                alt="Athletes training"
                className="w-full h-[600px] object-cover object-center brightness-50"
              />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 container mx-auto px-4 pt-32 pb-24">
            <div className="max-w-3xl mx-auto text-center text-white space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
                Connect with top trainers and elevate your game, no matter where you are.
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-12">
                Experience personalized training and real-time performance tracking powered by AI.
              </p>
              <WaitlistForm darkMode={true} className="mt-12" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
                <p className="text-gray-600">Track your performance metrics and progress in real-time with AI-powered insights.</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Trainers</h3>
                <p className="text-gray-600">Connect with elite trainers who understand your goals and help you achieve them.</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
                <p className="text-gray-600">Your data is protected with enterprise-grade security and privacy measures.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

