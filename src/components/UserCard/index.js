import { connect } from "react-redux";
import QuestionCard from "../QuestionCard";
import ResultCard from "../ResultCard";

const UserCard = ({ match, authedUser, checkQuestionId }) => {
  console.log(checkQuestionId(match.params.id));
  return (
    <>
      {authedUser && checkQuestionId(match.params.id) ? (
        <ResultCard id={match.params.id} />
      ) : (
        <QuestionCard id={match.params.id} />
      )}
    </>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  const checkQuestionId = (id) => {
    return Object.keys(users[authedUser].answers).some(
      (answerId) => answerId === id
    );
  };
  return {
    authedUser,
    checkQuestionId,
  };
};

export default connect(mapStateToProps)(UserCard);
