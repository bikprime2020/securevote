import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  EyeOff,
  Globe,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "../components/AnimatedPage";
import { GlassCard, GlassCardContent } from "../components/GlassCard";
import { useAuth } from "../hooks/use-auth";
import { useRole } from "../hooks/use-role";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Shield,
    title: "Cryptographic Security",
    description:
      "Every vote is sealed with zero-knowledge proofs — the system verifies validity without ever revealing voter identity.",
    accent: "primary" as const,
    stat: "256-bit",
    statLabel: "Encryption",
  },
  {
    icon: EyeOff,
    title: "True Anonymity",
    description:
      "Your ballot is permanently decoupled from your identity. Track your vote with an anonymous confirmation ID.",
    accent: "accent" as const,
    stat: "0%",
    statLabel: "Traceability",
  },
  {
    icon: BarChart3,
    title: "Live Results",
    description:
      "Watch real-time turnout dashboards and animated result charts the moment polls close. Transparency without compromise.",
    accent: "primary" as const,
    stat: "100%",
    statLabel: "Transparent",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Authenticate",
    description:
      "Sign in securely using Internet Identity — no passwords, no leaks, no compromise.",
    icon: Lock,
  },
  {
    step: "02",
    title: "Cast Your Ballot",
    description:
      "Select your choices on a guided ballot. Real-time validation ensures nothing is missing.",
    icon: CheckCircle2,
  },
  {
    step: "03",
    title: "Get Confirmation",
    description:
      "Receive an anonymous tracking ID that lets you verify your vote was counted — without revealing who you are.",
    icon: Zap,
  },
];

const TRUST_STATS = [
  { value: "99.9%", label: "Uptime SLA", icon: Globe },
  { value: "< 2s", label: "Vote Confirmation", icon: Zap },
  { value: "0", label: "Data Breaches", icon: Shield },
  { value: "100K+", label: "Votes Cast", icon: Users },
];

// ─── Reveal hook ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return { ref, isInView };
}

// ─── Hero CTA ─────────────────────────────────────────────────────────────────

