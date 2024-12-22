"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { UserCircle, Users } from "lucide-react";
import { useDarkMode } from "@/app/context/DarkModeContext";

export default function SelectRole() {
  const router = useRouter();
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-4xl w-full px-4">
        <h1
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? "text-white" : ""
          }`}
        >
          Sign in as
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Athlete Card */}
          <Card
            className={`p-6 cursor-pointer hover:shadow-lg transition-shadow group ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white"
            }`}
            onClick={() => router.push("/auth/signin?role=athlete")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-[#042C64]/10 group-hover:bg-[#042C64]/20 transition-colors">
                <Users className="w-12 h-12 text-[#042C64]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Athlete</h2>
                <p className="text-gray-600">
                  Sign in to connect with coaches and access your training
                  programs
                </p>
              </div>
            </div>
          </Card>

          {/* Coach Card */}
          <Card
            className={`p-6 cursor-pointer hover:shadow-lg transition-shadow group ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white"
            }`}
            onClick={() => router.push("/auth/signin?role=coach")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-[#042C64]/10 group-hover:bg-[#042C64]/20 transition-colors">
                <UserCircle className="w-12 h-12 text-[#042C64]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Coach</h2>
                <p className="text-gray-600">
                  Sign in to manage your clients and training sessions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
