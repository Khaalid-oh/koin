"use client";

import { Navbar } from "./Navbar";
import { useDarkMode } from "@/app/context/DarkModeContext";

export function NavbarWrapper() {
  const { darkMode, setDarkMode } = useDarkMode();
  return <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />;
}
