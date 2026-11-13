import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../model/authSlice";
import type { Role } from "../types";

interface Props {
  children: ReactNode;
  role?: Role;
}

// <ProtectedRoute> для залогінених, <ProtectedRoute role="admin"> для адміна
export default function ProtectedRoute({ children, role }: Props) {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
}