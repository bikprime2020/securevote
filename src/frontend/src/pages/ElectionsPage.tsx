import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Vote,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import type { ElectionSummary } from "../backend";
import { ElectionStatus } from "../backend";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimatedPage";
import {
  GlassCard,
  GlassCardContent,
  GlassCardFooter,
  GlassCardHeader,
} from "../components/GlassCard";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusConfig(status: ElectionStatus) {
  switch (status) {
    case ElectionStatus.active:
      return {
        label: "Live",
        dotClass: "bg-emerald-400 animate-pulse",
        badgeClass:
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-widest",
        Icon: Vote,
      };
    case ElectionStatus.scheduled:
      return {
        label: "Scheduled",
        dotClass: "bg-primary",
        badgeClass:
          "border-primary/30 bg-primary/10 text-primary font-mono text-[10px] uppercase tracking-widest",
        Icon: CalendarClock,
      };
    case ElectionStatus.closed:
      return {
        label: "Closed",
        dotClass: "bg-muted-foreground",
        badgeClass:
          "border-border/50 bg-muted/20 text-muted-foreground font-mono text-[10px] uppercase tracking-widest",
        Icon: CheckCircle2,
      };
    default:
      return {
        label: "Unknown",
        dotClass: "bg-muted-foreground",
        badgeClass:
          "border-border/50 bg-muted/20 text-muted-foreground font-mono text-[10px] uppercase tracking-widest",
        Icon: Clock,
      };
  }
}

// ─── Election Card ─────────────────────────────────────────────────────────────

function ElectionCard({
  election,
  index,
}: {
  election: ElectionSummary;
  index: number;
}) {
  const isActive = election.status === ElectionStatus.active;
  const isClosed = election.status === ElectionStatus.closed;
  const { label, dotClass, badgeClass, Icon } = getStatusConfig(
    election.status,
  );

  return (
    <StaggerItem>
      <motion.div
        whileHover={isActive || isClosed ? { scale: 1.016, y: -3 } : {}}
        transition={{ duration: 0.22, ease: "easeOut" }}
        data-ocid={`elections.item.${index + 1}`}
      >
        <GlassCard
          elevated
          hoverable={isActive || isClosed}
          gradient={isActive ? "primary" : "none"}
          className={
            isActive
              ? "border-primary/30 shadow-[0_0_40px_-12px_oklch(var(--primary)/0.3)]"
              : undefined
          }
        >
          <GlassCardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground truncate leading-tight">
                  {election.title}
                </h3>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 flex items-center gap-1.5 ${badgeClass}`}
                data-ocid={`elections.status.${index + 1}`}
              >
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${dotClass}`}
                />
                {label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-2 pl-12">
              {election.description}
            </p>
          </GlassCardHeader>

          <GlassCardContent>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                  Opens
                </span>
                <span className="flex items-center gap-1">
                  <CalendarClock className="h-3 w-3 text-primary/60" />
                  {formatDate(election.startTime)}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
                  Closes
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-accent/70" />
                  {formatDate(election.endTime)}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border/25 text-xs text-muted-foreground font-mono">
              {Number(election.questionCount)} question
              {Number(election.questionCount) !== 1 ? "s" : ""}
            </div>
          </GlassCardContent>

          <GlassCardFooter className="gap-2">
            {isActive && (
              <Link
                to="/elections/$id/vote"
                params={{ id: String(election.id) }}
                className="flex-1"
              >
                <Button
                  className="btn-primary-glow w-full gap-2 font-semibold"
                  data-ocid={`elections.vote_button.${index + 1}`}
                >
                  <Zap className="h-4 w-4" />
                  Cast Your Vote
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </Link>
            )}
            {isClosed && (
              <Link
                to="/results/$id"
                params={{ id: String(election.id) }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 border-border/50"
                  data-ocid={`elections.results_button.${index + 1}`}
                >
                  View Results
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </Link>
            )}
            {election.status === ElectionStatus.scheduled && (
              <p className="w-full text-center text-xs text-muted-foreground font-mono py-1">
                Opens {formatDate(election.startTime)}
              </p>
            )}
          </GlassCardFooter>
        </GlassCard>
      </motion.div>
    </StaggerItem>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="glass-elevated rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full shrink-0" />
      </div>
      <Skeleton className="h-4 w-full ml-12" />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ElectionsPage() {
  const { actor, isFetching } = useActor(createActor);

  const {
    data: elections,
    isLoading,
    error,
  } = useQuery<ElectionSummary[]>({
    queryKey: ["elections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listElections();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });

  const activeElections =
    elections?.filter((e) => e.status === ElectionStatus.active) ?? [];
  const otherElections =
    elections?.filter((e) => e.status !== ElectionStatus.active) ?? [];

  return (
    <AnimatedPage direction="up">
      <div
        className="container py-12 max-w-5xl mx-auto px-4"
        data-ocid="elections.page"
      >
        {/* Page header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest glass-subtle text-primary border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse inline-block" />
              Secure Voting
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3 leading-tight">
            Elections <span className="text-gradient-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Participate in secure, anonymous elections powered by cryptographic
            integrity. Every vote is verifiable — your identity stays private.
          </p>
        </motion.div>

        {/* Error state */}
        {error && (
          <GlassCard
            elevated
            className="p-6 mb-8 border-destructive/30"
            data-ocid="elections.error_state"
          >
            <p className="text-destructive font-medium">
              Failed to load elections. Please try again.
            </p>
          </GlassCard>
        )}

        {/* Loading */}
        {isLoading && (
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2"
            data-ocid="elections.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Active elections */}
        {!isLoading && activeElections.length > 0 && (
          <section className="mb-10" data-ocid="elections.active.section">
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Live Now
              </h2>
            </motion.div>
            <StaggerContainer className="grid gap-5 sm:grid-cols-2">
              {activeElections.map((election, idx) => (
                <ElectionCard
                  key={String(election.id)}
                  election={election}
                  index={idx}
                />
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Other elections */}
        {!isLoading && otherElections.length > 0 && (
          <section data-ocid="elections.other.section">
            <motion.div
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                All Elections
              </h2>
            </motion.div>
            <StaggerContainer className="grid gap-5 sm:grid-cols-2">
              {otherElections.map((election, idx) => (
                <ElectionCard
                  key={String(election.id)}
                  election={election}
                  index={activeElections.length + idx}
                />
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Empty state */}
        {!isLoading && !error && elections?.length === 0 && (
          <motion.div
            className="flex flex-col items-center py-24 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            data-ocid="elections.empty_state"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl glass-elevated surface-glow">
              <Vote className="h-9 w-9 text-primary/60" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              No elections yet
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              There are no elections available right now. Check back soon or ask
              an administrator to create one.
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
}
