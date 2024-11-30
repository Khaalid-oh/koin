import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">About Koin</h1>
        <p className="text-xl mb-8">
          Koin is a platform that connects athletes with elite coaches, enabling remote training and personalized coaching experiences.
        </p>
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Back to Home
          </Button>
        </Link>
      </main>
    </div>
  )
}

