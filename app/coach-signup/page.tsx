"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/app/context/DarkModeContext";
import { useToast } from "@/app/context/ToastContext";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/client";
import GoogleButton from "@/components/ui/googleButton";
import { LocationAutocomplete } from "@/components/LocationAutocomplete";

export default function CoachSignUp() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { showToast } = useToast();

  const defaultForm = {
    fullName: "",
    email: "",
    password: "",
    sports: [],
    experience: "",
    certification: "",
    hourlyRate: "",
    bio: "",
    location: "",
    role: "coach",
  };

  const [form, setForm] = useState({ ...defaultForm });
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const updateField = (field: string, value: string | string[]) =>
    setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = res.user;
      await setDoc(doc(db, "coaches", user.uid), {
        uid: user.uid,
        ...form,
        location: selectedLocation,
        role: "coach",
        sports: form.sports,
        experience: form.experience,
        certification: form.certification,
        hourlyRate: form.hourlyRate,
        bio: form.bio,
      });
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        router.push("/auth/signin?role=coach");
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      showToast(
        err instanceof Error ? err.message : "An error occurred during signup",
        "error"
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Slanted Design */}
      <div className="hidden lg:block relative w-1/2 bg-[#042C64] skew-x-[-5deg] origin-left transform-gpu -ml-12">
        <div className="absolute inset-0 skew-x-[5deg] ml-10">
          <div className="flex flex-col justify-center items-center h-full text-white px-12">
            <h1 className="text-7xl md:w-[600px] font-bold mb-6 leading-tight">
              Start Your Coaching Journey
            </h1>
            <p className="text-xl">
              Share your expertise and grow your business globally
            </p>
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-8`}>
        <div
          className={`max-w-md w-full space-y-8 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <div>
            <h2 className="text-3xl font-bold text-center">
              Create Your Coach Account
            </h2>
            <p
              className={`mt-2 text-center text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join our community of professional coaches
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                type="text"
                placeholder="Full Name"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />

              <Input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                type="email"
                placeholder="Email Address"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />

              <Input
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                type="password"
                placeholder="Password"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />
              <select
                value={form.sports}
                onChange={(e) => updateField("sports", e.target.value)}
                className={`w-full border-x-[1px] py-1 ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white"
                }`}
                required
              >
                <option value="">Select Sport</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="tennis">Tennis</option>
                <option value="swimming">Swimming</option>
                <option value="bodybuilding">Bodybuilding</option>
                <option value="crossfit">CrossFit</option>
                <option value="yoga">Yoga</option>
              </select>

              <Input
                value={form.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                type="number"
                placeholder="Years of Experience"
                min="0"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />

              <Input
                value={form.certification}
                onChange={(e) => updateField("certification", e.target.value)}
                type="text"
                placeholder="Certifications"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />

              <Input
                value={form.hourlyRate}
                onChange={(e) => updateField("hourlyRate", e.target.value)}
                type="number"
                placeholder="Hourly Rate ($)"
                min="0"
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
                required
              />

              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                placeholder="Tell us about yourself and your coaching experience"
                className={`w-full border-[1px] rounded-md p-2 ${
                  darkMode ? "bg-gray-800 border-gray-700" : ""
                }`}
                rows={4}
                required
              />

              <LocationAutocomplete
                onLocationSelect={setSelectedLocation}
                className="w-full bg-white border-gray-300 text-black focus:ring-[#042C64] focus:border-[#042C64] focus-visible:ring-[#042C64]"
              />
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
            <GoogleButton /> */}
          </form>
        </div>
      </div>
    </div>
  );
}
