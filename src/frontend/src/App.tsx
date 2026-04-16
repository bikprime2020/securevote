import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Toaster } from "sonner";

import { LoadingScreen } from "./components/LoadingScreen";
import { MarqueeStatusBar } from "./components/MarqueeStatusBar";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./hooks/use-auth";

import { Skeleton } from "@/components/ui/skeleton";
// ─── Lazy page imports (placeholder shells until page tasks run) ──────────────
// Each page will be written in subsequent tasks; use lazy placeholders for now.
import { Suspense, lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ElectionsPage = lazy(() => import("./pages/ElectionsPage"));
const VotePage = lazy(() => import("./pages/VotePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NewElectionPage = lazy(() => import("./pages/NewElectionPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));

function PageFallback() {
  return (
    <div className="container py-16 flex flex-col gap-4">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background dot-grid">
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/4 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/3 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <NavBar />
        <MarqueeStatusBar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <footer className="border-t border-border/30 bg-card/40 backdrop-blur-sm py-6">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
            <span>
              © {new Date().getFullYear()} SecureVote. All rights reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LandingPage />
    </Suspense>
  ),
});

const electionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/elections",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ElectionsPage />
    </Suspense>
  ),
});

const voteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/elections/$id/vote",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VotePage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminPage />
    </Suspense>
  ),
});

const newElectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/elections/new",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <NewElectionPage />
    </Suspense>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ResultsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  electionsRoute,
  voteRoute,
  adminRoute,
  newElectionRoute,
  resultsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "glass-elevated font-body text-sm",
          }}
        />
        {!loadingDone && (
          <LoadingScreen onComplete={() => setLoadingDone(true)} />
        )}
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
