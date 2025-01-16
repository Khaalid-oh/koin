// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDbnZ1Y0rHHs72hUeXOZhKY9FZky3pWO4",
  authDomain: "koin-fc997.firebaseapp.com",
  projectId: "koin-fc997",
  storageBucket: "koin-fc997.firebasestorage.app",
  messagingSenderId: "465608381433",
  appId: "1:465608381433:web:a599cb8c677e19088ce328",
  measurementId: "G-Y11F65QYH7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db};

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({   
  prompt : "select_account "
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);