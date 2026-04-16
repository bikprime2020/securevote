import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import Types "../types/elections";

module {
  public type ElectionStore = Map.Map<CommonTypes.ElectionId, Types.Election>;

  public func computeStatus(election : Types.Election) : Types.ElectionStatus {
    let now = Time.now();
    if (now < election.startTime) {
      #scheduled;
    } else if (now <= election.endTime) {
      #active;
    } else {
      #closed;
    };
  };

  public func createElection(
    store : ElectionStore,
    nextId : Nat,
    caller : Principal,
    args : Types.CreateElectionArgs,
  ) : (Types.Election, Nat) {
    let id = nextId;
    var questionId = 0;
    let questions = args.questions.map(
      func(q) {
        let qid = questionId;
        questionId += 1;
        { id = qid; text = q.text; questionType = q.questionType };
      }
    );
    let election : Types.Election = {
      id;
      title = args.title;
      description = args.description;
      startTime = args.startTime;
      endTime = args.endTime;
      questions;
      createdBy = caller;
    };
    store.add(id, election);
    (election, nextId + 1);
  };

  public func getElection(store : ElectionStore, id : CommonTypes.ElectionId) : ?Types.Election {
    store.get(id);
  };

  public func listElections(store : ElectionStore) : [Types.ElectionSummary] {
    let summaries = List.empty<Types.ElectionSummary>();
    for ((_, election) in store.entries()) {
      summaries.add({
        id = election.id;
        title = election.title;
        description = election.description;
        startTime = election.startTime;
        endTime = election.endTime;
        status = computeStatus(election);
        questionCount = election.questions.size();
      });
    };
    summaries.toArray();
  };

  public func listActiveElections(store : ElectionStore) : [Types.ElectionSummary] {
    let summaries = List.empty<Types.ElectionSummary>();
    for ((_, election) in store.entries()) {
      let status = computeStatus(election);
      switch (status) {
        case (#active) {
          summaries.add({
            id = election.id;
            title = election.title;
            description = election.description;
            startTime = election.startTime;
            endTime = election.endTime;
            status;
            questionCount = election.questions.size();
          });
        };
        case (_) {};
      };
    };
    summaries.toArray();
  };
};
