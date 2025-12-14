import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Still loading user (initial mount)
  if (user === undefined) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AdminRoute;
