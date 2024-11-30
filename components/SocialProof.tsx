import Image from 'next/image'
import { Star } from 'lucide-react'

export function SocialProof() {
  const testimonials = [
    { name: "Alex Johnson", sport: "Basketball", quote: "Koin helped me connect with an NBA-level coach. My game has improved tremendously!" },
    { name: "Sarah Lee", sport: "Tennis", quote: "The flexibility of booking sessions around my schedule has been a game-changer." }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-orange-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <Image
                  src={index === 0 
                    ? "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  }
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.sport}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg sm:text-xl font-semibold mb-4">Trusted by professional athletes and coaches</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <Image
                key={i}
                src="/placeholder.svg?height=40&width=120"
                alt={`Trust indicator ${i + 1}`}
                width={120}
                height={40}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

