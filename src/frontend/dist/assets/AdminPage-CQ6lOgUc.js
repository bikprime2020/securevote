import { c as createLucideIcon, j as jsxRuntimeExports, h as useActor, a as reactExports, i as useQuery, m as motion, L as Link, g as Button, V as Vote, k as Skeleton, n as Clock, d as ChartColumn, B as Badge, o as createActor } from "./index-DqjjyDVW.js";
import { A as AnimatedPage, S as StaggerContainer, a as StaggerItem, f as StatCard, G as GlassCard, c as GlassCardHeader, b as GlassCardContent } from "./GlassCard-DnRTm3DA.js";
import { P as ProtectedRoute } from "./ProtectedRoute-CSbeIg4V.js";
import { P as Plus } from "./plus-CVAwGBub.js";
import { U as Users } from "./users-DvIo2p9t.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var ElectionStatus = /* @__PURE__ */ ((ElectionStatus2) => {
  ElectionStatus2["scheduled"] = "scheduled";
  ElectionStatus2["closed"] = "closed";
  ElectionStatus2["active"] = "active";
  return ElectionStatus2;
})(ElectionStatus || {});
function formatElectionDate(timestamp) {
  const ms = Number(timestamp) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function StatusBadge({ status }) {
  const config = {
    [ElectionStatus.active]: {
      label: "● LIVE",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 animate-pulse"
    },
    [ElectionStatus.scheduled]: {
      label: "Upcoming",
      className: "bg-primary/15 text-primary border-primary/30"
    },
    [ElectionStatus.closed]: {
      label: "Closed",
      className: "bg-muted/60 text-muted-foreground border-border/40"
    }
  };
  const cfg = config[status] ?? config[ElectionStatus.closed];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-xs font-mono px-2 py-0.5 ${cfg.className}`,
      children: cfg.label
    }
  );
}
function LiveTurnoutCell({ electionId }) {
  const { actor, isFetching } = useActor(createActor);
  const { data: turnout } = useQuery({
    queryKey: ["turnout", electionId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getTurnout(electionId);
      return result ?? null;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5e3
  });
  if (!turnout) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-mono", children: "—" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono font-semibold text-foreground", children: Number(turnout.totalVotesCast).toLocaleString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-emerald-400 font-mono", children: [
      turnout.turnoutPercent.toFixed(1),
      "%"
    ] })
  ] });
}
function ElectionRow({
  election,
  index
}) {
  const isActive = election.status === ElectionStatus.active;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "group grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 rounded-xl glass-subtle border border-border/20 hover:border-primary/30 transition-smooth",
      whileHover: { scale: 1.005, x: 2 },
      "data-ocid": `admin.election.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate text-sm", children: election.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: election.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: election.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col gap-0.5 text-xs text-muted-foreground font-mono flex-shrink-0 w-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
            formatElectionDate(election.startTime)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
            formatElectionDate(election.endTime)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block flex-shrink-0 w-20", children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(LiveTurnoutCell, { electionId: election.id }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-muted-foreground", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/results/$id",
            params: { id: election.id.toString() },
            "data-ocid": `admin.election.results_link.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 px-3 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 12, className: "mr-1" }),
                  "Results"
                ]
              }
            )
          }
        ) })
      ]
    }
  ) });
}
function ElectionRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 rounded-xl glass-subtle border border-border/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden md:block h-8 w-36" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "hidden sm:block h-6 w-16" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded-md" })
  ] });
}
function AdminDashboard() {
  const { actor, isFetching } = useActor(createActor);
  const [tick, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1e4);
    return () => clearInterval(id);
  }, []);
  const { data: elections, isPending } = useQuery({
    queryKey: ["listElections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listElections();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
  const active = (elections == null ? void 0 : elections.filter((e) => e.status === ElectionStatus.active)) ?? [];
  const upcoming = (elections == null ? void 0 : elections.filter((e) => e.status === ElectionStatus.scheduled)) ?? [];
  const closed = (elections == null ? void 0 : elections.filter((e) => e.status === ElectionStatus.closed)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedPage, { direction: "up", className: "container py-10 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StaggerContainer, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4 },
              className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-primary/20 text-primary text-xs font-mono mb-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                "Admin Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Elections Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage, monitor, and analyze all elections on SecureVote." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/admin/elections/new",
            "data-ocid": "admin.create_election_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-accent-glow font-display gap-2 border border-accent/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
              "New Election"
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Total Elections",
            value: isPending ? "—" : (elections == null ? void 0 : elections.length) ?? 0,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { size: 18 }),
            "data-ocid": "admin.stat.total_elections"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Live Now",
            value: isPending ? "—" : active.length,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18 }),
            trend: "Polling every 5s",
            "data-ocid": "admin.stat.active_elections"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Upcoming",
            value: isPending ? "—" : upcoming.length,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
            "data-ocid": "admin.stat.upcoming_elections"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Closed",
            value: isPending ? "—" : closed.length,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18 }),
            "data-ocid": "admin.stat.closed_elections"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { staggerDelay: 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        elevated: true,
        gradient: "primary",
        "data-ocid": "admin.elections.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { size: 18, className: "text-primary" }),
                "All Elections"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: isPending ? "Loading…" : `${(elections == null ? void 0 : elections.length) ?? 0} total` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-2 mt-2 rounded-lg bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Election" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block text-xs font-mono text-muted-foreground uppercase tracking-wider w-36", children: "Dates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block text-xs font-mono text-muted-foreground uppercase tracking-wider w-20", children: "Votes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: "Actions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCardContent, { className: "pt-0", children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-col gap-2",
              "data-ocid": "admin.elections.loading_state",
              children: Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                /* @__PURE__ */ jsxRuntimeExports.jsx(ElectionRowSkeleton, {}, i)
              ))
            }
          ) : !elections || elections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 gap-3",
              "data-ocid": "admin.elections.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl glass flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Vote, { size: 28 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-display font-semibold", children: "No elections yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "Create your first election to get started with SecureVote." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin/elections/new",
                    "data-ocid": "admin.elections_empty.create_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "btn-accent-glow mt-1 gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                      "Create Election"
                    ] })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerContainer, { className: "flex flex-col gap-2", children: elections.map((election, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ElectionRow,
            {
              election,
              index
            },
            election.id.toString()
          )) }) })
        ]
      }
    ) }) })
  ] });
}
function AdminPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requiredRole: "Admin", redirectTo: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {}) });
}
export {
  AdminPage as default
};
