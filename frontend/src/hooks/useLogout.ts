import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export function useLogout() {
  const logout = () => signOut(firebaseAuth);
  return { logout };
}
