import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@dfinity/agent";
import { type ReactNode, createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();

  const isAuthenticated =
    loginStatus === "success" && identity !== null && identity !== undefined;

  const principal = isAuthenticated ? identity!.getPrincipal().toText() : null;

  const logout = async () => {
    await clear();
  };

  const handleLogin = async () => {
    await login();
  };

  const value: AuthContextValue = {
    isAuthenticated,
    identity: identity ?? null,
    principal,
    login: handleLogin,
    logout,
    isLoading: loginStatus === "logging-in",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
