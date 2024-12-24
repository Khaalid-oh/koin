"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useDarkMode } from "@/app/context/DarkModeContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/firebase/client";
import { useToast } from "@/app/context/ToastContext";
import { getDocs } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, query, where } from "firebase/firestore";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [error, setError] = useState("");
  const { darkMode } = useDarkMode();
  const { showToast } = useToast();

  const defaultForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState({ ...defaultForm });

  const updateField = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  useEffect(() => {
    if (!role || !["athlete", "coach"].includes(role)) {
      router.push("/auth/select-role");
    }
  }, [role, router]);

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(response);
      showToast("Logged in successfully!", "success");
      setTimeout(() => {
        router.push("/"); // Redirect to homepage after successful login
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/", // Redirect to homepage after Google sign in
      query: { role },
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div>
          <Link href="/auth/select-role">
            <Button
              variant="ghost"
              className={`mb-4 ${
                darkMode ? "text-white hover:text-gray-300" : ""
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h2
            className={`text-center text-3xl font-bold ${
              darkMode ? "text-white" : ""
            }`}
          >
            Sign in as {role === "coach" ? "Coach" : "Athlete"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#042C64] hover:bg-[#042C64]/90 text-white"
          >
            Sign in
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } text-gray-500`}
              >
                Or sign in with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
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
            <span>Sign in with Google</span>
          </Button>

          <div className="text-center">
            <Link
              href={role === "coach" ? "/coach-signup" : "/athlete-signup"}
              className="text-sm text-[#042C64] hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
