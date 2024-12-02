import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#042C64]">Koin</Link>
        <div className="flex items-center space-x-4">
          <Button className="bg-[#042C64] hover:bg-[#042C64]/90 text-white hidden sm:inline-flex">
            Get Access Now
          </Button>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

