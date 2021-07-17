import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
  uid: string;
  displayName: string;
  photoURL: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing user info');
        }

        setUser({
          uid,
          displayName,
          photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInResult = await auth.signInWithPopup(provider);

    if (signInResult.user) {
      const { displayName, photoURL, uid } = signInResult.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing user info');
      }

      setUser({
        uid,
        displayName,
        photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}