import { h as useActor, i as useQuery, E as ElectionStatus, j as jsxRuntimeExports, m as motion, V as Vote, k as Skeleton, B as Badge, l as CalendarClock, n as Clock, L as Link, g as Button, C as CircleCheck, o as createActor } from "./index-DqjjyDVW.js";
import { A as AnimatedPage, G as GlassCard, S as StaggerContainer, a as StaggerItem, c as GlassCardHeader, b as GlassCardContent, d as GlassCardFooter } from "./GlassCard-DnRTm3DA.js";
import { Z as Zap } from "./zap-DhjGLKHi.js";
import { A as ArrowRight } from "./arrow-right-Bdi5t6nh.js";
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function getStatusConfig(status) {
  switch (status) {
    case ElectionStatus.active:
      return {
        label: "Live",
        dotClass: "bg-emerald-400 animate-pulse",
        badgeClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-widest",
        Icon: Vote
      };
    case ElectionStatus.scheduled:
      return {
        label: "Scheduled",
        dotClass: "bg-primary",
        badgeClass: "border-primary/30 bg-primary/10 text-primary font-mono text-[10px] uppercase tracking-widest",
        Icon: CalendarClock
      };
    case ElectionStatus.closed:
      return {
        label: "Closed",
        dotClass: "bg-muted-foreground",
        badgeClass: "border-border/50 bg-muted/20 text-muted-foreground font-mono text-[10px] uppercase tracking-widest",
        Icon: CircleCheck
      };
    default:
      return {
        label: "Unknown",
        dotClass: "bg-muted-foreground",
        badgeClass: "border-border/50 bg-muted/20 text-muted-foreground font-mono text-[10px] uppercase tracking-widest",
        Icon: Clock
      };
  }
}
function ElectionCard({
  election,
  index
}) {
  const isActive = election.status === ElectionStatus.active;
  const isClosed = election.status === ElectionStatus.closed;
  const { label, dotClass, badgeClass, Icon } = getStatusConfig(
    election.status
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: isActive || isClosed ? { scale: 1.016, y: -3 } : {},
      transition: { duration: 0.22, ease: "easeOut" },
      "data-ocid": `elections.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          elevated: true,
          hoverable: isActive || isClosed,
          gradient: isActive ? "primary" : "none",
          className: isActive ? "border-primary/30 shadow-[0_0_40px_-12px_oklch(var(--primary)/0.3)]" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground truncate leading-tight", children: election.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: `shrink-0 flex items-center gap-1.5 ${badgeClass}`,
                    "data-ocid": `elections.status.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-block h-1.5 w-1.5 rounded-full ${dotClass}`
                        }
                      ),
                      label
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-2 pl-12", children: election.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50", children: "Opens" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-3 w-3 text-primary/60" }),
                    formatDate(election.startTime)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50", children: "Closes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-accent/70" }),
                    formatDate(election.endTime)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/25 text-xs text-muted-foreground font-mono", children: [
                Number(election.questionCount),
                " question",
                Number(election.questionCount) !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardFooter, { className: "gap-2", children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/elections/$id/vote",
                  params: { id: String(election.id) },
                  className: "flex-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "btn-primary-glow w-full gap-2 font-semibold",
                      "data-ocid": `elections.vote_button.${index + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                        "Cast Your Vote",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-auto" })
                      ]
                    }
                  )
                }
              ),
              isClosed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/results/$id",
                  params: { id: String(election.id) },
                  className: "flex-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      className: "w-full gap-2 border-border/50",
                      "data-ocid": `elections.results_button.${index + 1}`,
                      children: [
                        "View Results",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-auto" })
                      ]
                    }
                  )
                }
              ),
              election.status === ElectionStatus.scheduled && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "w-full text-center text-xs text-muted-foreground font-mono py-1", children: [
                "Opens ",
                formatDate(election.startTime)
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-xl p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-lg shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full shrink-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full ml-12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
  ] });
}
function ElectionsPage() {
  const { actor, isFetching } = useActor(createActor);
  const {
    data: elections,
    isLoading,
    error
  } = useQuery({
    queryKey: ["elections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listElections();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
  const activeElections = (elections == null ? void 0 : elections.filter((e) => e.status === ElectionStatus.active)) ?? [];
  const otherElections = (elections == null ? void 0 : elections.filter((e) => e.status !== ElectionStatus.active)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { direction: "up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container py-12 max-w-5xl mx-auto px-4",
      "data-ocid": "elections.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mb-10",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest glass-subtle text-primary border border-primary/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse inline-block" }),
                "Secure Voting"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-display font-bold text-foreground mb-3 leading-tight", children: [
                "Elections ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Dashboard" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl leading-relaxed", children: "Participate in secure, anonymous elections powered by cryptographic integrity. Every vote is verifiable — your identity stays private." })
            ]
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          GlassCard,
          {
            elevated: true,
            className: "p-6 mb-8 border-destructive/30",
            "data-ocid": "elections.error_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: "Failed to load elections. Please try again." })
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-2",
            "data-ocid": "elections.loading_state",
            children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i))
          }
        ),
        !isLoading && activeElections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "elections.active.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex items-center gap-2 mb-4",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.15 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-mono uppercase tracking-widest text-emerald-400", children: "Live Now" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "grid gap-5 sm:grid-cols-2", children: activeElections.map((election, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ElectionCard,
            {
              election,
              index: idx
            },
            String(election.id)
          )) })
        ] }),
        !isLoading && otherElections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "elections.other.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex items-center gap-2 mb-4",
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.25 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground", children: "All Elections" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "grid gap-5 sm:grid-cols-2", children: otherElections.map((election, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ElectionCard,
            {
              election,
              index: activeElections.length + idx
            },
            String(election.id)
          )) })
        ] }),
        !isLoading && !error && (elections == null ? void 0 : elections.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col items-center py-24 text-center",
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.2 },
            "data-ocid": "elections.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl glass-elevated surface-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { className: "h-9 w-9 text-primary/60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "No elections yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "There are no elections available right now. Check back soon or ask an administrator to create one." })
            ]
          }
        )
      ]
    }
  ) });
}
export {
  ElectionsPage as default
};
