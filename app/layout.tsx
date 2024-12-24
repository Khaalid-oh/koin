import { NavbarWrapper } from "@/components/NavbarWrapper";
import { Providers } from "./providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthUserProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Koin",
  description: "Connect with professional coaches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthUserProvider>
          <DarkModeProvider>
            <ToastProvider>
              <Providers>
                <main className="min-h-screen flex flex-col">
                  <NavbarWrapper />
                  {children}
                </main>
              </Providers>
            </ToastProvider>
          </DarkModeProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
