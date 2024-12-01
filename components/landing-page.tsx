import { ArrowRight } from 'phosphor-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Elite coaching, <span className="text-orange-500">anywhere</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Connect with top coaches and elevate your game, no matter where you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Join Waitlist
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <Image
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Athlete in motion"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl object-cover w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-xl z-10 w-1/3 max-w-[150px]">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Mobile app preview"
                  width={150}
                  height={300}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Koin?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Flexible", description: "Train with elite coaches on your schedule, from anywhere in the world" },
            { title: "Affordable", description: "Access premium coaching at competitive rates with transparent pricing" },
            { title: "Connected", description: "Stay connected with your coach and track your progress in real-time" }
          ].map((feature, index) => (
            <div key={index} className="bg-black/50 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-orange-500">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
          {[
            { title: "Find Your Coach", description: "Browse and filter top coaches in your sport" },
            { title: "Book a Session", description: "Choose a time that works for you and book instantly" },
            { title: "Train and Improve", description: "Get personalized coaching and track your progress" }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-orange-500 rounded-full p-4 mb-4">
                <ArrowRight className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

