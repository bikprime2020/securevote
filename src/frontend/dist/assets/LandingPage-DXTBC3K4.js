import { r as resolveElements, a as reactExports, c as createLucideIcon, j as jsxRuntimeExports, m as motion, S as Shield, B as Badge, C as CircleCheck, b as ChevronDown, d as ChartColumn, u as useAuth, e as useRole, f as useNavigate, g as Button } from "./index-DqjjyDVW.js";
import { A as AnimatedPage, S as StaggerContainer, a as StaggerItem, G as GlassCard, b as GlassCardContent } from "./GlassCard-DnRTm3DA.js";
import { Z as Zap } from "./zap-DhjGLKHi.js";
import { U as Users } from "./users-DvIo2p9t.js";
import { A as ArrowRight } from "./arrow-right-Bdi5t6nh.js";
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const FEATURES = [
  {
    icon: Shield,
    title: "Cryptographic Security",
    description: "Every vote is sealed with zero-knowledge proofs — the system verifies validity without ever revealing voter identity.",
    accent: "primary",
    stat: "256-bit",
    statLabel: "Encryption"
  },
  {
    icon: EyeOff,
    title: "True Anonymity",
    description: "Your ballot is permanently decoupled from your identity. Track your vote with an anonymous confirmation ID.",
    accent: "accent",
    stat: "0%",
    statLabel: "Traceability"
  },
  {
    icon: ChartColumn,
    title: "Live Results",
    description: "Watch real-time turnout dashboards and animated result charts the moment polls close. Transparency without compromise.",
    accent: "primary",
    stat: "100%",
    statLabel: "Transparent"
  }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Authenticate",
    description: "Sign in securely using Internet Identity — no passwords, no leaks, no compromise.",
    icon: Lock
  },
  {
    step: "02",
    title: "Cast Your Ballot",
    description: "Select your choices on a guided ballot. Real-time validation ensures nothing is missing.",
    icon: CircleCheck
  },
  {
    step: "03",
    title: "Get Confirmation",
    description: "Receive an anonymous tracking ID that lets you verify your vote was counted — without revealing who you are.",
    icon: Zap
  }
];
const TRUST_STATS = [
  { value: "99.9%", label: "Uptime SLA", icon: Globe },
  { value: "< 2s", label: "Vote Confirmation", icon: Zap },
  { value: "0", label: "Data Breaches", icon: Shield },
  { value: "100K+", label: "Votes Cast", icon: Users }
];
function useReveal() {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true });
  return { ref, isInView };
}
function HeroCta() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const { isAdmin } = useRole();
  const navigate = useNavigate();
  if (isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "btn-primary-glow h-12 px-8 text-base font-display font-semibold rounded-xl gap-2",
          onClick: () => navigate({ to: "/elections" }),
          "data-ocid": "hero.elections_button",
          children: [
            "Go to Elections",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          variant: "outline",
          className: "h-12 px-8 text-base font-display font-semibold rounded-xl border-border/60 hover:border-primary/50 transition-smooth",
          onClick: () => navigate({ to: "/admin" }),
          "data-ocid": "hero.admin_button",
          children: "Admin Dashboard"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "lg",
        className: "btn-primary-glow h-12 px-10 text-base font-display font-semibold rounded-xl gap-2",
        onClick: login,
        disabled: isLoading,
        "data-ocid": "hero.get_started_button",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: "inline-block w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full",
              animate: { rotate: 360 },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 0.8,
                ease: "linear"
              }
            }
          ),
          "Connecting…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Get Started",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "lg",
        variant: "outline",
        className: "h-12 px-8 font-display font-semibold rounded-xl border-border/60 backdrop-blur transition-smooth hover:border-primary/50",
        "data-ocid": "hero.how_it_works_button",
        children: "How It Works"
      }
    ) })
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 pt-16 pb-28 overflow-hidden",
      "data-ocid": "landing.hero_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-securevote.dim_1200x700.jpg",
              alt: "",
              "aria-hidden": "true",
              className: "w-full h-full object-cover opacity-[0.18]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[560px] w-[560px] rounded-full border border-primary/6 animate-[spin_50s_linear_infinite]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute h-[380px] w-[380px] rounded-full border border-primary/10 animate-[spin_30s_linear_infinite_reverse]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute h-[220px] w-[220px] rounded-full border border-primary/16" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(StaggerContainer, { className: "flex flex-col items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.7 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                className: "mb-2 flex h-20 w-20 items-center justify-center rounded-2xl glass-elevated surface-glow",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-9 w-9 text-primary" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                whileHover: { scale: 1.04 },
                transition: { type: "spring", stiffness: 300 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "px-4 py-1.5 text-xs font-mono tracking-widest border-primary/40 text-primary bg-primary/8 uppercase",
                    "data-ocid": "hero.badge",
                    children: "⚡ Next-Gen Voting Platform"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-6xl sm:text-7xl md:text-[86px] font-display font-extrabold leading-[0.93] tracking-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Secure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Vote" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-body", children: [
              "A cryptographically secure, fully anonymous, and radically transparent voting platform — built for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "trust at scale" }),
              "."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCta, {}) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted-foreground font-mono", children: [
              "Zero-Knowledge Proofs",
              "Anonymous Ballots",
              "On-Chain Audit Trail"
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary" }),
              item
            ] }, item)) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute bottom-8 left-1/2 -translate-x-1/2",
              animate: { y: [0, 8, 0] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.8,
                ease: "easeInOut"
              },
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-muted-foreground/40" })
            }
          )
        ] })
      ]
    }
  );
}
function FeaturesSection() {
  const { ref, isInView } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "py-24 px-4 bg-muted/20",
      "data-ocid": "landing.features_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-primary uppercase mb-3", children: "Why SecureVote" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-display font-bold text-foreground", children: [
                "Built on Unbreakable",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: "Foundations" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Every layer of SecureVote is engineered to protect integrity, privacy, and transparency simultaneously." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 32 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: {
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1]
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                elevated: true,
                hoverable: true,
                gradient: feat.accent === "accent" ? "accent" : "primary",
                className: "h-full p-6 flex flex-col",
                "data-ocid": `landing.feature_card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feat.accent === "accent" ? "bg-accent/10 border-accent/30 text-accent" : "bg-primary/10 border-primary/30 text-primary"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { className: "w-5 h-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: feat.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5 flex-1", children: feat.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-auto pt-4 border-t border-border/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-2xl font-display font-bold ${feat.accent === "accent" ? "text-accent" : "text-primary"}`,
                        children: feat.stat
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-wider", children: feat.statLabel })
                  ] })
                ]
              }
            )
          },
          feat.title
        )) })
      ] })
    }
  );
}
function HowItWorksSection() {
  const { ref, isInView } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "how-it-works",
      ref,
      className: "py-24 px-4",
      "data-ocid": "landing.how_it_works_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "text-center mb-16",
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-accent uppercase mb-3", children: "The Process" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-display font-bold text-foreground", children: [
                "Vote in ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Three Steps" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" }),
          HOW_IT_WORKS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col items-center text-center",
              initial: { opacity: 0, y: 24 },
              animate: isInView ? { opacity: 1, y: 0 } : {},
              transition: {
                duration: 0.5,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1]
              },
              "data-ocid": `landing.step_card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary surface-glow",
                      whileHover: { scale: 1.1, rotate: 3 },
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 text-xs font-mono font-bold text-primary/50 bg-background px-1.5 py-0.5 rounded border border-border/40", children: step.step })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-display font-semibold text-foreground mb-2", children: step.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description })
              ]
            },
            step.step
          ))
        ] })
      ] })
    }
  );
}
function TrustStatsSection() {
  const { ref, isInView } = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref,
      className: "py-20 px-4 bg-muted/20",
      "data-ocid": "landing.trust_stats_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: TRUST_STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.88 },
          animate: isInView ? { opacity: 1, scale: 1 } : {},
          transition: {
            duration: 0.4,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1]
          },
          "data-ocid": `landing.trust_stat.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono mt-1", children: stat.label })
          ] })
        },
        stat.label
      )) }) })
    }
  );
}
function CtaBanner() {
  const { ref, isInView } = useReveal();
  const { isAuthenticated, login, isLoading } = useAuth();
  const { isAdmin } = useRole();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "py-24 px-4", "data-ocid": "landing.cta_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { elevated: true, gradient: "primary", className: "surface-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCardContent, { className: "p-10 flex flex-col items-center text-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 text-primary",
            whileHover: { rotate: [0, -10, 10, 0] },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl sm:text-4xl font-display font-bold text-foreground mb-3", children: [
            "Ready to make your",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "voice heard?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "Join thousands already using SecureVote to participate in elections they trust." })
        ] }),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "btn-primary-glow h-12 px-8 font-display font-semibold rounded-xl gap-2",
              onClick: () => navigate({ to: "/elections" }),
              "data-ocid": "landing.cta_elections_button",
              children: [
                "Browse Elections",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "h-12 px-8 font-display font-semibold rounded-xl border-border/60",
              onClick: () => navigate({ to: "/admin" }),
              "data-ocid": "landing.cta_admin_button",
              children: "Admin Dashboard"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "btn-primary-glow h-12 px-10 font-display font-semibold rounded-xl gap-2",
            onClick: login,
            disabled: isLoading,
            "data-ocid": "landing.cta_signin_button",
            children: [
              isLoading ? "Connecting…" : "Sign In to Vote",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }) })
    }
  ) }) });
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "landing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStatsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBanner, {})
  ] }) });
}
export {
  LandingPage as default
};
