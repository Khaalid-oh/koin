"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function Contact() {
  const { darkMode } = useDarkMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Our friendly team is here to help.",
      contact: "GCFlabsAI@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team.",
      contact: "Available 24/7",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Mon - Fri from 8am to 5pm.",
      contact: "+1 (555) 000-0000",
    },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <main
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Get in <span className="text-[#042C64]">Touch</span>
              </h1>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className={`p-6 text-center ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="inline-block p-4 rounded-full bg-[#042C64]/10 mb-4">
                    <method.icon className="w-6 h-6 text-[#042C64]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p
                    className={`mb-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {method.description}
                  </p>
                  <p className="font-semibold text-[#042C64]">
                    {method.contact}
                  </p>
                </Card>
              ))}
            </div>

            <Card
              className={`max-w-2xl mx-auto p-8 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`block mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      First Name
                    </label>
                    <Input
                      type="text"
                      required
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                    />
                  </div>
                  <div>
                    <label
                      className={`block mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Last Name
                    </label>
                    <Input
                      type="text"
                      required
                      className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    className={darkMode ? "bg-gray-700 border-gray-600" : ""}
                  />
                </div>

                <div>
                  <label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    title="Message"
                    placeholder="Enter your message here"
                    className={`w-full rounded-lg p-3 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300"
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#042C64] hover:bg-[#042C64]/90 text-white"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
