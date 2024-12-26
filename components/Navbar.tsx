"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sun, Moon, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useFirebaseAuth from "@/lib/useFirebaseAuth";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, signOut } = useFirebaseAuth();

  const isCoachPage = pathname === "/coach-earnings";

  const navLinks = [
    { href: "/", label: "Find a coach" },
    { href: "/coach-earnings", label: "Coach with us" },
    { href: "/plans", label: "Plans" },
    { href: "/contact", label: "Contact us" },
  ];

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
          <Link href="/" className="text-2xl font-bold text-[#042C64]">
            Koin
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative hover:text-[#042C64] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#042C64] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(!isOpen)}
                  className="border-[#042C64] text-[#042C64] hover:bg-[#042C64] hover:text-white"
                >
                  {isCoachPage ? "Join as an Athlete" : "Join Now"}
                </Button>
                <Button
                  onClick={() => router.push("/auth/select-role")}
                  className="bg-[#042C64] text-white hover:bg-[#042C64]/90"
                >
                  Sign In
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={darkMode ? "text-white" : "text-gray-900"}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={darkMode ? "text-white" : "text-gray-900"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={darkMode ? "text-white" : "text-gray-900"}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            className={`md:hidden pt-4 pb-3 border-t border-gray-200 absolute h-screen top-full left-0 right-0 ${
              darkMode ? "bg-gray-900" : "bg-white"
            } shadow-lg`}
          >
            <div className="container mx-auto px-4">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-2 text-base hover:text-[#042C64]"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  {!isLoggedIn ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setShowMobileMenu(false);
                        }}
                        className="w-full border-[#042C64] text-[#042C64] hover:bg-[#042C64] hover:text-white"
                      >
                        {isCoachPage ? "Join as an Athlete" : "Join Now"}
                      </Button>
                      <Button
                        onClick={() => {
                          router.push("/auth/select-role");
                          setShowMobileMenu(false);
                        }}
                        className="w-full bg-[#042C64] text-white hover:bg-[#042C64]/90"
                      >
                        Sign In
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="block px-2 py-2 text-base hover:text-[#042C64]"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-2 py-2 text-base hover:text-[#042C64] flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex w-full justify-center bg-gray-100"
                  >
                    {darkMode ? (
                      <>
                        <Sun className="h-5 w-5 mr-2" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 mr-2" /> Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Menu Dropdown */}
        {showProfileMenu && (
          <div className="absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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

        {/* Join Menu Dropdown */}
        {!isLoggedIn && isOpen && (
          <div className="absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
    </div>
  );
}
