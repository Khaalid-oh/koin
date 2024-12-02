import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'

export function DownloadSignUp() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#042C64] to-[#647EA1] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to elevate your game?</h2>
          <p className="text-lg sm:text-xl">Download the Koin app or sign up for early access</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Image
              src="/placeholder.svg?height=60&width=180"
              alt="Download on the App Store"
              width={180}
              height={60}
              className="rounded-lg"
            />
            <Image
              src="/placeholder.svg?height=60&width=180"
              alt="Get it on Google Play"
              width={180}
              height={60}
              className="rounded-lg"
            />
          </div>
          <div className="flex w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none bg-white text-black w-full"
            />
            <Button className="rounded-l-none bg-black hover:bg-gray-800">
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

