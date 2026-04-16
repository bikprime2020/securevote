// ─── Election Domain Types ───────────────────────────────────────────────────

export type QuestionType =
  | { __kind__: "MultipleChoice" }
  | { __kind__: "YesNo" }
  | { __kind__: "RankedChoice" };

export type ElectionStatus =
  | { __kind__: "Upcoming" }
  | { __kind__: "Active" }
  | { __kind__: "Closed" }
  | { __kind__: "Cancelled" };

export interface BallotOption {
  id: string;
  text: string;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: QuestionType;
  options: BallotOption[];
  maxSelections?: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  status: ElectionStatus;
  questions: Question[];
  startTime: bigint;
  endTime: bigint;
  createdBy: string;
  voterCount: bigint;
}

export interface ElectionSummary {
  id: string;
  title: string;
  description: string;
  status: ElectionStatus;
  startTime: bigint;
  endTime: bigint;
  voterCount: bigint;
}

export interface VoteConfirmation {
  trackingId: string;
  electionId: string;
  timestamp: bigint;
}

export interface VotePayload {
  electionId: string;
  answers: { questionId: string; selectedOptionIds: string[] }[];
}

export interface OptionResult {
  optionId: string;
  optionText: string;
  voteCount: bigint;
  percentage: number;
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  options: OptionResult[];
  totalVotes: bigint;
}

export interface ElectionResults {
  electionId: string;
  electionTitle: string;
  status: ElectionStatus;
  totalVoters: bigint;
  questions: QuestionResult[];
}

export interface TurnoutInfo {
  electionId: string;
  totalEligible: bigint;
  totalVoted: bigint;
  percentage: number;
}

// ─── Auth / Role Types ────────────────────────────────────────────────────────

export type UserRole = "Admin" | "Voter" | null;

export interface UserProfile {
  principal: string;
  displayName?: string;
  role: UserRole;
  registeredAt: bigint;
}

// ─── UI Utility Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface StatusMessage {
  id: string;
  text: string;
  type: "live" | "pending" | "closed" | "upcoming";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getElectionStatusLabel(status: ElectionStatus): string {
  switch (status.__kind__) {
    case "Active":
      return "ELECTION LIVE";
    case "Upcoming":
      return "Upcoming";
    case "Closed":
      return "Results Available";
    case "Cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
}

export function isElectionActive(status: ElectionStatus): boolean {
  return status.__kind__ === "Active";
}

export function isElectionClosed(status: ElectionStatus): boolean {
  return status.__kind__ === "Closed";
}

export function formatElectionDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
