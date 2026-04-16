import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserRole } from "../types";
import { useAuth } from "./use-auth";

export function useRole() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated, principal } = useAuth();

  const query = useQuery<UserRole>({
    queryKey: ["callerRole", principal],
    queryFn: async (): Promise<UserRole> => {
      if (!actor) return null;
      // Backend exposes getCallerUserRole — returns a UserRole enum value
      const raw = await actor.getCallerUserRole();
      if (!raw) return null;
      // Backend UserRole enum values are lowercase
      if (raw === "admin") return "Admin";
      if (raw === "user" || raw === "guest") return "Voter";
      return null;
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 30_000,
  });

  return {
    role: query.data ?? null,
    isAdmin: query.data === "Admin",
    isVoter: query.data === "Voter",
    isLoading: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
}
