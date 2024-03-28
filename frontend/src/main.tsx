import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Index } from "./pages/index/index.tsx";
import { Login } from "./pages/login/login.tsx";
import { Register } from "./pages/register/register.tsx";
import { Profile } from "./pages/profile/profile.tsx";
import { RequireAuth } from "./utils/requireAuth.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Agents from "./components/Agents/Agents.tsx";
import Heroes from "./components/Heroes/Heroes.tsx";
import Legends from "./components/Legends/Legends.tsx";
import "./index.css";
import { Stats } from "./pages/stats/stats.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/agents",
    element: <Agents />,
  },
  {
    path: "/legends",
    element: <Legends />,
  },
  {
    path: "/heroes",
    element: <Heroes />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/user/:userId",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
