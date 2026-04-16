import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CastVoteArgs {
    answers: Array<Answer>;
    electionId: ElectionId;
}
export interface TurnoutInfo {
    totalVotesCast: bigint;
    electionId: ElectionId;
    turnoutPercent: number;
}
export type Timestamp = bigint;
export type QuestionType = {
    __kind__: "multipleChoice";
    multipleChoice: {
        options: Array<string>;
    };
} | {
    __kind__: "yesNo";
    yesNo: null;
};
export interface ElectionResults {
    title: string;
    eligibleVoterCount: bigint;
    totalVoters: bigint;
    questionResults: Array<QuestionResult>;
    electionId: ElectionId;
    turnoutPercent: number;
}
export type ElectionId = bigint;
export type QuestionId = bigint;
export interface VoteConfirmation {
    electionId: ElectionId;
    confirmationToken: string;
}
export interface QuestionResult {
    optionCounts: Array<[string, bigint]>;
    questionText: string;
    questionId: QuestionId;
}
export interface CreateElectionArgs {
    startTime: Timestamp;
    title: string;
    endTime: Timestamp;
    description: string;
    questions: Array<CreateQuestionArgs>;
}
export interface CreateQuestionArgs {
    text: string;
    questionType: QuestionType;
}
export interface Answer {
    questionId: QuestionId;
    selectedOption: string;
}
export interface ElectionSummary {
    id: ElectionId;
    startTime: Timestamp;
    status: ElectionStatus;
    title: string;
    endTime: Timestamp;
    description: string;
    questionCount: bigint;
}
export interface Question {
    id: QuestionId;
    text: string;
    questionType: QuestionType;
}
export interface Election {
    id: ElectionId;
    startTime: Timestamp;
    title: string;
    endTime: Timestamp;
    createdBy: Principal;
    description: string;
    questions: Array<Question>;
}
export enum ElectionStatus {
    scheduled = "scheduled",
    closed = "closed",
    active = "active"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    castVote(args: CastVoteArgs): Promise<VoteConfirmation>;
    createElection(args: CreateElectionArgs): Promise<Election>;
    getCallerUserRole(): Promise<UserRole>;
    getElection(id: ElectionId): Promise<Election | null>;
    getElectionResults(electionId: ElectionId): Promise<ElectionResults | null>;
    getTurnout(electionId: ElectionId): Promise<TurnoutInfo | null>;
    hasVoted(electionId: ElectionId): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listActiveElections(): Promise<Array<ElectionSummary>>;
    listElections(): Promise<Array<ElectionSummary>>;
}