function HeroCta() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const { isAdmin } = useRole();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          size="lg"
          className="btn-primary-glow h-12 px-8 text-base font-display font-semibold rounded-xl gap-2"
          onClick={() => navigate({ to: "/elections" })}
          data-ocid="hero.elections_button"
        >
          Go to Elections
          <ArrowRight className="w-4 h-4" />
        </Button>
        {isAdmin && (
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base font-display font-semibold rounded-xl border-border/60 hover:border-primary/50 transition-smooth"
            onClick={() => navigate({ to: "/admin" })}
            data-ocid="hero.admin_button"
          >
            Admin Dashboard
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Button
        size="lg"
        className="btn-primary-glow h-12 px-10 text-base font-display font-semibold rounded-xl gap-2"
        onClick={login}
        disabled={isLoading}
        data-ocid="hero.get_started_button"
      >
        {isLoading ? (
          <>
            <motion.span
              className="inline-block w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 0.8,
                ease: "linear",
              }}
            />
            Connecting…
          </>
        ) : (
          <>
            Get Started
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
      <a href="#how-it-works">
        <Button
          size="lg"
          variant="outline"
          className="h-12 px-8 font-display font-semibold rounded-xl border-border/60 backdrop-blur transition-smooth hover:border-primary/50"
          data-ocid="hero.how_it_works_button"
        >
          How It Works
        </Button>
      </a>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 pt-16 pb-28 overflow-hidden"
      data-ocid="landing.hero_section"
    >
      {/* Hero image backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-securevote.dim_1200x700.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      </div>

      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[560px] w-[560px] rounded-full border border-primary/6 animate-[spin_50s_linear_infinite]" />
        <div className="absolute h-[380px] w-[380px] rounded-full border border-primary/10 animate-[spin_30s_linear_infinite_reverse]" />
        <div className="absolute h-[220px] w-[220px] rounded-full border border-primary/16" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <StaggerContainer className="flex flex-col items-center gap-6">
          {/* Icon + badge */}
          <StaggerItem>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2 flex h-20 w-20 items-center justify-center rounded-2xl glass-elevated surface-glow"
            >
              <Shield className="h-9 w-9 text-primary" />
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-xs font-mono tracking-widest border-primary/40 text-primary bg-primary/8 uppercase"
                data-ocid="hero.badge"
              >
                ⚡ Next-Gen Voting Platform
              </Badge>
            </motion.div>
          </StaggerItem>

          {/* Headline */}
          <StaggerItem>
            <h1 className="text-6xl sm:text-7xl md:text-[86px] font-display font-extrabold leading-[0.93] tracking-tight">
              <span className="text-foreground">Secure</span>
              <span className="text-gradient-primary">Vote</span>
            </h1>
          </StaggerItem>

          {/* Subheading */}
          <StaggerItem>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-body">
              A cryptographically secure, fully anonymous, and radically
              transparent voting platform — built for{" "}
              <span className="text-foreground font-medium">
                trust at scale
              </span>
              .
            </p>
          </StaggerItem>

          {/* CTA Buttons */}
          <StaggerItem>
            <div className="mt-2">
              <HeroCta />
            </div>
          </StaggerItem>

          {/* Trust badges row */}
          <StaggerItem>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted-foreground font-mono">
              {[
                "Zero-Knowledge Proofs",
                "Anonymous Ballots",
                "On-Chain Audit Trail",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.8,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection() {
  const { ref, isInView } = useReveal();

  return (
    <section
      ref={ref}
      className="py-24 px-4 bg-muted/20"
      data-ocid="landing.features_section"
    >
      <div className="container max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-mono tracking-widest text-primary uppercase mb-3">
            Why SecureVote
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground">
            Built on Unbreakable{" "}
            <span className="text-gradient-accent">Foundations</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every layer of SecureVote is engineered to protect integrity,
            privacy, and transparency simultaneously.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard
                elevated
                hoverable
                gradient={feat.accent === "accent" ? "accent" : "primary"}
                className="h-full p-6 flex flex-col"
                data-ocid={`landing.feature_card.${i + 1}`}
              >
                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${
                    feat.accent === "accent"
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "bg-primary/10 border-primary/30 text-primary"
                  }`}
                >
                  <feat.icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {feat.description}
                </p>

                {/* Stat pill */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border/30">
                  <span
                    className={`text-2xl font-display font-bold ${
                      feat.accent === "accent" ? "text-accent" : "text-primary"
                    }`}
                  >
                    {feat.stat}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {feat.statLabel}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const { ref, isInView } = useReveal();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 px-4"
      data-ocid="landing.how_it_works_section"
    >
      <div className="container max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
            The Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground">
            Vote in <span className="text-gradient-primary">Three Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

          {HOW_IT_WORKS.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-ocid={`landing.step_card.${i + 1}`}
            >
              <div className="relative mb-5">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary surface-glow"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <span className="absolute -top-2 -right-2 text-xs font-mono font-bold text-primary/50 bg-background px-1.5 py-0.5 rounded border border-border/40">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Stats ──────────────────────────────────────────────────────────────

function TrustStatsSection() {
  const { ref, isInView } = useReveal();

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-muted/20"
      data-ocid="landing.trust_stats_section"
    >
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-ocid={`landing.trust_stat.${i + 1}`}
            >
              <GlassCard elevated className="p-5 text-center">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 mx-auto">
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CtaBanner() {
  const { ref, isInView } = useReveal();
  const { isAuthenticated, login, isLoading } = useAuth();
  const { isAdmin } = useRole();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 px-4" data-ocid="landing.cta_section">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard elevated gradient="primary" className="surface-glow">
            <GlassCardContent className="p-10 flex flex-col items-center text-center gap-6">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 text-primary"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-7 h-7" />
              </motion.div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
                  Ready to make your{" "}
                  <span className="text-gradient-primary">voice heard?</span>
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Join thousands already using SecureVote to participate in
                  elections they trust.
                </p>
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="btn-primary-glow h-12 px-8 font-display font-semibold rounded-xl gap-2"
                    onClick={() => navigate({ to: "/elections" })}
                    data-ocid="landing.cta_elections_button"
                  >
                    Browse Elections
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 font-display font-semibold rounded-xl border-border/60"
                      onClick={() => navigate({ to: "/admin" })}
                      data-ocid="landing.cta_admin_button"
                    >
                      Admin Dashboard
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  size="lg"
                  className="btn-primary-glow h-12 px-10 font-display font-semibold rounded-xl gap-2"
                  onClick={login}
                  disabled={isLoading}
                  data-ocid="landing.cta_signin_button"
                >
                  {isLoading ? "Connecting…" : "Sign In to Vote"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </GlassCardContent>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <AnimatedPage>
      <div data-ocid="landing.page">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustStatsSection />
        <CtaBanner />
      </div>
    </AnimatedPage>
  );
}
