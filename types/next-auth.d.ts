import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      id: string
      email: string
      name: string
    }
  }
  interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
  }
} 