import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import Types "../types/elections";
import ElectionsLib "../lib/elections";

mixin (
  accessControlState : AccessControl.AccessControlState,
  electionStore : ElectionsLib.ElectionStore,
  nextElectionId : { var value : Nat },
) {
  /// Admin: create a new election
  public shared ({ caller }) func createElection(args : Types.CreateElectionArgs) : async Types.Election {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create elections");
    };
    let (election, newId) = ElectionsLib.createElection(electionStore, nextElectionId.value, caller, args);
    nextElectionId.value := newId;
    election;
  };

  /// Any authenticated user: list all elections with status
  public query func listElections() : async [Types.ElectionSummary] {
    ElectionsLib.listElections(electionStore);
  };

  /// Any authenticated user: list only active elections
  public query func listActiveElections() : async [Types.ElectionSummary] {
    ElectionsLib.listActiveElections(electionStore);
  };

  /// Any authenticated user: get a single election by id
  public query func getElection(id : CommonTypes.ElectionId) : async ?Types.Election {
    ElectionsLib.getElection(electionStore, id);
  };
};
