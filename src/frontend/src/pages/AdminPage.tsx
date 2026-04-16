import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Clock,
  Plus,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type { ElectionSummary, TurnoutInfo } from "../backend.d";
import { ElectionStatus } from "../backend.d";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimatedPage";
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  StatCard,
} from "../components/GlassCard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { formatElectionDate } from "../types";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ElectionStatus }) {
  const config: Record<ElectionStatus, { label: string; className: string }> = {
    [ElectionStatus.active]: {
      label: "● LIVE",
      className:
        "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 animate-pulse",
    },
    [ElectionStatus.scheduled]: {
      label: "Upcoming",
      className: "bg-primary/15 text-primary border-primary/30",
    },
    [ElectionStatus.closed]: {
      label: "Closed",
      className: "bg-muted/60 text-muted-foreground border-border/40",
    },
  };

  const cfg = config[status] ?? config[ElectionStatus.closed];
  return (
    <Badge
      variant="outline"
      className={`text-xs font-mono px-2 py-0.5 ${cfg.className}`}
    >
      {cfg.label}
    </Badge>
  );
}

// ─── Live turnout cell ────────────────────────────────────────────────────────

function LiveTurnoutCell({ electionId }: { electionId: bigint }) {
  const { actor, isFetching } = useActor(createActor);

  const { data: turnout } = useQuery<TurnoutInfo | null>({
    queryKey: ["turnout", electionId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getTurnout(electionId);
      return result ?? null;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  if (!turnout) {
    return <span className="text-muted-foreground text-sm font-mono">—</span>;
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm font-mono font-semibold text-foreground">
        {Number(turnout.totalVotesCast).toLocaleString()}
      </span>
      <span className="text-xs text-emerald-400 font-mono">
        {turnout.turnoutPercent.toFixed(1)}%
      </span>
    </div>
  );
}

// ─── Election row ─────────────────────────────────────────────────────────────

function ElectionRow({
  election,
  index,
}: {
  election: ElectionSummary;
  index: number;
}) {
  const isActive = election.status === ElectionStatus.active;

  return (
    <StaggerItem>
      <motion.div
        className="group grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 rounded-xl glass-subtle border border-border/20 hover:border-primary/30 transition-smooth"
        whileHover={{ scale: 1.005, x: 2 }}
        data-ocid={`admin.election.item.${index + 1}`}
      >
        {/* Title + description */}
        <div className="min-w-0">
          <p className="font-display font-semibold text-foreground truncate text-sm">
            {election.title}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {election.description}
          </p>
        </div>

        {/* Status */}
        <div className="flex-shrink-0">
          <StatusBadge status={election.status} />
        </div>

        {/* Dates */}
        <div className="hidden md:flex flex-col gap-0.5 text-xs text-muted-foreground font-mono flex-shrink-0 w-36">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {formatElectionDate(election.startTime)}
          </span>
          <span className="flex items-center gap-1 opacity-60">
            <Clock size={10} />
            {formatElectionDate(election.endTime)}
          </span>
        </div>

        {/* Votes / Turnout */}
        <div className="hidden sm:block flex-shrink-0 w-20">
          {isActive ? (
            <LiveTurnoutCell electionId={election.id} />
          ) : (
            <span className="text-sm font-mono text-muted-foreground">—</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/results/$id"
            params={{ id: election.id.toString() }}
            data-ocid={`admin.election.results_link.${index + 1}`}
          >
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-3 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
            >
              <BarChart3 size={12} className="mr-1" />
              Results
            </Button>
          </Link>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────

function ElectionRowSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 rounded-xl glass-subtle border border-border/20">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="hidden md:block h-8 w-36" />
      <Skeleton className="hidden sm:block h-6 w-16" />
      <Skeleton className="h-7 w-20 rounded-md" />
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function AdminDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 10_000);
    return () => clearInterval(id);
  }, []);
  void tick;

  const { data: elections, isPending } = useQuery<ElectionSummary[]>({
    queryKey: ["listElections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listElections();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });

  const active =
    elections?.filter((e) => e.status === ElectionStatus.active) ?? [];
  const upcoming =
    elections?.filter((e) => e.status === ElectionStatus.scheduled) ?? [];
  const closed =
    elections?.filter((e) => e.status === ElectionStatus.closed) ?? [];

  return (
    <AnimatedPage direction="up" className="container py-10 max-w-6xl">
      {/* Header */}
      <StaggerContainer className="mb-8">
        <StaggerItem>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-primary/20 text-primary text-xs font-mono mb-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Admin Dashboard
              </motion.div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Elections Overview
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage, monitor, and analyze all elections on SecureVote.
              </p>
            </div>
            <Link
              to="/admin/elections/new"
              data-ocid="admin.create_election_button"
            >
              <Button className="btn-accent-glow font-display gap-2 border border-accent/40">
                <Plus size={16} />
                New Election
              </Button>
            </Link>
          </div>
        </StaggerItem>

        {/* Stat cards */}
        <StaggerItem>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <StatCard
              label="Total Elections"
              value={isPending ? "—" : (elections?.length ?? 0)}
              icon={<Vote size={18} />}
              data-ocid="admin.stat.total_elections"
            />
            <StatCard
              label="Live Now"
              value={isPending ? "—" : active.length}
              icon={<Activity size={18} />}
              trend="Polling every 5s"
              data-ocid="admin.stat.active_elections"
            />
            <StatCard
              label="Upcoming"
              value={isPending ? "—" : upcoming.length}
              icon={<TrendingUp size={18} />}
              data-ocid="admin.stat.upcoming_elections"
            />
            <StatCard
              label="Closed"
              value={isPending ? "—" : closed.length}
              icon={<Users size={18} />}
              data-ocid="admin.stat.closed_elections"
            />
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Elections panel */}
      <StaggerContainer staggerDelay={0.06}>
        <StaggerItem>
          <GlassCard
            elevated
            gradient="primary"
            data-ocid="admin.elections.panel"
          >
            <GlassCardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                  <Vote size={18} className="text-primary" />
                  All Elections
                </h2>
                <span className="text-xs font-mono text-muted-foreground">
                  {isPending ? "Loading…" : `${elections?.length ?? 0} total`}
                </span>
              </div>
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-2 mt-2 rounded-lg bg-muted/20">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Election
                </span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Status
                </span>
                <span className="hidden md:block text-xs font-mono text-muted-foreground uppercase tracking-wider w-36">
                  Dates
                </span>
                <span className="hidden sm:block text-xs font-mono text-muted-foreground uppercase tracking-wider w-20">
                  Votes
                </span>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Actions
                </span>
              </div>
            </GlassCardHeader>

            <GlassCardContent className="pt-0">
              {isPending ? (
                <div
                  className="flex flex-col gap-2"
                  data-ocid="admin.elections.loading_state"
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    <ElectionRowSkeleton key={i} />
                  ))}
                </div>
              ) : !elections || elections.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-16 gap-3"
                  data-ocid="admin.elections.empty_state"
                >
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-muted-foreground">
                    <Vote size={28} />
                  </div>
                  <p className="text-foreground font-display font-semibold">
                    No elections yet
                  </p>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">
                    Create your first election to get started with SecureVote.
                  </p>
                  <Link
                    to="/admin/elections/new"
                    data-ocid="admin.elections_empty.create_button"
                  >
                    <Button size="sm" className="btn-accent-glow mt-1 gap-1">
                      <Plus size={14} />
                      Create Election
                    </Button>
                  </Link>
                </div>
              ) : (
                <StaggerContainer className="flex flex-col gap-2">
                  {elections.map((election, index) => (
                    <ElectionRow
                      key={election.id.toString()}
                      election={election}
                      index={index}
                    />
                  ))}
                </StaggerContainer>
              )}
            </GlassCardContent>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>
    </AnimatedPage>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="Admin" redirectTo="/">
      <AdminDashboard />
    </ProtectedRoute>
  );
}
