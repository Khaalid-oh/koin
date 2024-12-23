"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useFirebaseAuth from "@/lib/useFirebaseAuth";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, signOut } = useFirebaseAuth();

  const isCoachPage = pathname === "/coach-earnings";

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900/50 border-white/10"
          : "bg-white/50 border-gray-200"
      } backdrop-blur-sm border-b fixed top-0 left-0 right-0 z-50`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-24 md:space-x-32">
            <Link href="/" className="text-2xl font-bold text-[#042C64]">
              Koin
            </Link>
            <div className="hidden md:flex items-center space-x-8 md:space-x-12">
              <Link
                href="#"
                className="relative hover:text-[#042C64] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#042C64] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Find a coach
              </Link>
              <Link
                href="/coach-earnings"
                className="relative hover:text-[#042C64] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#042C64] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Coach with us
              </Link>
              <Link
                href="#"
                className="relative hover:text-[#042C64] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#042C64] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Plans
              </Link>
              <Link
                href="#"
                className="relative hover:text-[#042C64] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#042C64] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {!isLoggedIn ? (
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(!isOpen)}
                  className="border-[#042C64] text-[#042C64] hover:bg-[#042C64] hover:text-white"
                >
                  {isCoachPage ? "Join as an Athlete" : "Join Now"}
                </Button>
              ) : (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={
                      darkMode
                        ? "text-white hover:text-[#042C64]"
                        : "text-gray-900 hover:text-[#042C64]"
                    }
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setShowProfileMenu(false);
                          }}
                          className="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isLoggedIn && isOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/athlete-signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Join as an Athlete
                    </Link>
                    <Link
                      href="/coach-earnings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Join as a Coach
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {isLoggedIn ? (
              ""
            ) : (
              <Button
                onClick={() => router.push("/auth/select-role")}
                className="bg-[#042C64] text-white hover:bg-[#042C64]/90"
              >
                Sign In
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={
                darkMode
                  ? "text-white hover:text-[#042C64]"
                  : "text-gray-900 hover:text-[#042C64]"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
