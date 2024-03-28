import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useUser() {
  const user = useContext(AuthContext);
  return { user };
}
