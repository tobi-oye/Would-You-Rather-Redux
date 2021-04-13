import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export const saveQuestion = (question) => _saveQuestion(question);

export const saveQuestionAnswer = (answerInfo) => {
  const { authedUser, qId, answer } = answerInfo;
  return _saveQuestionAnswer({ authedUser, qId, answer });
};
