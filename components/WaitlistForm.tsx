import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

interface WaitlistFormProps {
  darkMode?: boolean;
  buttonText?: string;
  className?: string;
}

export function WaitlistForm({
  darkMode = false,
  buttonText = "Join Waitlist",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<"athlete" | "trainer" | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    if (!userType) {
      setStatus("error");
      setMessage("Please select if you are an Athlete or Trainer");
      return;
    }

    setStatus("loading");
    try {
      console.log("Submitting form with:", { email, userType });

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userType }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.details || data.error || "Submission failed");
      }

      setStatus("success");
      setMessage("Thanks for joining! We'll be in touch soon.");
      setEmail("");
      setUserType(null);
      setTouched(false);
    } catch (error: any) {
      console.error("Form submission error:", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const showError = touched && !userType;

  return (
    <form onSubmit={handleSubmit} className={`${className} space-y-4`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full ${
              darkMode
                ? "bg-white/10 border-white/20 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            } placeholder:text-gray-400`}
          />
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4 text-[#042C64]" />
            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Select your role
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div
            className={`h-10 rounded-md border overflow-hidden relative focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
              showError
                ? "border-red-300"
                : darkMode
                ? "border-white/20"
                : "border-gray-300"
            } ${darkMode ? "bg-white/10" : "bg-gray-100"}`}
          >
            <div
              className={`absolute top-0 h-full w-1/2 transition-transform ${
                userType === "trainer" ? "translate-x-full" : "translate-x-0"
              } bg-[#042C64]`}
            />
            <div className="relative h-full flex">
              <button
                type="button"
                onClick={() => {
                  setUserType("athlete");
                  setTouched(true);
                }}
                className={`flex-1 h-full transition-colors focus:outline-none ${
                  userType === "athlete"
                    ? "text-white"
                    : darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Athlete
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserType("trainer");
                  setTouched(true);
                }}
                className={`flex-1 h-full transition-colors focus:outline-none ${
                  userType === "trainer"
                    ? "text-white"
                    : darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className={`w-full sm:w-auto bg-[#042C64] hover:bg-[#647EA1] text-white ${
          !userType && touched ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {status === "loading" ? "Submitting..." : buttonText}
      </Button>
      {message && (
        <p
          className={`text-sm ${
            status === "error"
              ? "text-red-500"
              : status === "success"
              ? "text-green-500"
              : ""
          }`}
        >
          {message}
        </p>
      )}
      {showError && !message && (
        <p className="text-sm text-red-500">
          Please select if you are an Athlete or Trainer
        </p>
      )}
    </form>
  );
}
