import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { ReactNode } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
