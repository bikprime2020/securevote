import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  CirclePlus,
  GripVertical,
  Minus,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { CreateElectionArgs } from "../backend.d";
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
import { ProtectedRoute } from "../components/ProtectedRoute";

// ─── Local draft types ────────────────────────────────────────────────────────

type QuestionKind = "multipleChoice" | "yesNo";

interface OptionDraft {
  id: string;
  val: string;
}

interface QuestionDraft {
  id: string;
  text: string;
  kind: QuestionKind;
  options: OptionDraft[];
}

let _optCounter = 0;
function makeOpt(val = ""): OptionDraft {
  _optCounter += 1;
  return { id: `opt-${_optCounter}`, val };
}

function makeQuestion(id: string): QuestionDraft {
  return {
    id,
    text: "",
    kind: "multipleChoice",
    options: [makeOpt(), makeOpt()],
  };
}

// ─── Inline field error ───────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-xs text-destructive mt-1"
      role="alert"
    >
      {msg}
    </motion.p>
  );
}

// ─── Question type pill ───────────────────────────────────────────────────────

function QuestionTypePill({
  kind,
  onChange,
}: {
  kind: QuestionKind;
  onChange: (k: QuestionKind) => void;
}) {
  const types: { value: QuestionKind; label: string }[] = [
    { value: "multipleChoice", label: "Multiple Choice" },
    { value: "yesNo", label: "Yes / No" },
  ];
  return (
    <div className="flex rounded-lg overflow-hidden border border-border/40 divide-x divide-border/40">
      {types.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 text-xs font-mono transition-smooth ${
            kind === value
              ? "bg-primary/20 text-primary font-semibold"
              : "bg-transparent text-muted-foreground hover:bg-muted/30"
          }`}
          data-ocid={`new_election.question_type_${value}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Single question card ─────────────────────────────────────────────────────

function QuestionEditor({
  question,
  index,
  onChange,
  onRemove,
  canRemove,
  errors,
}: {
  question: QuestionDraft;
  index: number;
  onChange: (updated: QuestionDraft) => void;
  onRemove: () => void;
  canRemove: boolean;
  errors: Record<string, string>;
}) {
  const uid = useId();

  function setKind(kind: QuestionKind) {
    onChange({
      ...question,
      kind,
      options: kind === "yesNo" ? [] : [makeOpt(), makeOpt()],
    });
  }

  function setOption(id: string, val: string) {
    onChange({
      ...question,
      options: question.options.map((o) => (o.id === id ? { ...o, val } : o)),
    });
  }

  function addOption() {
    onChange({ ...question, options: [...question.options, makeOpt()] });
  }

  function removeOption(id: string) {
    onChange({
      ...question,
      options: question.options.filter((o) => o.id !== id),
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-subtle rounded-xl border border-border/25 p-5 space-y-4"
      data-ocid={`new_election.question.item.${index + 1}`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-muted-foreground">
          <GripVertical size={14} />
          <Badge
            variant="outline"
            className="text-xs font-mono border-primary/30 text-primary bg-primary/10 px-2"
          >
            Q{index + 1}
          </Badge>
        </div>

        <QuestionTypePill kind={question.kind} onChange={setKind} />

        <div className="flex-1" />

        {canRemove && (
          <motion.button
            type="button"
            onClick={onRemove}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-smooth"
            aria-label="Remove question"
            data-ocid={`new_election.question.delete_button.${index + 1}`}
          >
            <Trash2 size={14} />
          </motion.button>
        )}
      </div>

      {/* Question text */}
      <div>
        <Label
          htmlFor={`${uid}-text`}
          className="text-xs font-mono text-muted-foreground mb-1.5 block"
        >
          Question Text
        </Label>
        <Input
          id={`${uid}-text`}
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          placeholder="e.g. Who should lead the committee?"
          className="glass-subtle border-border/30 focus:border-primary/50"
          data-ocid={`new_election.question.input.${index + 1}`}
        />
        <AnimatePresence>
          <FieldError msg={errors[`q${index}_text`]} />
        </AnimatePresence>
      </div>

      {/* Options for multiple choice */}
      {question.kind === "multipleChoice" && (
        <div className="space-y-2">
          <Label className="text-xs font-mono text-muted-foreground">
            Answer Options
          </Label>

          <AnimatePresence mode="popLayout">
            {question.options.map((opt, i) => (
              <motion.div
                key={opt.id}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs font-mono text-muted-foreground/60 w-5 text-right shrink-0">
                  {String.fromCharCode(65 + i)}.
                </span>
                <Input
                  value={opt.val}
                  onChange={(e) => setOption(opt.id, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="glass-subtle border-border/30 focus:border-primary/50 flex-1 h-8 text-sm"
                  data-ocid={`new_election.question.option.${index + 1}.${i + 1}`}
                />
                {question.options.length > 2 && (
                  <motion.button
                    type="button"
                    onClick={() => removeOption(opt.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shrink-0"
                    aria-label="Remove option"
                    data-ocid={`new_election.question.remove_option.${index + 1}.${i + 1}`}
                  >
                    <Minus size={12} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            <FieldError msg={errors[`q${index}_options`]} />
          </AnimatePresence>

          {question.options.length < 8 && (
            <motion.button
              type="button"
              onClick={addOption}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary font-mono mt-1 transition-smooth"
              data-ocid={`new_election.question.add_option.${index + 1}`}
            >
              <Plus size={12} />
              Add option
            </motion.button>
          )}
        </div>
      )}

      {/* Yes/No preview */}
      {question.kind === "yesNo" && (
        <div className="flex gap-2 mt-1">
          {["Yes", "No"].map((label) => (
            <div
              key={label}
              className="flex-1 text-center rounded-lg border border-border/30 py-2 text-xs font-mono text-muted-foreground bg-muted/20"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(
  title: string,
  description: string,
  startDT: string,
  endDT: string,
  questions: QuestionDraft[],
): Record<string, string> {
  const e: Record<string, string> = {};
  if (!title.trim()) e.title = "Title is required.";
  if (!description.trim()) e.description = "Description is required.";
  if (!startDT) e.startDT = "Start date/time is required.";
  if (!endDT) e.endDT = "End date/time is required.";
  if (startDT && endDT && new Date(endDT) <= new Date(startDT)) {
    e.endDT = "End time must be after start time.";
  }
  if (questions.length === 0)
    e.questions = "At least one question is required.";
  questions.forEach((q, i) => {
    if (!q.text.trim()) e[`q${i}_text`] = "Question text is required.";
    if (q.kind === "multipleChoice") {
      const filled = q.options.filter((o) => o.val.trim());
      if (filled.length < 2)
        e[`q${i}_options`] = "At least 2 options required.";
    }
  });
  return e;
}

// ─── Main form component ──────────────────────────────────────────────────────

function NewElectionForm() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDT, setStartDT] = useState("");
  const [endDT, setEndDT] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([
    makeQuestion("q-0"),
  ]);
  const [counter, setCounter] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function addQuestion() {
    setQuestions((qs) => [...qs, makeQuestion(`q-${counter}`)]);
    setCounter((c) => c + 1);
  }

  function updateQuestion(i: number, updated: QuestionDraft) {
    setQuestions((qs) => qs.map((q, idx) => (idx === i ? updated : q)));
  }

  function removeQuestion(i: number) {
    setQuestions((qs) => qs.filter((_, idx) => idx !== i));
  }

  const mutation = useMutation({
    mutationFn: async (args: CreateElectionArgs) => {
      if (!actor) throw new Error("Not connected");
      return actor.createElection(args);
    },
    onSuccess: () => {
      toast.success("Election created!", {
        description: "Your election is ready and accepting submissions.",
      });
      navigate({ to: "/admin" });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to create election.";
      toast.error("Creation failed", { description: msg });
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(title, description, startDT, endDT, questions);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const args: CreateElectionArgs = {
      title: title.trim(),
      description: description.trim(),
      startTime: BigInt(new Date(startDT).getTime()) * 1_000_000n,
      endTime: BigInt(new Date(endDT).getTime()) * 1_000_000n,
      questions: questions.map((q) => ({
        text: q.text.trim(),
        questionType:
          q.kind === "yesNo"
            ? { __kind__: "yesNo" as const, yesNo: null }
            : {
                __kind__: "multipleChoice" as const,
                multipleChoice: {
                  options: q.options
                    .filter((o) => o.val.trim())
                    .map((o) => o.val),
                },
              },
      })),
    };

    mutation.mutate(args);
  }

  return (
    <AnimatedPage direction="up" className="container py-10 max-w-3xl">
      <StaggerContainer staggerDelay={0.07}>
        {/* Back + header */}
        <StaggerItem>
          <div className="mb-8">
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              whileHover={{ x: -2 }}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-mono mb-4 transition-smooth"
              data-ocid="new_election.back_button"
            >
              <ChevronLeft size={14} />
              Back to Dashboard
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-accent/20 text-accent text-xs font-mono mb-3"
            >
              <Sparkles size={10} />
              New Election
            </motion.div>

            <h1 className="text-3xl font-display font-bold text-foreground">
              Create Election
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Fill in the details below to set up a new election on SecureVote.
            </p>
          </div>
        </StaggerItem>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Basic info */}
          <StaggerItem>
            <GlassCard
              elevated
              gradient="primary"
              data-ocid="new_election.basic_info.panel"
            >
              <GlassCardHeader>
                <h2 className="text-sm font-display font-semibold text-foreground">
                  Basic Information
                </h2>
              </GlassCardHeader>
              <GlassCardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor="ne-title"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Election Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ne-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 2026 Board Director Election"
                    className="glass-subtle border-border/30 focus:border-primary/50"
                    data-ocid="new_election.title.input"
                  />
                  <AnimatePresence>
                    <FieldError msg={errors.title} />
                  </AnimatePresence>
                </div>

                <div>
                  <Label
                    htmlFor="ne-desc"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="ne-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide voters with context about this election…"
                    rows={3}
                    className="glass-subtle border-border/30 focus:border-primary/50 resize-none"
                    data-ocid="new_election.description.textarea"
                  />
                  <AnimatePresence>
                    <FieldError msg={errors.description} />
                  </AnimatePresence>
                </div>
              </GlassCardContent>
            </GlassCard>
          </StaggerItem>

          {/* Scheduling */}
          <StaggerItem>
            <GlassCard elevated data-ocid="new_election.scheduling.panel">
              <GlassCardHeader>
                <h2 className="text-sm font-display font-semibold text-foreground">
                  Scheduling
                </h2>
              </GlassCardHeader>
              <GlassCardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="ne-start"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    Start Date &amp; Time{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ne-start"
                    type="datetime-local"
                    value={startDT}
                    onChange={(e) => setStartDT(e.target.value)}
                    className="glass-subtle border-border/30 focus:border-primary/50"
                    data-ocid="new_election.start_datetime.input"
                  />
                  <AnimatePresence>
                    <FieldError msg={errors.startDT} />
                  </AnimatePresence>
                </div>

                <div>
                  <Label
                    htmlFor="ne-end"
                    className="text-xs font-mono text-muted-foreground mb-1.5 block"
                  >
                    End Date &amp; Time{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ne-end"
                    type="datetime-local"
                    value={endDT}
                    onChange={(e) => setEndDT(e.target.value)}
                    className="glass-subtle border-border/30 focus:border-primary/50"
                    data-ocid="new_election.end_datetime.input"
                  />
                  <AnimatePresence>
                    <FieldError msg={errors.endDT} />
                  </AnimatePresence>
                </div>
              </GlassCardContent>
            </GlassCard>
          </StaggerItem>

          {/* Questions */}
          <StaggerItem>
            <GlassCard elevated data-ocid="new_election.questions.panel">
              <GlassCardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-display font-semibold text-foreground">
                    Questions
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-xs font-mono border-primary/30 text-primary"
                  >
                    {questions.length} question
                    {questions.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <AnimatePresence>
                  <FieldError msg={errors.questions} />
                </AnimatePresence>
              </GlassCardHeader>
              <GlassCardContent className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {questions.map((q, i) => (
                    <QuestionEditor
                      key={q.id}
                      question={q}
                      index={i}
                      onChange={(updated) => updateQuestion(i, updated)}
                      onRemove={() => removeQuestion(i)}
                      canRemove={questions.length > 1}
                      errors={errors}
                    />
                  ))}
                </AnimatePresence>

                <Separator className="opacity-30" />

                <motion.button
                  type="button"
                  onClick={addQuestion}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-primary/30 text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 text-sm font-mono transition-smooth"
                  data-ocid="new_election.add_question_button"
                >
                  <CirclePlus size={16} />
                  Add Question
                </motion.button>
              </GlassCardContent>
            </GlassCard>
          </StaggerItem>

          {/* Submit row */}
          <StaggerItem>
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/admin" })}
                className="text-sm text-muted-foreground hover:text-foreground font-mono transition-smooth"
                data-ocid="new_election.cancel_button"
              >
                Cancel
              </button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-accent-glow font-display px-8 gap-2 border border-accent/40"
                  data-ocid="new_election.submit_button"
                >
                  {mutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                      />
                      Creating…
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Create Election
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </StaggerItem>
        </form>
      </StaggerContainer>
    </AnimatedPage>
  );
}

export default function NewElectionPage() {
  return (
    <ProtectedRoute requiredRole="Admin" redirectTo="/">
      <NewElectionForm />
    </ProtectedRoute>
  );
}
