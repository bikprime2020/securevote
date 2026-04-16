import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ElectionsLib "lib/elections";
import VotingLib "lib/voting";
import ElectionsMixin "mixins/elections-api";
import VotingMixin "mixins/voting-api";

actor {
  // Authorization state (first login becomes admin automatically)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Election store state
  let electionStore : ElectionsLib.ElectionStore = Map.empty();
  let nextElectionId = { var value : Nat = 0 };

  // Voting state
  let ballots : VotingLib.BallotStore = Map.empty();
  let tallies : VotingLib.TallyStore = Map.empty();

  // Include domain mixins
  include ElectionsMixin(accessControlState, electionStore, nextElectionId);
  include VotingMixin(accessControlState, electionStore, ballots, tallies);
};
