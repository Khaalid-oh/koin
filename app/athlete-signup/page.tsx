"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/app/context/DarkModeContext";
import Image from "next/image";

export default function AthleteSignUp() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // First create the user
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          sport,
          age,
          gender,
          weight,
          height,
          role: "athlete",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      // Then sign in the user
      const result = await signIn("credentials", {
        email,
        password,
        role: "athlete",
        callbackUrl: "/athlete-dashboard",
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to sign in after account creation");
      } else if (result?.ok) {
        router.push("/athlete-dashboard");
      }
    } catch (err) {
      setError("Something went wrong during signup");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Slanted Design */}
      <div className="hidden lg:block relative w-1/2 bg-[#042C64] skew-x-[-5deg] origin-left transform-gpu -ml-12">
        <div className="absolute inset-0 skew-x-[5deg] ml-10">
          <div className="flex flex-col justify-center items-center h-full text-white px-12">
            <h1 className="text-7xl md:w-[600px] font-bold mb-6 leading-tight">
              Start Your Athletic Journey
            </h1>
            {/* <p className="text-xl mb-8 text-center">
              Connect with professional coaches and take your game to the next
              level
            </p>
            <div className="relative w-96 h-96">
              <Image
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd"
                alt="Athletic Training - Person doing box jumps in gym"
                fill
                className="object-cover rounded-lg"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div
        className={`w-full lg:w-1/2 flex items-center justify-center p-8 ${
          darkMode ? "" : ""
        }`}
      >
        <div
          className={`max-w-md w-full space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold text-center">
              Create Your Account
            </h2>
            <p
              className={`mt-2 text-center text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join our community of athletes
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                required
                aria-label="Primary Sport"
                className={`h-10 w-full rounded-md border px-3 py-2 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat pr-8 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                } focus:ring-[#042C64] focus:border-[#042C64] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#042C64] focus-visible:ring-offset-2`}
              >
                <option value="" disabled>
                  Select Primary Sport
                </option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="soccer">Soccer</option>
                <option value="tennis">Tennis</option>
                <option value="running">Running</option>
                <option value="swimming">Swimming</option>
                <option value="bodybuilding">Bodybuilding</option>
                <option value="crossfit">CrossFit</option>
                <option value="powerlifting">Powerlifting</option>
                <option value="yoga">Yoga</option>
                <option value="other">Other</option>
              </select>

              {/* Age and Gender row */}
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Age"
                  min="13"
                  max="100"
                  className={`w-1/2 ${
                    darkMode ? "bg-gray-800 border-gray-700" : ""
                  }`}
                  required
                />
                <select
                  aria-label="Gender"
                  required
                  className={`h-10 w-1/2 rounded-md border px-3 py-2 text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat pr-8 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  } focus:ring-[#042C64] focus:border-[#042C64] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#042C64] focus-visible:ring-offset-2`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Weight and Height row */}
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Weight (kg)"
                  min="30"
                  max="200"
                  className={`w-1/2 ${
                    darkMode ? "bg-gray-800 border-gray-700" : ""
                  }`}
                  required
                />
                <Input
                  type="number"
                  placeholder="Height (cm)"
                  min="100"
                  max="250"
                  className={`w-1/2 ${
                    darkMode ? "bg-gray-800 border-gray-700" : ""
                  }`}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#042C64] hover:bg-[#042C64]/90 text-white"
            >
              Create Account
            </Button>

            {/* <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${
                    darkMode
                      ? "bg-gray-900/50 text-gray-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  Or sign up with
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className={`w-full ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700"
              } border border-gray-300 flex items-center justify-center space-x-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span>Sign up with Google</span>
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
