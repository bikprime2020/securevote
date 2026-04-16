import type { backendInterface } from "../backend";
import { ElectionStatus, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  assignCallerUserRole: async (_user, _role) => undefined,

  castVote: async (_args) => ({
    electionId: BigInt(1),
    confirmationToken: "TKN-7X3K-2024-SECUREVOTE",
  }),

  createElection: async (args) => ({
    id: BigInt(3),
    startTime: BigInt(Date.now() + 86400000) * BigInt(1000000),
    endTime: BigInt(Date.now() + 7 * 86400000) * BigInt(1000000),
    title: args.title,
    description: args.description,
    createdBy: { toText: () => "aaaaa-aa" } as any,
    questions: args.questions.map((q, i) => ({
      id: BigInt(i),
      text: q.text,
      questionType: q.questionType,
    })),
  }),

  getCallerUserRole: async () => UserRole.admin,

  getElection: async (id) => ({
    id,
    startTime: BigInt(Date.now() - 86400000) * BigInt(1000000),
    endTime: BigInt(Date.now() + 6 * 86400000) * BigInt(1000000),
    title: "City Council Election 2026",
    description:
      "Vote for your preferred candidates to represent your district in the City Council for the upcoming term.",
    createdBy: { toText: () => "aaaaa-aa" } as any,
    questions: [
      {
        id: BigInt(0),
        text: "Who should be elected for District 1 Council Seat?",
        questionType: {
          __kind__: "multipleChoice",
          multipleChoice: {
            options: ["Alice Johnson", "Bob Martinez", "Carol Lee", "David Kim"],
          },
        },
      },
      {
        id: BigInt(1),
        text: "Should the city increase the public transit budget?",
        questionType: { __kind__: "yesNo", yesNo: null },
      },
    ],
  }),

  getElectionResults: async (electionId) => ({
    electionId,
    title: "City Council Election 2026",
    totalVoters: BigInt(1240),
    eligibleVoterCount: BigInt(3000),
    turnoutPercent: 41.3,
    questionResults: [
      {
        questionId: BigInt(0),
        questionText: "Who should be elected for District 1 Council Seat?",
        optionCounts: [
          ["Alice Johnson", BigInt(512)],
          ["Bob Martinez", BigInt(381)],
          ["Carol Lee", BigInt(234)],
          ["David Kim", BigInt(113)],
        ],
      },
      {
        questionId: BigInt(1),
        questionText: "Should the city increase the public transit budget?",
        optionCounts: [
          ["Yes", BigInt(889)],
          ["No", BigInt(351)],
        ],
      },
    ],
  }),

  getTurnout: async (electionId) => ({
    electionId,
    totalVotesCast: BigInt(1240),
    turnoutPercent: 41.3,
  }),

  hasVoted: async (_electionId) => false,

  isCallerAdmin: async () => true,

  listActiveElections: async () => [
    {
      id: BigInt(1),
      title: "City Council Election 2026",
      description:
        "Vote for your preferred candidates to represent your district in the City Council.",
      status: ElectionStatus.active,
      startTime: BigInt(Date.now() - 86400000) * BigInt(1000000),
      endTime: BigInt(Date.now() + 6 * 86400000) * BigInt(1000000),
      questionCount: BigInt(2),
    },
    {
      id: BigInt(2),
      title: "Community Park Initiative",
      description:
        "Decide on the future development plans for the downtown community park.",
      status: ElectionStatus.active,
      startTime: BigInt(Date.now() - 3600000) * BigInt(1000000),
      endTime: BigInt(Date.now() + 3 * 86400000) * BigInt(1000000),
      questionCount: BigInt(1),
    },
  ],

  listElections: async () => [
    {
      id: BigInt(1),
      title: "City Council Election 2026",
      description:
        "Vote for your preferred candidates to represent your district in the City Council.",
      status: ElectionStatus.active,
      startTime: BigInt(Date.now() - 86400000) * BigInt(1000000),
      endTime: BigInt(Date.now() + 6 * 86400000) * BigInt(1000000),
      questionCount: BigInt(2),
    },
    {
      id: BigInt(2),
      title: "Community Park Initiative",
      description:
        "Decide on the future development plans for the downtown community park.",
      status: ElectionStatus.active,
      startTime: BigInt(Date.now() - 3600000) * BigInt(1000000),
      endTime: BigInt(Date.now() + 3 * 86400000) * BigInt(1000000),
      questionCount: BigInt(1),
    },
    {
      id: BigInt(3),
      title: "Annual Budget Referendum 2025",
      description: "Citizens vote on the allocation of the annual city budget.",
      status: ElectionStatus.closed,
      startTime: BigInt(Date.now() - 30 * 86400000) * BigInt(1000000),
      endTime: BigInt(Date.now() - 23 * 86400000) * BigInt(1000000),
      questionCount: BigInt(3),
    },
    {
      id: BigInt(4),
      title: "School Board Election — Fall 2026",
      description:
        "Elect new members to the local school board for a 3-year term.",
      status: ElectionStatus.scheduled,
      startTime: BigInt(Date.now() + 7 * 86400000) * BigInt(1000000),
      endTime: BigInt(Date.now() + 14 * 86400000) * BigInt(1000000),
      questionCount: BigInt(2),
    },
  ],
};
