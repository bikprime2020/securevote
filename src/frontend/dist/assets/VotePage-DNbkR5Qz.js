import { c as createLucideIcon, p as useParams, h as useActor, q as useQueryClient, a as reactExports, j as jsxRuntimeExports, k as Skeleton, L as Link, g as Button, m as motion, S as Shield, s as ue, i as useQuery, B as Badge, C as CircleCheck, o as createActor } from "./index-DqjjyDVW.js";
import { u as useMutation } from "./useMutation-ES2wykDC.js";
import { A as AnimatedPage, G as GlassCard, S as StaggerContainer, e as AnimatePresence, a as StaggerItem, c as GlassCardHeader, b as GlassCardContent } from "./GlassCard-DnRTm3DA.js";
import { P as ProtectedRoute } from "./ProtectedRoute-CSbeIg4V.js";
import { A as ArrowLeft } from "./arrow-left-HZjgQKhi.js";
import { Z as Zap } from "./zap-DhjGLKHi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function useElection(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["election", String(id)],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getElection(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useHasVoted(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["hasVoted", String(id)],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasVoted(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function getQuestionOptions(question) {
  if (question.questionType.__kind__ === "multipleChoice") {
    return question.questionType.multipleChoice.options;
  }
  if (question.questionType.__kind__ === "yesNo") {
    return ["Yes", "No"];
  }
  return [];
}
function isYesNo(question) {
  return question.questionType.__kind__ === "yesNo";
}
function RadioOption({
  option,
  selected,
  onSelect,
  index,
  questionIndex,
  hasError
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: onSelect,
      whileHover: { scale: 1.012 },
      whileTap: { scale: 0.988 },
      className: [
        "w-full text-left rounded-xl border p-4 transition-smooth cursor-pointer",
        selected ? "border-primary/60 bg-primary/12 shadow-[0_0_20px_-8px_oklch(var(--primary)/0.4)]" : hasError ? "border-destructive/50 bg-destructive/5 hover:border-destructive/70" : "border-border/40 bg-card/50 hover:border-primary/30 hover:bg-card/80"
      ].join(" "),
      "data-ocid": `vote.option.${questionIndex + 1}.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: [
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-smooth",
              selected ? "border-primary bg-primary" : "border-border/60"
            ].join(" "),
            children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-primary-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: option })
      ] })
    }
  );
}
function YesNoOption({
  option,
  selected,
  onSelect,
  index,
  questionIndex,
  hasError
}) {
  const isYes = option === "Yes";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: onSelect,
      whileHover: { scale: 1.03 },
      whileTap: { scale: 0.97 },
      className: [
        "flex-1 py-4 rounded-xl border-2 font-display font-semibold text-lg transition-smooth cursor-pointer",
        selected ? isYes ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-400 shadow-[0_0_24px_-8px_#10b981]" : "border-destructive/70 bg-destructive/15 text-destructive shadow-[0_0_24px_-8px_oklch(var(--destructive)/0.5)]" : hasError ? "border-destructive/40 bg-destructive/5 text-foreground/70" : "border-border/40 bg-card/50 text-foreground/70 hover:border-border/70 hover:bg-card/80"
      ].join(" "),
      "data-ocid": `vote.yn_option.${questionIndex + 1}.${index + 1}`,
      children: option
    }
  );
}
function VoteConfirmationModal({
  token,
  electionId,
  onClose
}) {
  const [copied, setCopied] = reactExports.useState(false);
  async function copyToken() {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
    ue.success("Token copied to clipboard!");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "vote.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-background/70 backdrop-blur-md",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative z-10 w-full max-w-md",
            initial: { scale: 0.85, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.9, opacity: 0, y: 10 },
            transition: { type: "spring", stiffness: 260, damping: 22 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, gradient: "primary", className: "p-8 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl glass surface-glow",
                  initial: { scale: 0.3, rotate: -20 },
                  animate: { scale: 1, rotate: 0 },
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-10 w-10 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.25 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Vote Cast!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Your vote has been cryptographically sealed and anonymously recorded on the blockchain." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4",
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.35 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Anonymous Confirmation Token" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold text-primary break-all leading-relaxed", children: token })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  className: "mb-6 text-xs text-muted-foreground",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.45 },
                  children: "Save this token — it proves your vote was counted without revealing your identity."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex gap-3",
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        className: "flex-1 gap-2 border-border/50",
                        onClick: copyToken,
                        "data-ocid": "vote.copy_token_button",
                        children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400" }),
                          "Copied!"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                          "Copy Token"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/results/$id",
                        params: { id: electionId },
                        className: "flex-1",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            className: "btn-primary-glow w-full",
                            "data-ocid": "vote.view_results_button",
                            children: "View Results"
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/elections",
                  className: "mt-4 inline-block text-xs text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-4",
                  onClick: onClose,
                  "data-ocid": "vote.back_to_elections_link",
                  children: "Back to Elections"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function QuestionCard({
  question,
  questionIndex,
  selected,
  onSelect,
  hasError
}) {
  const options = getQuestionOptions(question);
  const isYN = isYesNo(question);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      elevated: true,
      className: hasError ? "border-destructive/40" : void 0,
      "data-ocid": `vote.question_card.${questionIndex + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-[10px] text-muted-foreground tracking-widest",
                children: [
                  "Q",
                  questionIndex + 1
                ]
              }
            ),
            isYN && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-[10px] tracking-widest border-primary/25 text-primary/70",
                children: "Yes / No"
              }
            ),
            !isYN && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-[10px] tracking-widest border-primary/25 text-primary/70",
                children: "Single Choice"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground leading-snug", children: question.text }),
          hasError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
            "Please select an option to continue"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCardContent, { children: isYN ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-3",
            "data-ocid": `vote.yn_group.${questionIndex + 1}`,
            children: options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              YesNoOption,
              {
                option: opt,
                selected: selected === opt,
                onSelect: () => onSelect(opt),
                index: oi,
                questionIndex,
                hasError
              },
              opt
            ))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col gap-3",
            "data-ocid": `vote.options_group.${questionIndex + 1}`,
            children: options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioOption,
              {
                option: opt,
                selected: selected === opt,
                onSelect: () => onSelect(opt),
                index: oi,
                questionIndex,
                hasError
              },
              opt
            ))
          }
        ) })
      ]
    }
  ) });
}
function VotePage() {
  const { id: idStr } = useParams({ from: "/elections/$id/vote" });
  const electionId = BigInt(idStr);
  const { data: election, isLoading } = useElection(electionId);
  const { data: hasVoted, isLoading: checkingVote } = useHasVoted(electionId);
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [selections, setSelections] = reactExports.useState({});
  const [showErrors, setShowErrors] = reactExports.useState(false);
  const [confirmToken, setConfirmToken] = reactExports.useState(null);
  const castVoteMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !election) throw new Error("Not ready");
      const answers = election.questions.map((q) => ({
        questionId: q.id,
        selectedOption: selections[String(q.id)] ?? ""
      }));
      return actor.castVote({ electionId, answers });
    },
    onSuccess: (result) => {
      setConfirmToken(result.confirmationToken);
      queryClient.invalidateQueries({ queryKey: ["hasVoted", idStr] });
      queryClient.invalidateQueries({ queryKey: ["elections"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Failed to cast vote. Please try again.";
      ue.error(msg);
    }
  });
  function handleSelect(questionId, option) {
    setSelections((prev) => ({ ...prev, [String(questionId)]: option }));
  }
  function handleSubmit() {
    if (!election) return;
    const unanswered = election.questions.some(
      (q) => !selections[String(q.id)]
    );
    if (unanswered) {
      setShowErrors(true);
      ue.error("Please answer all questions before submitting.");
      return;
    }
    castVoteMutation.mutate();
  }
  const allAnswered = (election == null ? void 0 : election.questions.every((q) => !!selections[String(q.id)])) ?? false;
  if (isLoading || checkingVote) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-2xl py-12 space-y-6",
        "data-ocid": "vote.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
          [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-xl p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" })
          ] }, i))
        ]
      }
    ) }) });
  }
  if (!election) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container max-w-xl py-16 flex flex-col items-center",
        "data-ocid": "vote.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "w-full p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto mb-4 h-12 w-12 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Election not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This election doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/elections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "gap-2",
              "data-ocid": "vote.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back to Elections"
              ]
            }
          ) })
        ] })
      }
    ) }) });
  }
  if (hasVoted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container max-w-xl py-16 flex flex-col items-center",
        "data-ocid": "vote.already_voted_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            elevated: true,
            gradient: "primary",
            className: "w-full p-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl glass surface-glow",
                  initial: { scale: 0.6, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 18 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-10 w-10 text-primary" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2", children: "Already Voted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8 leading-relaxed", children: [
                "You've already cast your vote in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: election.title }),
                ". Your ballot has been anonymously recorded."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/elections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "gap-2 border-border/50",
                    "data-ocid": "vote.elections_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                      "Elections"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/results/$id", params: { id: idStr }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "btn-primary-glow gap-2",
                    "data-ocid": "vote.results_link",
                    children: "View Results"
                  }
                ) })
              ] })
            ]
          }
        )
      }
    ) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ProtectedRoute, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl py-12 px-4", "data-ocid": "vote.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "mb-8",
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/elections",
                className: "mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
                "data-ocid": "vote.back_link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                  "Back to Elections"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass border border-primary/30 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground leading-tight", children: election.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-muted-foreground leading-relaxed", children: election.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                election.questions.length,
                " question",
                election.questions.length !== 1 ? "s" : "",
                " · All fields required"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "flex flex-col gap-5", children: election.questions.map((question, qi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuestionCard,
        {
          question,
          questionIndex: qi,
          selected: selections[String(question.id)] ?? null,
          onSelect: (opt) => handleSelect(question.id, opt),
          hasError: showErrors && !selections[String(question.id)]
        },
        String(question.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "mt-8 sticky bottom-4",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: 0.4,
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "End-to-end encrypted ballot" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "btn-primary-glow gap-2 font-semibold min-w-[160px]",
                  disabled: castVoteMutation.isPending,
                  onClick: handleSubmit,
                  "data-ocid": "vote.submit_button",
                  children: castVoteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground",
                        animate: { rotate: 360 },
                        transition: {
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear"
                        }
                      }
                    ),
                    "Sealing ballot…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                    "Submit Ballot"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showErrors && !allAnswered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                className: "mt-3 text-xs text-destructive flex items-center gap-1",
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                "data-ocid": "vote.validation_error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3 shrink-0" }),
                  "Please answer all questions above before submitting."
                ]
              }
            ) })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: confirmToken && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoteConfirmationModal,
      {
        token: confirmToken,
        electionId: idStr,
        onClose: () => setConfirmToken(null)
      }
    ) })
  ] });
}
export {
  VotePage as default
};
