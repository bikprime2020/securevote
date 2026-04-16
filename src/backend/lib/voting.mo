import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import ElectionTypes "../types/elections";
import VotingTypes "../types/voting";
import ElectionsLib "../lib/elections";

module {
  // Maps electionId -> Map<Principal, confirmationToken>
  public type BallotStore = Map.Map<CommonTypes.ElectionId, Map.Map<Principal, Text>>;
  // Maps electionId -> Map<questionId -> Map<optionLabel, count>>
  public type TallyStore = Map.Map<CommonTypes.ElectionId, Map.Map<CommonTypes.QuestionId, Map.Map<Text, Nat>>>;

  public func hasVoted(ballots : BallotStore, electionId : CommonTypes.ElectionId, voter : Principal) : Bool {
    switch (ballots.get(electionId)) {
      case null false;
      case (?voterMap) voterMap.containsKey(voter);
    };
  };

  public func generateToken(electionId : CommonTypes.ElectionId, voter : Principal) : Text {
    // Build an opaque token from electionId + voter principal text + time
    let now = Time.now();
    let voterText = voter.toText();
    let size = voterText.size();
    let timeStr = (now % 999983).toText();
    "v" # electionId.toText() # "t" # timeStr # "s" # size.toText();
  };

  public func castVote(
    ballots : BallotStore,
    tallies : TallyStore,
    electionStore : Map.Map<CommonTypes.ElectionId, ElectionTypes.Election>,
    caller : Principal,
    args : VotingTypes.CastVoteArgs,
  ) : VotingTypes.VoteConfirmation {
    let electionId = args.electionId;

    // Verify election exists and is active
    let election = switch (electionStore.get(electionId)) {
      case null Runtime.trap("Election not found");
      case (?e) e;
    };
    let status = ElectionsLib.computeStatus(election);
    switch (status) {
      case (#active) {};
      case (_) Runtime.trap("Election is not active");
    };

    // Check for double voting
    if (hasVoted(ballots, electionId, caller)) {
      Runtime.trap("Voter has already voted in this election");
    };

    // Generate anonymous token
    let token = generateToken(electionId, caller);

    // Record ballot (maps voter -> token; answers are stored separately in tallies with no voter link)
    let voterMap = switch (ballots.get(electionId)) {
      case null {
        let newMap = Map.empty<Principal, Text>();
        ballots.add(electionId, newMap);
        newMap;
      };
      case (?m) m;
    };
    voterMap.add(caller, token);

    // Update tallies per question answer
    let electionTally = switch (tallies.get(electionId)) {
      case null {
        let newTally = Map.empty<CommonTypes.QuestionId, Map.Map<Text, Nat>>();
        tallies.add(electionId, newTally);
        newTally;
      };
      case (?t) t;
    };

    for (answer in args.answers.values()) {
      let questionTally = switch (electionTally.get(answer.questionId)) {
        case null {
          let newQt = Map.empty<Text, Nat>();
          electionTally.add(answer.questionId, newQt);
          newQt;
        };
        case (?qt) qt;
      };
      let currentCount = switch (questionTally.get(answer.selectedOption)) {
        case null 0;
        case (?c) c;
      };
      questionTally.add(answer.selectedOption, currentCount + 1);
    };

    { confirmationToken = token; electionId };
  };

  public func getResults(
    ballots : BallotStore,
    tallies : TallyStore,
    electionStore : Map.Map<CommonTypes.ElectionId, ElectionTypes.Election>,
    electionId : CommonTypes.ElectionId,
  ) : ?VotingTypes.ElectionResults {
    let election = switch (electionStore.get(electionId)) {
      case null return null;
      case (?e) e;
    };

    // Only return results if election is closed
    let status = ElectionsLib.computeStatus(election);
    switch (status) {
      case (#closed) {};
      case (_) return null;
    };

    let totalVoters = switch (ballots.get(electionId)) {
      case null 0;
      case (?vm) vm.size();
    };

    let electionTally = switch (tallies.get(electionId)) {
      case null Map.empty<CommonTypes.QuestionId, Map.Map<Text, Nat>>();
      case (?t) t;
    };

    let questionResults = List.empty<VotingTypes.QuestionResult>();
    for (question in election.questions.values()) {
      let optionCounts = List.empty<(Text, Nat)>();
      switch (electionTally.get(question.id)) {
        case null {
          // No votes for this question — emit zeroed options
          switch (question.questionType) {
            case (#multipleChoice({ options })) {
              for (opt in options.values()) {
                optionCounts.add((opt, 0));
              };
            };
            case (#yesNo) {
              optionCounts.add(("Yes", 0));
              optionCounts.add(("No", 0));
            };
          };
        };
        case (?qt) {
          for ((optLabel, count) in qt.entries()) {
            optionCounts.add((optLabel, count));
          };
        };
      };
      questionResults.add({
        questionId = question.id;
        questionText = question.text;
        optionCounts = optionCounts.toArray();
      });
    };

    // Since there's no separate voter roll, turnout is 100% of those who voted
    let turnoutPercent : Float = if (totalVoters == 0) 0.0 else 100.0;

    ?{
      electionId;
      title = election.title;
      totalVoters;
      eligibleVoterCount = totalVoters;
      turnoutPercent;
      questionResults = questionResults.toArray();
    };
  };

  public func getTurnout(
    ballots : BallotStore,
    electionId : CommonTypes.ElectionId,
  ) : ?VotingTypes.TurnoutInfo {
    let totalVotesCast = switch (ballots.get(electionId)) {
      case null 0;
      case (?vm) vm.size();
    };
    ?{
      electionId;
      totalVotesCast;
      turnoutPercent = if (totalVotesCast == 0) 0.0 else 100.0;
    };
  };
};
