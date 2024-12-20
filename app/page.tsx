"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon, Search } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Input } from "@/components/ui/input";
import { useDarkMode } from "./context/DarkModeContext";

export default function Home() {
  const { darkMode } = useDarkMode();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Elite coaching,{" "}
                  <span className="text-[#042C64]">anytime, anywhere</span>
                </h1>
                <p
                  className={`text-xl ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-8 max-w-xl`}
                >
                  Connect with top trainers and elevate your game, no matter
                  where you are.
                </p>
                <div className="max-w-md space-y-6">
                  <div className="flex flex-col space-y-4">
                    <Input
                      type="text"
                      placeholder="Phoenix, Texas"
                      className="w-full bg-white border-gray-300 text-black focus:ring-[#042C64] focus:border-[#042C64] focus-visible:ring-[#042C64]"
                    />
                    <select
                      aria-label="Select sport type"
                      className="h-10 w-full rounded-md border px-3 py-2 text-sm bg-white border-gray-300 text-gray-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat pr-8 focus:ring-[#042C64] focus:border-[#042C64] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#042C64] focus-visible:ring-offset-2"
                    >
                      <option value="">5miles of your current location</option>
                      <option value="10">10 miles</option>
                      <option value="15">15 miles</option>
                      <option value="20">20 miles</option>
                    </select>
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        className="w-full bg-white border-gray-300 text-black focus:ring-[#042C64] focus:border-[#042C64] focus-visible:ring-[#042C64]"
                      />
                      <Input
                        type="time"
                        className="w-full bg-white border-gray-300 text-black focus:ring-[#042C64] focus:border-[#042C64] focus-visible:ring-[#042C64]"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-[#042C64] hover:bg-[#042C64]/90 text-white"
                  >
                    Search <Search className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative w-full h-[500px]">
                  {[
                    {
                      src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
                      alt: "Woman with weights training",
                    },
                    {
                      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                      alt: "Woman with weights training",
                    },
                    {
                      src: "https://images.unsplash.com/photo-1450121982620-84a745035fa8?q=80&w=3370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      alt: "Man training with football",
                    },
                    {
                      src: "https://images.unsplash.com/photo-1508355588587-46f3cdb5da07?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      alt: "Man training basketball",
                    },
                    {
                      src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                      alt: "Man doing strength training",
                    },
                  ].map((image, index) => (
                    <Image
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`rounded-lg shadow-2xl object-cover transition-opacity duration-1000 absolute top-0 left-0
                        ${index === 0 ? "opacity-100" : "opacity-0"}`}
                      priority={index === 0}
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (index === 0) {
                          target.style.opacity = "1";
                          let current = 0;
                          setInterval(() => {
                            const images = target.parentElement?.children;
                            if (images) {
                              images[current].classList.remove("opacity-100");
                              images[current].classList.add("opacity-0");
                              current = (current + 1) % images.length;
                              images[current].classList.remove("opacity-0");
                              images[current].classList.add("opacity-100");
                            }
                          }, 5000);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="how-it-works"
          className={`py-16 md:py-20 ${
            darkMode ? "bg-gray-900/50" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#042C64] font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {["Find Your Coach", "Book a Session", "Train and Improve"].map(
                (step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center p-6 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <div className="bg-[#042C64] rounded-full p-4 mb-4">
                      <ArrowRight className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step}</h3>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {index === 0
                        ? "Browse and filter top coaches in your sport"
                        : index === 1
                        ? "Choose a time that works for you and book instantly"
                        : "Get personalized coaching and track your progress"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className={`py-16 md:py-20 ${
            darkMode ? "bg-gray-900/50" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl text-[#042C64] md:text-4xl font-bold text-center mb-12">
              Why Choose Koin?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Flexible",
                  description:
                    "Train with elite coaches on your schedule, from anywhere in the world",
                },
                {
                  title: "Affordable",
                  description:
                    "Access premium coaching at competitive rates with transparent pricing",
                },
                {
                  title: "Connected",
                  description:
                    "Stay connected with your coach and track your progress in real-time",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      darkMode ? "text-white" : "text-[#042C64]"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Koin Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl text-[#042C64] md:text-4xl font-bold text-center mb-12">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Personal Training",
                  description:
                    "One-on-one sessions with certified fitness trainers",
                  image:
                    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                },
                {
                  title: "Basketball Training",
                  description: "Improve your game with professional coaches",
                  image:
                    "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                },
                {
                  title: "Football Training",
                  description: "Master your skills with experienced trainers",
                  image:
                    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                },
                {
                  title: "Tennis Lessons",
                  description: "Learn from professional tennis instructors",
                  image:
                    "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                },
                {
                  title: "Swimming Classes",
                  description: "Perfect your technique with expert swimmers",
                  image:
                    "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                },
                {
                  title: "Yoga Sessions",
                  description: "Find balance with certified yoga instructors",
                  image:
                    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105`}
                >
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section
          className={`py-16 md:py-20 ${
            darkMode ? "bg-gray-900/50" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-4">
            <div
              className={`max-w-3xl mx-auto text-center ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-2xl p-8 md:p-12 shadow-xl`}
            >
              <h2 className="text-2xl text-[#042C64] sm:text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with Koin
              </h2>
              <p
                className={`text-lg mb-8 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Subscribe to our newsletter for exclusive training tips and
                early access to new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-grow ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  } focus:ring-[#042C64] focus:border-[#042C64]`}
                />
                <Button className="bg-[#042C64] hover:bg-[#042C64]/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className={`py-16 md:py-20 ${
            darkMode ? "bg-gray-900/50" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl text-[#042C64] sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Common Questions
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {[
                {
                  q: "How do I get started?",
                  a: "Sign up and book your first session with a coach that matches your needs.",
                },
                {
                  q: "What training is available?",
                  a: "We offer personal training, sports coaching, and specialized fitness sessions.",
                },
                {
                  q: "Are sessions flexible?",
                  a: "Yes, choose between in-person or virtual sessions at your convenience.",
                },
                {
                  q: "What about pricing?",
                  a: "Prices vary by coach and session type. All rates are shown upfront.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="py-6 cursor-pointer group"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <button className="flex w-full items-center justify-between text-left">
                    <h3
                      className={`text-lg font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      } group-hover:text-[#042C64]`}
                    >
                      {item.q}
                    </h3>
                    <span className="ml-6 flex-shrink-0">
                      <svg
                        className={`w-6 h-6 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } group-hover:text-[#042C64] transition-transform ${
                          openFaq === index ? "rotate-45" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`mt-2 ${openFaq === index ? "block" : "hidden"}`}
                  >
                    <p
                      className={`text-base ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div className="text-center mt-12">
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Still have questions?
              </h3>
              <p
                className={`mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Can’t find the answer you’re looking for? Please chat to our
                friendly team.
              </p>
              <a
                href="mailto:GCFlabsAI@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#042C64] hover:bg-[#042C64]/90 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`${
          darkMode
            ? "bg-gray-900/50 border-white/10"
            : "bg-gray-100 border-gray-200"
        } py-8 border-t`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } text-sm mb-4 md:mb-0`}
            >
              © 2024 Koin. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Terms
              </Link>
              <a
                href="mailto:GCFlabsAI@gmail.com"
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
