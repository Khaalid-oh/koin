import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/firebase/client";
import { useToast } from "@/app/context/ToastContext";

import {
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const formatAuthUser = (user: any) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const router = useRouter();
  //const { showToast } = useToast();
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };
  const signOut = () => _signOut(auth).then(clear);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser as any);

    setLoading(false);
  };

  const onAuthStateChanged = (cb: any) => {
    return _onAuthStateChanged(auth, cb);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    isLoggedIn: !!authUser,
    signOut,
  };
}
