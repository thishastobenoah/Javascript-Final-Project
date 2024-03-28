import { useState } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { FirebaseError } from "firebase/app";

export type CreateUserWithEmailAndPassword = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const register = async ({
    email,
    password,
    confirmPassword,
  }: CreateUserWithEmailAndPassword) => {
    try {
      setIsLoading(true);
      setError("");

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      console.log(`[useRegister]: Created User ${result}`);
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case AuthErrorCodes.WEAK_PASSWORD:
            setError("Password is too weak.");
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

  return { register, isLoading, error };
}
