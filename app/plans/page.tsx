"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useRouter } from "next/navigation";

function Plans() {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const plans = [
    {
      name: "Family Package",
      price: "199",
      description: "For families looking to train together",
      features: [
        "Up to 4 family members",
        "Shared training calendar",
        "Family progress tracking",
        "Group training sessions",
        "Personalized family goals",
        "24/7 support access",
      ],
    },
    {
      name: "Team Package",
      price: "399",
      description: "For sports teams and group training",
      features: [
        "Up to 15 team members",
        "Team management dashboard",
        "Performance analytics",
        "Team scheduling tools",
        "Group & individual training",
        "Priority support",
      ],
    },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <main
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <section className="pt-48 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Choose Your <span className="text-[#042C64]">Plan</span>
              </h1>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Select the perfect package for your training needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`p-8 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                    <div className="text-4xl font-bold text-[#042C64] mb-2">
                      ${plan.price}
                      <span className="text-base font-normal">/month</span>
                    </div>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="text-[#042C64] w-5 h-5 mr-3 flex-shrink-0" />
                        <span
                          className={
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full bg-[#042C64] hover:bg-[#042C64]/90 text-white"
                    onClick={() => router.push("/auth/select-role")}
                  >
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Plans;
