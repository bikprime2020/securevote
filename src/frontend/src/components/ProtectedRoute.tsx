import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";
import { useRole } from "../hooks/use-role";
import type { UserRole } from "../types";

interface ProtectedRouteProps {
  children: ReactNode;
  /** If provided, only this role can access */
  requiredRole?: UserRole;
  /** Where to redirect if not authenticated */
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  // While auth or role is resolving, show a skeleton placeholder
  if (authLoading || (isAuthenticated && requiredRole && roleLoading)) {
    return (
      <div
        className="container py-16 flex flex-col gap-4 items-center"
        data-ocid="protected_route.loading_state"
      >
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-4 w-60" />
      </div>
    );
  }

  // Not authenticated → redirect
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Wrong role → redirect to landing (not forbidden page for now)
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}
