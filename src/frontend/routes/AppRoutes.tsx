import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../pages/Welcome";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import Endpoints from "../utils/Endpoints";
import { TransactionsPage } from "../pages/TransactionsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { MarketplacePage } from "../pages/MarketplacePage";
import { ProfilePage } from "../pages/ProfilePage";
import { Home } from "../pages/DashboardHome";

export const AppRoutes = () => {
  const routes = useMemo(
    () => [
      { path: "/", element: <Welcome /> },
      { path: Endpoints.register, element: <RegisterPage /> },
      { path: Endpoints.login, element: <LoginPage /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "", // Default child route (renders Dashboard)
            element: <Home />,
          },
          {
            path: "profile", // /dashboard/profile
            element: <ProfilePage />,
          },
          {
            path: "marketplace", // /dashboard/marketplace
            element: <MarketplacePage />,
          },
          {
            path: "transactions", // /dashboard/transactions
            element: <TransactionsPage />,
          },
        ],
      },
      {
        path: "*", // Catch-all route for 404
        element: <Navigate to="/" replace />,
      },
    ],
    [],
  );

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};
