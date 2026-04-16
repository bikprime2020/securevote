import Common "common";

module {
  public type ElectionId = Common.ElectionId;
  public type QuestionId = Common.QuestionId;

  public type Answer = {
    questionId : QuestionId;
    selectedOption : Text; // "Yes"/"No" or option label for multiple choice
  };

  public type CastVoteArgs = {
    electionId : ElectionId;
    answers : [Answer];
  };

  public type VoteConfirmation = {
    confirmationToken : Text; // unique anonymous token
    electionId : ElectionId;
  };

  public type QuestionResult = {
    questionId : QuestionId;
    questionText : Text;
    optionCounts : [(Text, Nat)]; // (option label, vote count)
  };

  public type ElectionResults = {
    electionId : ElectionId;
    title : Text;
    totalVoters : Nat;
    eligibleVoterCount : Nat; // registered voters who could vote
    turnoutPercent : Float;
    questionResults : [QuestionResult];
  };

  public type TurnoutInfo = {
    electionId : ElectionId;
    totalVotesCast : Nat;
    turnoutPercent : Float;
  };
};
