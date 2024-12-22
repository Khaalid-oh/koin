import NextAuth, { User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBPS7VSt09SyFR-OOuOK_LyCe7LWAzQSQk",
    authDomain: "koin-app-e9ae4.firebaseapp.com",
    projectId: "koin-app-e9ae4",
    storageBucket: "koin-app-e9ae4.firebasestorage.app",
    messagingSenderId: "687489889596",
    appId: "1:687489889596:web:0e076017947bcc74601a39",
    measurementId: "G-9DNBJ34DHM"
  };
  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )
          
          const user = userCredential.user

          return {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
          }
        } catch (error) {
          console.error("Firebase auth error:", error)
          return null
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (account?.provider === "google") {
        const searchParams = new URLSearchParams(account.access_token);
        const role = searchParams.get("role") || "athlete"; // Default to athlete if no role specified
        token.role = role;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
})

export { handler as GET, handler as POST }