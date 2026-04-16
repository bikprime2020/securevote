import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayVal, setDisplayVal] = useState(0);
  const [phase, setPhase] = useState<"counting" | "done">("counting");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayVal(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        setPhase("done");
        setTimeout(onComplete, 600);
      },
    });
    return controls.stop;
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
      animate={
        phase === "done"
          ? { opacity: 0, scale: 1.04 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
      </div>

      {/* Logo / icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl glass-elevated"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="oklch(var(--primary))"
            strokeWidth="2"
            opacity="0.4"
          />
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="oklch(var(--primary))"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx="20" cy="20" r="5" fill="oklch(var(--primary))" />
          <line
            x1="20"
            y1="2"
            x2="20"
            y2="8"
            stroke="oklch(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="38"
            y1="20"
            x2="32"
            y2="20"
            stroke="oklch(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-2 font-display text-3xl font-bold tracking-tight text-foreground"
      >
        SecureVote
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-12 text-sm text-muted-foreground tracking-widest uppercase"
      >
        Cryptographically Secure Voting
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-64"
      >
        <div className="mb-3 flex items-end justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            Initializing
          </span>
          <motion.span className="font-mono text-lg font-bold text-primary">
            {displayVal}%
          </motion.span>
        </div>

        {/* Track */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${displayVal}%` }}
            transition={{ type: "spring", stiffness: 80 }}
          />
        </div>

        {/* Micro labels */}
        <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground/60">
          <span>SECURE</span>
          <span>TRANSPARENT</span>
          <span>TRUSTED</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
