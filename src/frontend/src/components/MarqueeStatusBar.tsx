import { CalendarClock, CheckCircle2, Clock, Radio } from "lucide-react";
import { motion } from "motion/react";
import type { StatusMessage } from "../types";

// Default marquee messages — replaced by live data when available
const DEFAULT_MESSAGES: StatusMessage[] = [
  {
    id: "1",
    text: "SecureVote — Cryptographically Secure Online Voting",
    type: "live",
  },
  {
    id: "2",
    text: "Presidential Election 2026 — ELECTION LIVE — Cast your vote now",
    type: "live",
  },
  {
    id: "3",
    text: "City Council Referendum — Results Pending — Counting in progress",
    type: "pending",
  },
  {
    id: "4",
    text: "Community Budget Vote — Voting Closed — Results available",
    type: "closed",
  },
  {
    id: "5",
    text: "Board Member Election — Upcoming — Opens June 1, 2026",
    type: "upcoming",
  },
  {
    id: "6",
    text: "Zero-Knowledge Proofs — Your anonymity is mathematically guaranteed",
    type: "live",
  },
];

const iconMap = {
  live: Radio,
  pending: Clock,
  closed: CheckCircle2,
  upcoming: CalendarClock,
};

const colorMap = {
  live: "text-primary",
  pending: "text-accent",
  closed: "text-muted-foreground",
  upcoming: "text-muted-foreground",
};

interface MarqueeStatusBarProps {
  messages?: StatusMessage[];
}

function MessageChip({ message }: { message: StatusMessage }) {
  const Icon = iconMap[message.type];
  return (
    <span
      className={`inline-flex items-center gap-2 mx-8 whitespace-nowrap text-xs font-mono tracking-wide ${colorMap[message.type]}`}
    >
      {message.type === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
      {message.type !== "live" && (
        <Icon className="h-3 w-3 opacity-70 flex-shrink-0" />
      )}
      <span>{message.text}</span>
      <span className="opacity-30 mx-4">•</span>
    </span>
  );
}

export function MarqueeStatusBar({
  messages = DEFAULT_MESSAGES,
}: MarqueeStatusBarProps) {
  const items = [...messages, ...messages]; // duplicate for seamless loop

  return (
    <div
      className="w-full overflow-hidden border-b border-border/30 bg-card/40 backdrop-blur-sm py-2"
      aria-label="Election status announcements"
      data-ocid="marquee.status_bar"
    >
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 40,
          ease: "linear",
        }}
      >
        {items.map((msg, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: duplicate items for marquee loop
          <MessageChip key={`${msg.id}-${i}`} message={msg} />
        ))}
      </motion.div>
    </div>
  );
}
