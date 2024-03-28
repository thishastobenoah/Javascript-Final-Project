import { useState } from "react";
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { FirebaseError } from "firebase/app";

export type LoginWithEmailAndPassword = {
  email: string;
  password: string;
};

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const login = async ({ email, password }: LoginWithEmailAndPassword) => {
    try {
      setIsLoading(true);
      setError("");

      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      console.log(`[useLogin]: Signed in user ${result}`);
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            setError("Email is invalid.");
            break;
          default:
            setError(e.message);
            break;
        }
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useLoginWithGoogle() {
  const loginWithGoogle = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.addScope("email");
    googleAuthProvider.addScope("profile");

    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    console.log(`[useLogin]: Signed in user with Google ${result}`);
  };

  return { loginWithGoogle };
}
