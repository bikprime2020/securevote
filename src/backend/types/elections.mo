import Common "common";

module {
  public type ElectionId = Common.ElectionId;
  public type Timestamp = Common.Timestamp;

  public type QuestionType = {
    #multipleChoice : { options : [Text] };
    #yesNo;
  };

  public type Question = {
    id : Common.QuestionId;
    text : Text;
    questionType : QuestionType;
  };

  public type ElectionStatus = {
    #scheduled;
    #active;
    #closed;
  };

  public type Election = {
    id : ElectionId;
    title : Text;
    description : Text;
    startTime : Timestamp;
    endTime : Timestamp;
    questions : [Question];
    createdBy : Principal;
  };

  public type ElectionSummary = {
    id : ElectionId;
    title : Text;
    description : Text;
    startTime : Timestamp;
    endTime : Timestamp;
    status : ElectionStatus;
    questionCount : Nat;
  };

  public type CreateElectionArgs = {
    title : Text;
    description : Text;
    startTime : Timestamp;
    endTime : Timestamp;
    questions : [CreateQuestionArgs];
  };

  public type CreateQuestionArgs = {
    text : Text;
    questionType : QuestionType;
  };
};
