import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import ElectionTypes "../types/elections";
import VotingTypes "../types/voting";
import ElectionsLib "../lib/elections";
import VotingLib "../lib/voting";

mixin (
  accessControlState : AccessControl.AccessControlState,
  electionStore : ElectionsLib.ElectionStore,
  ballots : VotingLib.BallotStore,
  tallies : VotingLib.TallyStore,
) {
  /// Voter: cast a vote in an active election; returns anonymous confirmation token
  public shared ({ caller }) func castVote(args : VotingTypes.CastVoteArgs) : async VotingTypes.VoteConfirmation {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: You must be logged in to vote");
    };
    VotingLib.castVote(ballots, tallies, electionStore, caller, args);
  };

  /// Voter: check if caller has already voted in a given election
  public query ({ caller }) func hasVoted(electionId : CommonTypes.ElectionId) : async Bool {
    VotingLib.hasVoted(ballots, electionId, caller);
  };

  /// Any authenticated user: get live turnout for an election
  public query func getTurnout(electionId : CommonTypes.ElectionId) : async ?VotingTypes.TurnoutInfo {
    VotingLib.getTurnout(ballots, electionId);
  };

  /// Any authenticated user: get full results — only accessible after election closes
  public query func getElectionResults(electionId : CommonTypes.ElectionId) : async ?VotingTypes.ElectionResults {
    VotingLib.getResults(ballots, tallies, electionStore, electionId);
  };
};
