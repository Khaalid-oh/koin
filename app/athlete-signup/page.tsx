"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/app/context/DarkModeContext";
import { useToast } from "@/app/context/ToastContext";
import Image from "next/image";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { child, push, ref, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/client";

export default function AthleteSignUp() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { showToast } = useToast();

  const defaultForm = {
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    sport: "",
    role: "athlete",
  };

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const [form, setForm] = useState({ ...defaultForm });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(res);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        ...form,
      });
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        router.push("auth/signin?role=athlete");
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
              Start Your Athletic Journey
            </h1>
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
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
                className={darkMode ? "bg-gray-800 border-gray-700" : ""}
              />
              <select
                value={form.sport}
                onChange={(e) => updateField("sport", e.target.value)}
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
                  value={form.age}
                  onChange={(e) => updateField("age", e.target.value)}
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
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
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
                  value={form.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
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
                  value={form.height}
                  onChange={(e) => updateField("height", e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
}
