import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CheckCircle2,
  Copy,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { Election, Question } from "../backend";
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
import { ProtectedRoute } from "../components/ProtectedRoute";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useElection(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Election | null>({
    queryKey: ["election", String(id)],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getElection(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

function useHasVoted(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["hasVoted", String(id)],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasVoted(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getQuestionOptions(question: Question): string[] {
  if (question.questionType.__kind__ === "multipleChoice") {
    return question.questionType.multipleChoice.options;
  }
  if (question.questionType.__kind__ === "yesNo") {
    return ["Yes", "No"];
  }
  return [];
}

function isYesNo(question: Question): boolean {
  return question.questionType.__kind__ === "yesNo";
}

// ─── Option components ────────────────────────────────────────────────────────

interface RadioOptionProps {
  option: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
  questionIndex: number;
  hasError: boolean;
}

function RadioOption({
  option,
  selected,
  onSelect,
  index,
  questionIndex,
  hasError,
}: RadioOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.988 }}
      className={[
        "w-full text-left rounded-xl border p-4 transition-smooth cursor-pointer",
        selected
          ? "border-primary/60 bg-primary/12 shadow-[0_0_20px_-8px_oklch(var(--primary)/0.4)]"
          : hasError
            ? "border-destructive/50 bg-destructive/5 hover:border-destructive/70"
            : "border-border/40 bg-card/50 hover:border-primary/30 hover:bg-card/80",
      ].join(" ")}
      data-ocid={`vote.option.${questionIndex + 1}.${index + 1}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-smooth",
            selected ? "border-primary bg-primary" : "border-border/60",
          ].join(" ")}
        >
          {selected && (
            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
          )}
        </div>
        <span className="font-medium text-foreground text-sm">{option}</span>
      </div>
    </motion.button>
  );
}

interface YesNoOptionProps {
  option: string;
  selected: boolean;
  onSelect: () => void;
  index: number;
  questionIndex: number;
  hasError: boolean;
}

function YesNoOption({
  option,
  selected,
  onSelect,
  index,
  questionIndex,
  hasError,
}: YesNoOptionProps) {
  const isYes = option === "Yes";
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={[
        "flex-1 py-4 rounded-xl border-2 font-display font-semibold text-lg transition-smooth cursor-pointer",
        selected
          ? isYes
            ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-400 shadow-[0_0_24px_-8px_#10b981]"
            : "border-destructive/70 bg-destructive/15 text-destructive shadow-[0_0_24px_-8px_oklch(var(--destructive)/0.5)]"
          : hasError
            ? "border-destructive/40 bg-destructive/5 text-foreground/70"
            : "border-border/40 bg-card/50 text-foreground/70 hover:border-border/70 hover:bg-card/80",
      ].join(" ")}
      data-ocid={`vote.yn_option.${questionIndex + 1}.${index + 1}`}
    >
      {option}
    </motion.button>
  );
}

// ─── Vote Confirmation Modal ──────────────────────────────────────────────────

interface ConfirmationModalProps {
  token: string;
  electionId: string;
  onClose: () => void;
}

function VoteConfirmationModal({
  token,
  electionId,
  onClose,
}: ConfirmationModalProps) {
  const [copied, setCopied] = useState(false);

  async function copyToken() {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Token copied to clipboard!");
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="vote.dialog"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <GlassCard elevated gradient="primary" className="p-8 text-center">
          {/* Animated checkmark */}
          <motion.div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl glass surface-glow"
            initial={{ scale: 0.3, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
          >
            <CheckCircle className="h-10 w-10 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Vote Cast!
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your vote has been cryptographically sealed and anonymously
              recorded on the blockchain.
            </p>
          </motion.div>

          <motion.div
            className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Anonymous Confirmation Token
            </p>
            <p className="font-mono text-sm font-bold text-primary break-all leading-relaxed">
              {token}
            </p>
          </motion.div>

          <motion.p
            className="mb-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Save this token — it proves your vote was counted without revealing
            your identity.
          </motion.p>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              className="flex-1 gap-2 border-border/50"
              onClick={copyToken}
              data-ocid="vote.copy_token_button"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Token
                </>
              )}
            </Button>
            <Link
              to="/results/$id"
              params={{ id: electionId }}
              className="flex-1"
            >
              <Button
                className="btn-primary-glow w-full"
                data-ocid="vote.view_results_button"
              >
                View Results
              </Button>
            </Link>
          </motion.div>

          <Link
            to="/elections"
            className="mt-4 inline-block text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-4"
            onClick={onClose}
            data-ocid="vote.back_to_elections_link"
          >
            Back to Elections
          </Link>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selected: string | null;
  onSelect: (option: string) => void;
  hasError: boolean;
}

function QuestionCard({
  question,
  questionIndex,
  selected,
  onSelect,
  hasError,
}: QuestionCardProps) {
  const options = getQuestionOptions(question);
  const isYN = isYesNo(question);

  return (
    <StaggerItem>
      <GlassCard
        elevated
        className={hasError ? "border-destructive/40" : undefined}
        data-ocid={`vote.question_card.${questionIndex + 1}`}
      >
        <GlassCardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className="font-mono text-[10px] text-muted-foreground tracking-widest"
            >
              Q{questionIndex + 1}
            </Badge>
            {isYN && (
              <Badge
                variant="outline"
                className="font-mono text-[10px] tracking-widest border-primary/25 text-primary/70"
              >
                Yes / No
              </Badge>
            )}
            {!isYN && (
              <Badge
                variant="outline"
                className="font-mono text-[10px] tracking-widest border-primary/25 text-primary/70"
              >
                Single Choice
              </Badge>
            )}
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground leading-snug">
            {question.text}
          </h2>
          {hasError && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              Please select an option to continue
            </p>
          )}
        </GlassCardHeader>

        <GlassCardContent>
          {isYN ? (
            <div
              className="flex gap-3"
              data-ocid={`vote.yn_group.${questionIndex + 1}`}
            >
              {options.map((opt, oi) => (
                <YesNoOption
                  key={opt}
                  option={opt}
                  selected={selected === opt}
                  onSelect={() => onSelect(opt)}
                  index={oi}
                  questionIndex={questionIndex}
                  hasError={hasError}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col gap-3"
              data-ocid={`vote.options_group.${questionIndex + 1}`}
            >
              {options.map((opt, oi) => (
                <RadioOption
                  key={opt}
                  option={opt}
                  selected={selected === opt}
                  onSelect={() => onSelect(opt)}
                  index={oi}
                  questionIndex={questionIndex}
                  hasError={hasError}
                />
              ))}
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </StaggerItem>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function VotePage() {
  const { id: idStr } = useParams({ from: "/elections/$id/vote" });
  const electionId = BigInt(idStr);

  const { data: election, isLoading } = useElection(electionId);
  const { data: hasVoted, isLoading: checkingVote } = useHasVoted(electionId);
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  // Selections: questionId (string of bigint) -> selected option string
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showErrors, setShowErrors] = useState(false);
  const [confirmToken, setConfirmToken] = useState<string | null>(null);

  const castVoteMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !election) throw new Error("Not ready");
      const answers = election.questions.map((q) => ({
        questionId: q.id,
        selectedOption: selections[String(q.id)] ?? "",
      }));
      return actor.castVote({ electionId, answers });
    },
    onSuccess: (result) => {
      setConfirmToken(result.confirmationToken);
      queryClient.invalidateQueries({ queryKey: ["hasVoted", idStr] });
      queryClient.invalidateQueries({ queryKey: ["elections"] });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to cast vote. Please try again.";
      toast.error(msg);
    },
  });

  function handleSelect(questionId: bigint, option: string) {
    setSelections((prev) => ({ ...prev, [String(questionId)]: option }));
  }

  function handleSubmit() {
    if (!election) return;
    const unanswered = election.questions.some(
      (q) => !selections[String(q.id)],
    );
    if (unanswered) {
      setShowErrors(true);
      toast.error("Please answer all questions before submitting.");
      return;
    }
    castVoteMutation.mutate();
  }

  const allAnswered =
    election?.questions.every((q) => !!selections[String(q.id)]) ?? false;

  // ── Loading ────────────────────────────────────────────────────────────────

  if (isLoading || checkingVote) {
    return (
      <ProtectedRoute>
        <AnimatedPage>
          <div
            className="container max-w-2xl py-12 space-y-6"
            data-ocid="vote.loading_state"
          >
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-5 w-2/3" />
            {[1, 2].map((i) => (
              <div key={i} className="glass-elevated rounded-xl p-6 space-y-4">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </AnimatedPage>
      </ProtectedRoute>
    );
  }

  // ── Election not found ─────────────────────────────────────────────────────

  if (!election) {
    return (
      <ProtectedRoute>
        <AnimatedPage>
          <div
            className="container max-w-xl py-16 flex flex-col items-center"
            data-ocid="vote.error_state"
          >
            <GlassCard elevated className="w-full p-8 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
              <h2 className="font-display text-2xl font-bold mb-2">
                Election not found
              </h2>
              <p className="text-muted-foreground mb-6">
                This election doesn't exist or has been removed.
              </p>
              <Link to="/elections">
                <Button
                  variant="outline"
                  className="gap-2"
                  data-ocid="vote.back_button"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Elections
                </Button>
              </Link>
            </GlassCard>
          </div>
        </AnimatedPage>
      </ProtectedRoute>
    );
  }

  // ── Already voted ──────────────────────────────────────────────────────────

  if (hasVoted) {
    return (
      <ProtectedRoute>
        <AnimatedPage>
          <div
            className="container max-w-xl py-16 flex flex-col items-center"
            data-ocid="vote.already_voted_state"
          >
            <GlassCard
              elevated
              gradient="primary"
              className="w-full p-8 text-center"
            >
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl glass surface-glow"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <Shield className="h-10 w-10 text-primary" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold mb-2">
                Already Voted
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                You've already cast your vote in{" "}
                <span className="font-semibold text-foreground">
                  {election.title}
                </span>
                . Your ballot has been anonymously recorded.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/elections">
                  <Button
                    variant="outline"
                    className="gap-2 border-border/50"
                    data-ocid="vote.elections_link"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Elections
                  </Button>
                </Link>
                <Link to="/results/$id" params={{ id: idStr }}>
                  <Button
                    className="btn-primary-glow gap-2"
                    data-ocid="vote.results_link"
                  >
                    View Results
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </AnimatedPage>
      </ProtectedRoute>
    );
  }

  // ── Ballot ─────────────────────────────────────────────────────────────────

  return (
    <ProtectedRoute>
      <AnimatedPage direction="up">
        <div className="container max-w-2xl py-12 px-4" data-ocid="vote.page">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/elections"
              className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="vote.back_link"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Elections
            </Link>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass border border-primary/30 mt-0.5">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
                  {election.title}
                </h1>
                <p className="mt-1.5 text-muted-foreground leading-relaxed">
                  {election.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {election.questions.length} question
                {election.questions.length !== 1 ? "s" : ""} · All fields
                required
              </span>
            </div>
          </motion.div>

          {/* Questions */}
          <StaggerContainer className="flex flex-col gap-5">
            {election.questions.map((question, qi) => (
              <QuestionCard
                key={String(question.id)}
                question={question}
                questionIndex={qi}
                selected={selections[String(question.id)] ?? null}
                onSelect={(opt) => handleSelect(question.id, opt)}
                hasError={showErrors && !selections[String(question.id)]}
              />
            ))}
          </StaggerContainer>

          {/* Submit footer */}
          <motion.div
            className="mt-8 sticky bottom-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <GlassCard elevated className="p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>End-to-end encrypted ballot</span>
                </div>
                <Button
                  className="btn-primary-glow gap-2 font-semibold min-w-[160px]"
                  disabled={castVoteMutation.isPending}
                  onClick={handleSubmit}
                  data-ocid="vote.submit_button"
                >
                  {castVoteMutation.isPending ? (
                    <>
                      <motion.div
                        className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      Sealing ballot…
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Submit Ballot
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {showErrors && !allAnswered && (
                  <motion.p
                    className="mt-3 text-xs text-destructive flex items-center gap-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="vote.validation_error"
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    Please answer all questions above before submitting.
                  </motion.p>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </AnimatedPage>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirmToken && (
          <VoteConfirmationModal
            token={confirmToken}
            electionId={idStr}
            onClose={() => setConfirmToken(null)}
          />
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
