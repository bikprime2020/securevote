import { G as frame, H as isMotionValue, J as JSAnimation, a as reactExports, M as MotionConfigContext, I as useTransform, K as useMotionValue, c as createLucideIcon, p as useParams, e as useRole, j as jsxRuntimeExports, m as motion, L as Link, d as ChartColumn, g as Button, h as useActor, i as useQuery, k as Skeleton, O as MarqueeStatusBar, n as Clock, B as Badge, R as Radio, S as Shield, o as createActor } from "./index-DqjjyDVW.js";
import { A as AnimatedPage, e as AnimatePresence, G as GlassCard, S as StaggerContainer, a as StaggerItem, c as GlassCardHeader, b as GlassCardContent } from "./GlassCard-DnRTm3DA.js";
import { A as ArrowLeft } from "./arrow-left-HZjgQKhi.js";
import { U as Users } from "./users-DvIo2p9t.js";
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
    value.animation = void 0;
  };
  const startAnimation = () => {
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      stopAnimation();
      return;
    }
    const velocity = activeAnimation ? activeAnimation.getGeneratorVelocity() : value.getVelocity();
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  const scheduleAnimation = () => {
    var _a;
    startAnimation();
    value.animation = activeAnimation ?? void 0;
    (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
    activeAnimation == null ? void 0 : activeAnimation.then(() => {
      var _a2;
      value.animation = void 0;
      (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(scheduleAnimation);
  }, stopAnimation);
  if (isMotionValue(source)) {
    let skipNextAnimation = options.skipInitialAnimation === true;
    const removeSourceOnChange = source.on("change", (v) => {
      if (skipNextAnimation) {
        skipNextAnimation = false;
        value.jump(parseValue(v, unit), false);
      } else {
        value.set(parseValue(v, unit));
      }
    });
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function useElectionResults(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["results", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getElectionResults(id);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useLiveTurnout(id, enabled) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["turnout", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTurnout(id);
    },
    enabled: !!actor && !isFetching && enabled,
    refetchInterval: 5e3,
    staleTime: 4e3
  });
}
function useElectionStatus(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["election-status", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const all = await actor.listElections();
      const found = all.find((e) => e.id === id);
      if (!found) return null;
      return {
        status: found.status,
        endTime: found.endTime,
        title: found.title
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 15e3
  });
}
function AnimatedCounter({
  target,
  decimals = 1,
  suffix = "%"
}) {
  const [display, setDisplay] = reactExports.useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  reactExports.useEffect(() => {
    spring.set(target);
  }, [target, spring]);
  reactExports.useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(v));
    return unsub;
  }, [spring]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    display.toFixed(decimals),
    suffix
  ] });
}
function useCountdown(endTimeNs) {
  const [remaining, setRemaining] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const endMs = Number(endTimeNs) / 1e6;
    const update = () => {
      const diff = Math.max(0, endMs - Date.now());
      setRemaining(diff);
    };
    update();
    const id = setInterval(update, 1e3);
    return () => clearInterval(id);
  }, [endTimeNs]);
  const hours = Math.floor(remaining / 36e5);
  const minutes = Math.floor(remaining % 36e5 / 6e4);
  const seconds = Math.floor(remaining % 6e4 / 1e3);
  return { hours, minutes, seconds, done: remaining === 0 };
}
function CountdownUnit({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-elevated rounded-xl px-4 py-3 min-w-[3.5rem] text-center",
        style: { boxShadow: "0 0 20px oklch(0.7 0.18 250 / 0.1)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-foreground tabular-nums", children: String(value).padStart(2, "0") })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label })
  ] });
}
const pendingMessages = [
  {
    id: "p1",
    text: "Results Pending — Votes are still being cast",
    type: "pending"
  },
  {
    id: "p2",
    text: "Election Active — Cryptographic verification in progress",
    type: "live"
  },
  {
    id: "p3",
    text: "Stay tuned — Results will be published when voting closes",
    type: "pending"
  },
  {
    id: "p4",
    text: "Zero-Knowledge Proofs — Your anonymity is guaranteed",
    type: "live"
  }
];
function ResultsPendingView({
  title,
  endTimeNs,
  isAdmin,
  turnout
}) {
  const { hours, minutes, seconds } = useCountdown(endTimeNs);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", "data-ocid": "results.pending_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStatusBar, { messages: pendingMessages }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, gradient: "primary", className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: { scale: [1, 1.04, 1] },
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: "easeInOut"
          },
          className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl glass border border-primary/30",
          style: { boxShadow: "0 0 40px oklch(0.7 0.18 250 / 0.2)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "mb-4 border-primary/40 bg-primary/10 font-mono text-[10px] text-primary uppercase tracking-widest",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative mr-1.5 flex h-1.5 w-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" })
            ] }),
            "Election In Progress"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 font-display text-2xl font-bold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-sm text-muted-foreground", children: "Results will be published automatically once the election closes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: hours, label: "hours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-3 font-display text-2xl font-bold text-muted-foreground", children: ":" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: minutes, label: "min" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-3 font-display text-2xl font-bold text-muted-foreground", children: ":" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: seconds, label: "sec" })
      ] })
    ] }),
    isAdmin && turnout && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            elevated: true,
            gradient: "accent",
            className: "p-6",
            "data-ocid": "results.live_turnout_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Admin Live View" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: "Live Turnout" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-accent/40 bg-accent/10 font-mono text-[10px] text-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1 h-2.5 w-2.5 animate-spin" }),
                      "5s refresh"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: turnout.turnoutPercent }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Turnout" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: turnout.totalVotesCast.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Votes Cast" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: turnout.turnoutPercent }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Participation" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-muted/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { width: 0 },
                  animate: { width: `${Math.min(100, turnout.turnoutPercent)}%` },
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                  style: {
                    background: "linear-gradient(to right, oklch(0.7 0.18 180), oklch(0.65 0.18 40))"
                  },
                  className: "h-full rounded-full"
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
function ResultBar({
  label,
  votes,
  total,
  isWinner,
  index
}) {
  const percentage = total > BigInt(0) ? Number(votes) / Number(total) * 100 : 0;
  const barStyle = isWinner ? {
    background: "linear-gradient(to right, oklch(0.7 0.18 180), oklch(0.65 0.18 40))"
  } : {
    background: "linear-gradient(to right, oklch(0.7 0.18 180 / 0.5), oklch(0.65 0.18 250 / 0.3))"
  };
  const winnerGlow = isWinner ? {
    boxShadow: "0 0 16px oklch(0.65 0.18 40 / 0.5), 0 0 6px oklch(0.65 0.18 40 / 0.3)"
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col gap-2",
      "data-ocid": `results.option_bar.${index + 1}`,
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            isWinner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                animate: { rotate: [0, -5, 5, -5, 0] },
                transition: { delay: 1 + index * 0.1, duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 shrink-0 text-accent" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `truncate font-medium ${isWinner ? "text-foreground" : "text-muted-foreground"}`,
                children: label
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-3 ml-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              votes.toString(),
              " votes"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-display text-base font-bold tabular-nums ${isWinner ? "text-accent" : "text-muted-foreground"}`,
                children: [
                  percentage.toFixed(1),
                  "%"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-3 w-full overflow-hidden rounded-full bg-muted/40",
            style: isWinner ? { boxShadow: "inset 0 0 0 1px oklch(0.65 0.18 40 / 0.25)" } : {},
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-y-0 left-0 rounded-full",
                  initial: { width: 0 },
                  animate: { width: `${percentage}%` },
                  transition: {
                    duration: 1.1,
                    delay: 0.3 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  style: { ...barStyle, ...winnerGlow }
                }
              ),
              isWinner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute inset-y-0 w-12 rounded-full opacity-40",
                  style: {
                    background: "linear-gradient(to right, transparent, oklch(1 0 0 / 0.6), transparent)"
                  },
                  animate: { x: ["-3rem", "100vw"] },
                  transition: {
                    duration: 2,
                    delay: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 4
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function QuestionResultCard({
  question,
  index
}) {
  const totalVotes = question.optionCounts.reduce(
    (sum, [, count]) => sum + count,
    BigInt(0)
  );
  const maxVotes = question.optionCounts.reduce(
    (max, [, count]) => count > max ? count : max,
    BigInt(0)
  );
  const sorted = [...question.optionCounts].sort(
    ([, a], [, b]) => b > a ? 1 : b < a ? -1 : 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: 0.2 + index * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          elevated: true,
          "data-ocid": `results.question_card.${index + 1}`,
          className: "overflow-visible",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "font-mono text-[10px] text-muted-foreground border-border/50",
                      children: [
                        "Q",
                        index + 1
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                    totalVotes.toString(),
                    " total votes"
                  ] })
                ] }),
                maxVotes > BigInt(0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-accent/40 bg-accent/10 font-mono text-[10px] text-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-1 h-2.5 w-2.5" }),
                      "Winner declared"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground leading-snug", children: question.questionText })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-5", children: sorted.map(([optionText, voteCount], oi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResultBar,
              {
                label: optionText,
                votes: voteCount,
                total: totalVotes,
                isWinner: voteCount === maxVotes && maxVotes > BigInt(0),
                index: oi
              },
              `${question.questionId.toString()}-${oi}`
            )) }) })
          ]
        }
      )
    }
  );
}
function TurnoutHeroCard({ results }) {
  const pct = results.turnoutPercent;
  const circumference = 2 * Math.PI * 52;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassCard,
        {
          elevated: true,
          gradient: "primary",
          className: "p-6",
          "data-ocid": "results.turnout_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "120",
                  height: "120",
                  className: "-rotate-90",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        cx: "60",
                        cy: "60",
                        r: "52",
                        fill: "none",
                        strokeWidth: "6",
                        className: "stroke-muted/40"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.circle,
                      {
                        cx: "60",
                        cy: "60",
                        r: "52",
                        fill: "none",
                        strokeWidth: "6",
                        strokeLinecap: "round",
                        style: {
                          stroke: "url(#turnoutGrad)",
                          strokeDasharray: circumference
                        },
                        initial: { strokeDashoffset: circumference },
                        animate: {
                          strokeDashoffset: circumference - circumference * pct / 100
                        },
                        transition: {
                          duration: 1.5,
                          delay: 0.2,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "linearGradient",
                      {
                        id: "turnoutGrad",
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "0%",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.7 0.18 180)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.65 0.18 250)" })
                        ]
                      }
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-foreground tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: pct }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Final Voter Turnout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { target: pct, decimals: 1 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: "Voted" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground", children: results.totalVoters.toString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: "Eligible" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground", children: results.eligibleVoterCount.toString() })
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  );
}
function ClosedResultsView({ results }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StaggerContainer, { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl glass border border-primary/30",
          initial: { scale: 0, rotate: -20 },
          animate: { scale: 1, rotate: 0 },
          transition: { type: "spring", stiffness: 200, damping: 15 },
          style: { boxShadow: "0 0 32px oklch(0.7 0.18 250 / 0.15)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-6 w-6 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground md:text-3xl leading-tight", children: results.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "shrink-0 border-primary/40 bg-primary/10 font-mono text-[10px] text-primary uppercase tracking-widest",
              children: "Results Final"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: "Election closed · Cryptographically verified" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TurnoutHeroCard, { results }) }),
    results.questionResults.map((question, qi) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionResultCard, { question, index: qi }) }, question.questionId.toString())),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "All votes have been cryptographically verified using zero-knowledge proofs. Every ballot is counted exactly as cast, with full anonymity preserved." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/elections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        className: "border-border/60 hover:border-primary/50 transition-smooth",
        "data-ocid": "results.view_elections_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "All Elections"
        ]
      }
    ) }) }) })
  ] });
}
function ResultsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "results.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mb-2 h-7 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-1/3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-xl" }),
    [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mb-4 h-5 w-1/2" }),
      [0, 1, 2].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded-full" })
      ] }, j))
    ] }, i))
  ] });
}
function ResultsPage() {
  const { id } = useParams({ from: "/results/$id" });
  const electionId = BigInt(id);
  const { isAdmin } = useRole();
  const {
    data: results,
    isLoading: resultsLoading,
    error: resultsError
  } = useElectionResults(electionId);
  const { data: statusData, isLoading: statusLoading } = useElectionStatus(electionId);
  const isActive = (statusData == null ? void 0 : statusData.status) === "active";
  const { data: liveTurnout } = useLiveTurnout(electionId, isAdmin && isActive);
  const isLoading = resultsLoading || statusLoading;
  const isClosed = !!results;
  const isPending = !isClosed && (isActive || (statusData == null ? void 0 : statusData.status) === "scheduled");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl py-10 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 },
        className: "mb-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/elections",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
            "data-ocid": "results.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
              "Back to Elections"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { exit: { opacity: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsSkeleton, {}) }, "loading") : resultsError && !results && !isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            elevated: true,
            className: "p-10 text-center",
            "data-ocid": "results.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-7 w-7 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Results unavailable" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-sm mx-auto", children: "This election may not exist, or results haven't been published yet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/elections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "mt-6 border-border/60",
                  "data-ocid": "results.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                    "Back to Elections"
                  ]
                }
              ) })
            ]
          }
        )
      },
      "error"
    ) : isPending && statusData ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultsPendingView,
          {
            title: statusData.title,
            endTimeNs: statusData.endTime,
            isAdmin,
            turnout: liveTurnout
          }
        )
      },
      "pending"
    ) : results ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClosedResultsView, { results })
      },
      "results"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            elevated: true,
            className: "p-10 text-center",
            "data-ocid": "results.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl glass border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-7 w-7 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Election not found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "We couldn't locate this election. It may have been removed." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/elections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "mt-6 border-border/60",
                  "data-ocid": "results.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                    "All Elections"
                  ]
                }
              ) })
            ]
          }
        )
      },
      "not-found"
    ) })
  ] }) });
}
export {
  ResultsPage as default
};
