import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  hoverable?: boolean;
  gradient?: "primary" | "accent" | "none";
  "data-ocid"?: string;
}

export function GlassCard({
  children,
  className,
  elevated = false,
  hoverable = false,
  gradient = "none",
  "data-ocid": dataOcid,
}: GlassCardProps) {
  const gradientClass = {
    primary:
      "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-primary/8 before:to-transparent before:pointer-events-none",
    accent:
      "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-accent/8 before:to-transparent before:pointer-events-none",
    none: "",
  }[gradient];

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        elevated ? "glass-elevated" : "glass",
        hoverable && "card-hover cursor-pointer",
        gradientClass,
        className,
      )}
      data-ocid={dataOcid}
    >
      {children}
    </div>
  );
}

// ─── Specialized variants ────────────────────────────────────────────────────

interface GlassCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}>
      {children}
    </div>
  );
}

export function GlassCardContent({
  children,
  className,
}: GlassCardHeaderProps) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function GlassCardFooter({ children, className }: GlassCardHeaderProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}

// ─── Stat card variant ────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  className?: string;
  "data-ocid"?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
  "data-ocid": dataOcid,
}: StatCardProps) {
  return (
    <GlassCard elevated className={cn("p-5", className)} data-ocid={dataOcid}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase mb-1">
            {label}
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
            {icon}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
