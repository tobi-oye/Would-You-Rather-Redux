import { Flex, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { connect } from "react-redux";
import Answered from "./components/Answered";
import UnAnswered from "./components/UnAnswered";

const Home = ({ answeredQuestionsList, unansweredQuestionsList }) => {
  const [question, setQuestion] = useState({
    unansweredDisplay: "block",
    answeredDisplay: "none",
    unAnsweredButtonBgColor: "green",
    answeredButtonBgColor: "white",
  });
  const showUnAnswered = () => {
    return setQuestion({
      unansweredDisplay: "block",
      answeredDisplay: "none",
      unAnsweredButtonBgColor: "green",
      answeredButtonBgColor: "white",
    });
  };

  const showAnswered = () => {
    return setQuestion({
      unansweredDisplay: "none",
      answeredDisplay: "block",
      unAnsweredButtonBgColor: "white",
      answeredButtonBgColor: "green",
    });
  };

  return (
    <Flex justifyContent="center">
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w="400px"
      >
        <Flex justifyContent="space-between">
          <Button
            bgColor={question.unAnsweredButtonBgColor}
            onClick={() => showUnAnswered()}
          >
            Unanswered Quesions
          </Button>{" "}
          <Button
            bgColor={question.answeredButtonBgColor}
            onClick={() => showAnswered()}
          >
            Answered Questions
          </Button>{" "}
        </Flex>
        <Box p="15px" w="100%">
          <Box style={{ display: question.answeredDisplay }}>
            <Answered answeredQuestionsList={answeredQuestionsList} />
          </Box>

          <Box style={{ display: question.unansweredDisplay }}>
            <UnAnswered unansweredQuestionsList={unansweredQuestionsList} />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = ({ users, authedUser, questions }) => {
  const answeredQuestionsInfo = users[authedUser].answers;
  const answeredQuestionsId = Object.keys(answeredQuestionsInfo);
  const questionsList = Object.values(questions);
  const answeredQuestionsHandler = () => {
    return questionsList.filter((question) => {
      return answeredQuestionsId.includes(question.id);
    });
  };
  const answeredQuestionsList = answeredQuestionsHandler();

  const unansweredQuestionsHandler = () => {
    return questionsList.filter((question) => {
      return !answeredQuestionsId.includes(question.id);
    });
  };
  const unansweredQuestionsList = unansweredQuestionsHandler();

  return {
    users,
    authedUser,
    questions,
    answeredQuestionsList,
    unansweredQuestionsList,
  };
};

export default connect(mapStateToProps)(Home);
