"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, DollarSign, UserCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "../context/DarkModeContext";

export default function CoachEarningsPage() {
  const [sessions, setSessions] = useState(10);
  const [rate, setRate] = useState(100);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { darkMode } = useDarkMode();

  const weeklyEarnings = sessions * rate;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Turn Your Passion Into{" "}
                  <span className="text-[#042C64]">Earnings</span>
                </h1>
                <p
                  className={`text-xl ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-8 max-w-xl`}
                >
                  Join our platform and start earning by sharing your expertise
                  with athletes worldwide.
                </p>
                <div className="max-w-xl space-y-6">
                  <div
                    className={`${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } rounded-lg shadow-lg p-6`}
                  >
                    <h2 className="text-2xl font-semibold mb-6">
                      Calculate Your Potential
                    </h2>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-1`}
                        >
                          Sessions per week
                        </label>
                        <Input
                          type="number"
                          value={sessions}
                          onChange={(e) => setSessions(Number(e.target.value))}
                          className={`w-full ${
                            darkMode
                              ? "bg-gray-700 text-white"
                              : "bg-white text-black"
                          } border-gray-300 focus:ring-[#042C64] focus:border-[#042C64]`}
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-sm font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-1`}
                        >
                          Rate per session ($)
                        </label>
                        <Input
                          type="number"
                          value={rate}
                          onChange={(e) => setRate(Number(e.target.value))}
                          className={`w-full ${
                            darkMode
                              ? "bg-gray-700 text-white"
                              : "bg-white text-black"
                          } border-gray-300 focus:ring-[#042C64] focus:border-[#042C64]`}
                        />
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mb-2`}
                      >
                        Potential weekly earnings
                      </div>
                      <div className="text-4xl font-bold text-[#042C64]">
                        ${weeklyEarnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-[#042C64] text-white hover:bg-[#042C64]/90 text-lg px-8 py-6">
                    Apply as a Coach
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative w-full h-[680px]">
                  <Image
                    src="https://images.pexels.com/photos/7005187/pexels-photo-7005187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Professional football coach holding a ball and looking at camera"
                    fill
                    className="rounded-lg shadow-2xl object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Increase Your Reach Section */}
        <section
          className={`py-16 md:py-20 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#042C64] font-bold text-center mb-12">
              Increase Your Reach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  title: "Expand Your Reach",
                  description:
                    "Connect with athletes globally and build your coaching brand beyond geographical limitations",
                },
                {
                  title: "Fill Empty Spots",
                  description:
                    "Maximize your schedule efficiency by filling available time slots with eager athletes",
                },
                {
                  title: "Generate More Revenue",
                  description:
                    "Increase your income potential by accessing a larger client base and optimizing your pricing",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  } p-8 shadow-lg transition-all hover:shadow-xl`}
                >
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-semibold text-[#042C64]">
                      {card.title}
                    </h3>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      {card.description}
                    </p>
                  </div>
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-br ${
                      darkMode
                        ? "from-gray-700 to-gray-600"
                        : "from-white to-gray-100"
                    } opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className={`py-16 md:py-20 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#042C64] font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  title: "Create Your Profile",
                  description:
                    "Set up your professional profile highlighting your expertise, experience, and coaching style",
                  icon: UserCircle,
                },
                {
                  title: "Set Your Availability",
                  description:
                    "Define your schedule and pricing to match your preferences and maximize your earning potential",
                  icon: Calendar,
                },
                {
                  title: "Start Earning",
                  description:
                    "Begin accepting bookings and deliver exceptional coaching experiences to athletes worldwide",
                  icon: DollarSign,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-lg shadow-lg`}
                >
                  <div className="bg-[#042C64]/10 rounded-full p-4 mb-4">
                    <step.icon className="text-[#042C64] w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className={`py-16 md:py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl text-[#042C64] sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Common Questions
            </h2>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200">
              {[
                {
                  question: "How do I get paid?",
                  answer:
                    "Payments are processed securely through our platform. You'll receive payments directly to your linked bank account on a weekly basis.",
                },
                {
                  question: "What equipment do I need?",
                  answer:
                    "You'll need a reliable internet connection and a device with a camera for virtual sessions. Specific equipment requirements may vary based on your sport and coaching style.",
                },
                {
                  question: "How do I set my schedule?",
                  answer:
                    "Our flexible scheduling system allows you to set your availability on a weekly basis. You have complete control over your working hours.",
                },
                {
                  question: "What support do you provide?",
                  answer:
                    "We provide 24/7 technical support, marketing tools, and resources to help you grow your coaching business on our platform.",
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
                      {item.question}
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
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {item.answer}
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
                className={
                  darkMode ? "text-gray-400 mb-6" : "text-gray-600 mb-6"
                }
              >
                Can't find the answer you're looking for? Please chat to our
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

        {/* Footer */}
        <footer
          className={`${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-200"
          } py-8 border-t`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div
                className={
                  darkMode
                    ? "text-gray-400 text-sm mb-4 md:mb-0"
                    : "text-gray-600 text-sm mb-4 md:mb-0"
                }
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
    </div>
  );
}
