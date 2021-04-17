import { connect } from "react-redux";
import { Redirect } from "react-router";
import QuestionCard from "../QuestionCard";
import ResultCard from "../ResultCard";

const UserCard = ({ match, authedUser, checkQuestionId, questions }) => {
  return (
    <>
      {questions[match.params.id] ? (
        authedUser && checkQuestionId(match.params.id) ? (
          <ResultCard id={match.params.id} />
        ) : (
          <QuestionCard id={match.params.id} />
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const mapStateToProps = ({ users, authedUser, questions }) => {
  const checkQuestionId = (id) => {
    return Object.keys(users[authedUser].answers).some(
      (answerId) => answerId === id
    );
  };
  return {
    authedUser,
    checkQuestionId,
    questions,
  };
};

export default connect(mapStateToProps)(UserCard);
