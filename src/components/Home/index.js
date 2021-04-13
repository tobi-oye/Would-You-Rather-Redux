import { Flex, Button, Box, VStack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const Home = ({
  users,
  answeredQuestionsList,
  unansweredQuestionsList,
  questions,
}) => {
  const history = useHistory();
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
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              width: "100%",
              display: question.answeredDisplay,
              border: "1px solid black",
            }}
          >
            {answeredQuestionsList.map((answeredQuestion) => (
              <>
                <li
                  style={{ border: "1px solid black", margin: "20px" }}
                  key={answeredQuestion.id}
                >
                  <Flex flexDir="column" alignItems="flex-start">
                    <Box
                      border="1px solid black"
                      w="100%"
                      mb="20px"
                      bgColor="grey"
                      p="5px"
                    >
                      {" "}
                      <Text fontWeight="700">
                        {" "}
                        {users[answeredQuestion.author].name} asks
                      </Text>{" "}
                    </Box>

                    <Flex justifyContent="space-between">
                      <Image
                        src={users[answeredQuestion.author].avatarURL}
                        alt={users[answeredQuestion.author].name}
                        borderRadius="full"
                        boxSize="100px"
                      />
                      <VStack align="start" m="10px">
                        <Text>Would you rather</Text>
                        <Box maxW="100px">
                          {" "}
                          <Text isTruncated>
                            a. {questions[answeredQuestion.id].optionOne.text}
                          </Text>
                        </Box>
                        <Button
                          value={answeredQuestion.id}
                          onClick={(e) =>
                            history.push(`/questions/${e.target.value}`)
                          }
                        >
                          View Poll
                        </Button>
                      </VStack>
                    </Flex>
                  </Flex>
                </li>
              </>
            ))}
          </ul>

          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              width: "100%",
              display: question.unansweredDisplay,
              border: "1px solid black",
            }}
          >
            {unansweredQuestionsList.map((answeredQuestion) => (
              <>
                <li style={{ border: "1px solid black", margin: "20px" }}>
                  <Flex flexDir="column" alignItems="flex-start">
                    <Box
                      border="1px solid black"
                      w="100%"
                      mb="20px"
                      bgColor="grey"
                      p="5px"
                    >
                      {" "}
                      <Text fontWeight="700">
                        {" "}
                        {users[answeredQuestion.author].name} asks
                      </Text>{" "}
                    </Box>

                    <Flex justifyContent="space-between">
                      <Image
                        src={users[answeredQuestion.author].avatarURL}
                        alt={users[answeredQuestion.author].name}
                        borderRadius="full"
                        boxSize="100px"
                      />
                      <VStack align="start" m="10px">
                        <Text>Would you rather</Text>
                        <Box maxW="100px">
                          {" "}
                          <Text isTruncated>
                            a. {questions[answeredQuestion.id].optionOne.text}
                          </Text>
                        </Box>
                        <Button
                          value={answeredQuestion.id}
                          onClick={(e) =>
                            history.push(`/questions/${e.target.value}`)
                          }
                        >
                          View Poll
                        </Button>
                      </VStack>
                    </Flex>
                  </Flex>
                </li>
              </>
            ))}
          </ul>
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
