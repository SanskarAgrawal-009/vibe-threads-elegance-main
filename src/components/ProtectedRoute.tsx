import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole?: 'admin' | 'user';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole = 'admin' }) => {
  const { user, isLoading, isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If requires admin, must be authenticated and have role 'admin'
  if (requiredRole === 'admin') {
    if (!isAuthenticated || !isAdmin) {
      return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
    }
  } else {
    // Requires general customer authentication
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
  }

  return element;
};

export default ProtectedRoute;
