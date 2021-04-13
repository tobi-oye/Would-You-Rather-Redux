export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer,
  };
}
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
