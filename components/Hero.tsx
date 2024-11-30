import Image from 'next/image'
import { WaitlistForm } from './WaitlistForm'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center md:text-left md:flex-row">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Elite coaching, <span className="text-orange-500">anywhere</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-gray-700">
              Connect with top coaches and elevate your game, no matter where you are.
            </p>
            <WaitlistForm buttonText="Get Early Access" className="max-w-md mx-auto md:mx-0" />
          </div>
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Athlete in motion"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl object-cover w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-xl z-10 w-1/2 max-w-[150px]">
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
  )
}

