import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronDown,
  LogIn,
  LogOut,
  Shield,
  Vote,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/use-auth";
import { useRole } from "../hooks/use-role";

export function NavBar() {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();
  const { role, isAdmin } = useRole();
  const router = useRouter();

  const truncatedPrincipal = principal
    ? `${principal.slice(0, 5)}…${principal.slice(-4)}`
    : null;

  const navLinks = [
    { href: "/elections", label: "Elections", icon: Vote },
    ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: BarChart3 }] : []),
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-lg"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.logo_link"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 transition-smooth group-hover:bg-primary/25">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display font-bold text-foreground tracking-tight">
            SecureVote
          </span>
        </Link>

        {/* Center nav */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-smooth hover:text-foreground hover:bg-muted/60"
                activeProps={{ className: "text-foreground bg-muted/60" }}
                data-ocid={`nav.${label.toLowerCase()}_link`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuthenticated && role && (
            <Badge
              variant="outline"
              className={
                isAdmin
                  ? "border-accent/50 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase"
                  : "border-primary/40 bg-primary/10 text-primary font-mono text-[10px] tracking-widest uppercase"
              }
              data-ocid="nav.role_badge"
            >
              {role}
            </Badge>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-border/60 bg-card/80 font-mono text-xs"
                  data-ocid="nav.user_menu_button"
                >
                  {truncatedPrincipal}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="glass-elevated min-w-44"
              >
                <DropdownMenuItem className="font-mono text-xs text-muted-foreground cursor-default">
                  {principal?.slice(0, 20)}…
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => router.navigate({ to: "/admin" })}
                    data-ocid="nav.admin_link"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => router.navigate({ to: "/elections" })}
                  data-ocid="nav.elections_link"
                >
                  <Vote className="mr-2 h-4 w-4" />
                  Elections
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={logout}
                  data-ocid="nav.logout_button"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              className="btn-primary-glow gap-2"
              onClick={login}
              disabled={isLoading}
              data-ocid="nav.login_button"
            >
              <LogIn className="h-3.5 w-3.5" />
              {isLoading ? "Connecting…" : "Sign In"}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
