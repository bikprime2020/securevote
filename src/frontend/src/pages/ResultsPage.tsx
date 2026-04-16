import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  Clock,
  Radio,
  RefreshCw,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type {
  ElectionResults,
  ElectionStatus,
  QuestionResult,
  TurnoutInfo,
} from "../backend";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimatedPage";
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
} from "../components/GlassCard";
import { MarqueeStatusBar } from "../components/MarqueeStatusBar";
import { useRole } from "../hooks/use-role";
import type { StatusMessage } from "../types";

// ─── Data hooks ────────────────────────────────────────────────────────────────

function useElectionResults(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ElectionResults | null>({
    queryKey: ["results", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getElectionResults(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

function useLiveTurnout(id: bigint, enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TurnoutInfo | null>({
    queryKey: ["turnout", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTurnout(id);
    },
    enabled: !!actor && !isFetching && enabled,
    refetchInterval: 5_000,
    staleTime: 4_000,
  });
}

function useElectionStatus(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<{
    status: ElectionStatus;
    endTime: bigint;
    title: string;
  } | null>({
    queryKey: ["election-status", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      // Try listing all elections to find this one's status
      const all = await actor.listElections();
      const found = all.find((e) => e.id === id);
      if (!found) return null;
      return {
        status: found.status,
        endTime: found.endTime,
        title: found.title,
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  decimals = 1,
  suffix = "%",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    spring.set(target);
  }, [target, spring]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return unsub;
  }, [spring]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── Countdown timer ──────────────────────────────────────────────────────────

function useCountdown(endTimeNs: bigint) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const endMs = Number(endTimeNs) / 1_000_000;
    const update = () => {
      const diff = Math.max(0, endMs - Date.now());
      setRemaining(diff);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endTimeNs]);

  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { hours, minutes, seconds, done: remaining === 0 };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="glass-elevated rounded-xl px-4 py-3 min-w-[3.5rem] text-center"
        style={{ boxShadow: "0 0 20px oklch(0.7 0.18 250 / 0.1)" }}
      >
        <span className="font-display text-2xl font-bold text-foreground tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ─── Results pending state ─────────────────────────────────────────────────────

const pendingMessages: StatusMessage[] = [
  {
    id: "p1",
    text: "Results Pending — Votes are still being cast",
    type: "pending",
  },
  {
    id: "p2",
    text: "Election Active — Cryptographic verification in progress",
    type: "live",
  },
  {
    id: "p3",
    text: "Stay tuned — Results will be published when voting closes",
    type: "pending",
  },
  {
    id: "p4",
    text: "Zero-Knowledge Proofs — Your anonymity is guaranteed",
    type: "live",
  },
];

function ResultsPendingView({
  title,
  endTimeNs,
  isAdmin,
  turnout,
}: {
  title: string;
  endTimeNs: bigint;
  isAdmin: boolean;
  turnout: TurnoutInfo | null | undefined;
}) {
  const { hours, minutes, seconds } = useCountdown(endTimeNs);

  return (
    <div className="flex flex-col gap-8" data-ocid="results.pending_state">
      {/* Status marquee */}
      <div className="rounded-xl overflow-hidden border border-border/30">
        <MarqueeStatusBar messages={pendingMessages} />
      </div>

      {/* Pending hero card */}
      <GlassCard elevated gradient="primary" className="p-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut",
          }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass border border-primary/30"
          style={{ boxShadow: "0 0 40px oklch(0.7 0.18 250 / 0.2)" }}
        >
          <Clock className="h-8 w-8 text-primary" />
        </motion.div>

        <Badge
          variant="outline"
          className="mb-4 border-primary/40 bg-primary/10 font-mono text-[10px] text-primary uppercase tracking-widest"
        >
          <span className="relative mr-1.5 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Election In Progress
        </Badge>

        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
          {title}
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Results will be published automatically once the election closes
        </p>

        {/* Countdown */}
        <div className="flex items-end justify-center gap-3">
          <CountdownUnit value={hours} label="hours" />
          <span className="mb-3 font-display text-2xl font-bold text-muted-foreground">
            :
          </span>
          <CountdownUnit value={minutes} label="min" />
          <span className="mb-3 font-display text-2xl font-bold text-muted-foreground">
            :
          </span>
          <CountdownUnit value={seconds} label="sec" />
        </div>
      </GlassCard>

      {/* Live turnout for admins */}
      {isAdmin && turnout && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard
            elevated
            gradient="accent"
            className="p-6"
            data-ocid="results.live_turnout_card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/30">
                  <Radio className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Admin Live View
                  </p>
                  <p className="font-display text-sm font-semibold text-foreground">
                    Live Turnout
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-accent/40 bg-accent/10 font-mono text-[10px] text-accent"
              >
                <RefreshCw className="mr-1 h-2.5 w-2.5 animate-spin" />
                5s refresh
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="glass rounded-lg p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  <AnimatedCounter target={turnout.turnoutPercent} />
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Turnout
                </p>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  {turnout.totalVotesCast.toString()}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Votes Cast
                </p>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  <AnimatedCounter target={turnout.turnoutPercent} />
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Participation
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, turnout.turnoutPercent)}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.7 0.18 180), oklch(0.65 0.18 40))",
                }}
                className="h-full rounded-full"
              />
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

// ─── Animated bar chart ────────────────────────────────────────────────────────

function ResultBar({
  label,
  votes,
  total,
  isWinner,
  index,
}: {
  label: string;
  votes: bigint;
  total: bigint;
  isWinner: boolean;
  index: number;
}) {
  const percentage =
    total > BigInt(0) ? (Number(votes) / Number(total)) * 100 : 0;

  const barStyle = isWinner
    ? {
        background:
          "linear-gradient(to right, oklch(0.7 0.18 180), oklch(0.65 0.18 40))",
      }
    : {
        background:
          "linear-gradient(to right, oklch(0.7 0.18 180 / 0.5), oklch(0.65 0.18 250 / 0.3))",
      };

  const winnerGlow = isWinner
    ? {
        boxShadow:
          "0 0 16px oklch(0.65 0.18 40 / 0.5), 0 0 6px oklch(0.65 0.18 40 / 0.3)",
      }
    : {};

  return (
    <motion.div
      className="flex flex-col gap-2"
      data-ocid={`results.option_bar.${index + 1}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 min-w-0">
          {isWinner ? (
            <motion.span
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              <Trophy className="h-3.5 w-3.5 shrink-0 text-accent" />
            </motion.span>
          ) : (
            <span className="h-3.5 w-3.5 shrink-0" />
          )}
          <span
            className={`truncate font-medium ${
              isWinner ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 ml-3">
          <span className="font-mono text-xs text-muted-foreground">
            {votes.toString()} votes
          </span>
          <span
            className={`font-display text-base font-bold tabular-nums ${
              isWinner ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div
        className="relative h-3 w-full overflow-hidden rounded-full bg-muted/40"
        style={
          isWinner
            ? { boxShadow: "inset 0 0 0 1px oklch(0.65 0.18 40 / 0.25)" }
            : {}
        }
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1.1,
            delay: 0.3 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ ...barStyle, ...winnerGlow }}
        />
        {/* Shimmer effect on winner */}
        {isWinner && (
          <motion.div
            className="absolute inset-y-0 w-12 rounded-full opacity-40"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(1 0 0 / 0.6), transparent)",
            }}
            animate={{ x: ["-3rem", "100vw"] }}
            transition={{
              duration: 2,
              delay: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 4,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

// ─── Question result card ──────────────────────────────────────────────────────

function QuestionResultCard({
  question,
  index,
}: {
  question: QuestionResult;
  index: number;
}) {
  const totalVotes = question.optionCounts.reduce(
    (sum, [, count]) => sum + count,
    BigInt(0),
  );

  const maxVotes = question.optionCounts.reduce(
    (max, [, count]) => (count > max ? count : max),
    BigInt(0),
  );

  const sorted = [...question.optionCounts].sort(([, a], [, b]) =>
    b > a ? 1 : b < a ? -1 : 0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 + index * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <GlassCard
        elevated
        data-ocid={`results.question_card.${index + 1}`}
        className="overflow-visible"
      >
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Badge
                variant="outline"
                className="font-mono text-[10px] text-muted-foreground border-border/50"
              >
                Q{index + 1}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {totalVotes.toString()} total votes
              </span>
            </div>
            {maxVotes > BigInt(0) && (
              <Badge
                variant="outline"
                className="border-accent/40 bg-accent/10 font-mono text-[10px] text-accent"
              >
                <Trophy className="mr-1 h-2.5 w-2.5" />
                Winner declared
              </Badge>
            )}
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
            {question.questionText}
          </h3>
        </GlassCardHeader>

        <GlassCardContent>
          <div className="flex flex-col gap-5">
            {sorted.map(([optionText, voteCount], oi) => (
              <ResultBar
                key={`${question.questionId.toString()}-${oi}`}
                label={optionText}
                votes={voteCount}
                total={totalVotes}
                isWinner={voteCount === maxVotes && maxVotes > BigInt(0)}
                index={oi}
              />
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
    </motion.div>
  );
}

// ─── Turnout hero card ─────────────────────────────────────────────────────────

function TurnoutHeroCard({ results }: { results: ElectionResults }) {
  const pct = results.turnoutPercent;
  const circumference = 2 * Math.PI * 52;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard
        elevated
        gradient="primary"
        className="p-6"
        data-ocid="results.turnout_card"
      >
        <div className="flex items-center gap-6">
          {/* Circular ring */}
          <div className="relative shrink-0">
            <svg
              width="120"
              height="120"
              className="-rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                strokeWidth="6"
                className="stroke-muted/40"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                style={{
                  stroke: "url(#turnoutGrad)",
                  strokeDasharray: circumference,
                }}
                initial={{ strokeDashoffset: circumference }}
                animate={{
                  strokeDashoffset: circumference - (circumference * pct) / 100,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <defs>
                <linearGradient
                  id="turnoutGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="oklch(0.7 0.18 180)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 250)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-bold text-foreground tabular-nums">
                <AnimatedCounter target={pct} />
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Final Voter Turnout
            </p>
            <p className="font-display text-3xl font-bold text-foreground mb-4">
              <AnimatedCounter target={pct} decimals={1} />
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Users className="h-3 w-3 text-primary" />
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    Voted
                  </span>
                </div>
                <p className="font-display text-lg font-bold text-foreground">
                  {results.totalVoters.toString()}
                </p>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">
                    Eligible
                  </span>
                </div>
                <p className="font-display text-lg font-bold text-foreground">
                  {results.eligibleVoterCount.toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Closed results view ───────────────────────────────────────────────────────

function ClosedResultsView({ results }: { results: ElectionResults }) {
  return (
    <StaggerContainer className="flex flex-col gap-6">
      {/* Election header */}
      <StaggerItem>
        <div className="flex items-start gap-4">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl glass border border-primary/30"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ boxShadow: "0 0 32px oklch(0.7 0.18 250 / 0.15)" }}
          >
            <BarChart3 className="h-6 w-6 text-primary" />
          </motion.div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl leading-tight">
                {results.title}
              </h1>
              <Badge
                variant="outline"
                className="shrink-0 border-primary/40 bg-primary/10 font-mono text-[10px] text-primary uppercase tracking-widest"
              >
                Results Final
              </Badge>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Election closed · Cryptographically verified
            </p>
          </div>
        </div>
      </StaggerItem>

      {/* Turnout hero */}
      <StaggerItem>
        <TurnoutHeroCard results={results} />
      </StaggerItem>

      {/* Per-question results */}
      {results.questionResults.map((question, qi) => (
        <StaggerItem key={question.questionId.toString()}>
          <QuestionResultCard question={question} index={qi} />
        </StaggerItem>
      ))}

      {/* Integrity footer */}
      <StaggerItem>
        <GlassCard className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              All votes have been cryptographically verified using
              zero-knowledge proofs. Every ballot is counted exactly as cast,
              with full anonymity preserved.
            </p>
          </div>
        </GlassCard>
      </StaggerItem>

      {/* Back button */}
      <StaggerItem>
        <div className="flex justify-center">
          <Link to="/elections">
            <Button
              variant="outline"
              className="border-border/60 hover:border-primary/50 transition-smooth"
              data-ocid="results.view_elections_button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Elections
            </Button>
          </Link>
        </div>
      </StaggerItem>
    </StaggerContainer>
  );
}

// ─── Loading skeleton ──────────────────────────────────────────────────────────

function ResultsSkeleton() {
  return (
    <div className="flex flex-col gap-6" data-ocid="results.loading_state">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-2xl" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-7 w-2/3" />
          <Skeleton className="h-3.5 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-36 w-full rounded-xl" />
      {[0, 1].map((i) => (
        <GlassCard key={i} elevated className="p-6">
          <Skeleton className="mb-4 h-5 w-1/2" />
          {[0, 1, 2].map((j) => (
            <div key={j} className="mb-5">
              <div className="mb-2 flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          ))}
        </GlassCard>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const { id } = useParams({ from: "/results/$id" });
  const electionId = BigInt(id);

  const { isAdmin } = useRole();

  const {
    data: results,
    isLoading: resultsLoading,
    error: resultsError,
  } = useElectionResults(electionId);

  const { data: statusData, isLoading: statusLoading } =
    useElectionStatus(electionId);

  // Live turnout — only for admins when election is active
  const isActive = statusData?.status === "active";
  const { data: liveTurnout } = useLiveTurnout(electionId, isAdmin && isActive);

  const isLoading = resultsLoading || statusLoading;

  // Determine whether results are available
  const isClosed = !!results;
  const isPending =
    !isClosed && (isActive || statusData?.status === "scheduled");

  return (
    <AnimatedPage direction="up">
      <div className="container max-w-3xl py-10 pb-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/elections"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="results.back_link"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Elections
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <ResultsSkeleton />
            </motion.div>
          ) : resultsError && !results && !isPending ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard
                elevated
                className="p-10 text-center"
                data-ocid="results.error_state"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/25">
                  <BarChart3 className="h-7 w-7 text-destructive" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Results unavailable
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  This election may not exist, or results haven't been published
                  yet.
                </p>
                <Link to="/elections">
                  <Button
                    variant="outline"
                    className="mt-6 border-border/60"
                    data-ocid="results.back_button"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Elections
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          ) : isPending && statusData ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultsPendingView
                title={statusData.title}
                endTimeNs={statusData.endTime}
                isAdmin={isAdmin}
                turnout={liveTurnout}
              />
            </motion.div>
          ) : results ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ClosedResultsView results={results} />
            </motion.div>
          ) : (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard
                elevated
                className="p-10 text-center"
                data-ocid="results.empty_state"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl glass border border-border/40">
                  <BarChart3 className="h-7 w-7 text-muted-foreground" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Election not found
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We couldn't locate this election. It may have been removed.
                </p>
                <Link to="/elections">
                  <Button
                    variant="outline"
                    className="mt-6 border-border/60"
                    data-ocid="results.back_button"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Elections
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
}
