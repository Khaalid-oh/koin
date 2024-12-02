import { CheckCircle, Users, Clock } from 'lucide-react'

export function ValueProposition() {
  const benefits = [
    { 
      title: "For Athletes", 
      icon: Users,
      items: [
        "Find elite coaches anywhere, anytime",
        "Never miss a rep or beat in your training",
        "Get personalized feedback and improve faster"
      ]
    },
    { 
      title: "For Coaches", 
      icon: Clock,
      items: [
        "Expand your client base globally",
        "Flexible scheduling that fits your lifestyle",
        "Increase your income with premium rates"
      ] 
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Why Choose Koin?</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-[#042C64]/10 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <benefit.icon className="w-8 h-8 text-[#042C64] mr-3" />
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <ul className="space-y-3">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <CheckCircle className="text-[#042C64] mr-2 flex-shrink-0 w-5 h-5 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

