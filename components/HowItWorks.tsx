import Image from 'next/image'
import { Search, Calendar, Star } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    { icon: Search, title: "Find Your Coach", description: "Browse and filter top coaches in your sport" },
    { icon: Calendar, title: "Book a Session", description: "Choose a time that works for you and book instantly" },
    { icon: Star, title: "Train and Improve", description: "Get personalized coaching and track your progress" }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
        <div className="grid gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-orange-100 rounded-full p-4 inline-block mb-4">
                <step.icon className="text-orange-500 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1481&q=80"
            alt="Mobile app screenshots"
            width={600}
            height={300}
            className="rounded-lg shadow-xl mx-auto object-cover w-full max-w-[600px]"
          />
        </div>
      </div>
    </section>
  )
}

