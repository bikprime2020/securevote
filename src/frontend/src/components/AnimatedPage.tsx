import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
  /** Direction of the page entrance animation */
  direction?: "up" | "right" | "left" | "fade";
}

const variants = {
  up: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  right: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
  left: {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
  fade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
};

export function AnimatedPage({
  children,
  className,
  direction = "up",
}: AnimatedPageProps) {
  const v = variants[direction];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Stagger container for child reveals ─────────────────────────────────────

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
