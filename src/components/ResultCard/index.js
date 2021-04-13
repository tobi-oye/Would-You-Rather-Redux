import {
  Box,
  HStack,
  VStack,
  Progress,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { connect } from "react-redux";

const ResultCard = ({
  id,
  users,
  questions,
  optionOneVotesCount,
  optionTwoVotesCount,
  totalVotesCount,
  optionOnePercentageProgress,
  optionTwoPercentageProgress,
}) => {
  return (
    <Flex justifyContent="center">
      <VStack align="start" border="1px solid black" p="30px">
        <Box>
          <Text> asked by {users[questions[id].author].name} </Text>
        </Box>
        <Box>
          <HStack>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={users[questions[id].author].avatarURL}
              alt={users[questions[id].author].name}
            />
            <Box>
              <VStack p="10px" spacing={6} align="start">
                <Text>Results</Text>

                <Box w="100%">
                  <Text> a. {questions[id].optionOne.text}</Text>
                  <Progress
                    value={optionOnePercentageProgress(id)}
                    colorScheme="green"
                  >
                    80
                  </Progress>
                  <Box>
                    {" "}
                    {optionOneVotesCount(id)} of {totalVotesCount(id)} votes
                  </Box>
                </Box>

                <Box w="100%">
                  <Text>b. {questions[id].optionTwo.text}</Text>
                  <Progress
                    value={optionTwoPercentageProgress(id)}
                    colorScheme="green"
                  />
                  <Box>
                    {" "}
                    {optionTwoVotesCount(id)} of {totalVotesCount(id)} votes
                  </Box>
                </Box>
              </VStack>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Flex>
  );
};

const mapStateToProps = ({ users, questions }) => {
  const optionOneVotesCount = (id) => {
    return questions[id].optionOne.votes.length;
  };
  const optionTwoVotesCount = (id) => {
    return questions[id].optionTwo.votes.length;
  };

  const totalVotesCount = (id) => {
    return optionOneVotesCount(id) + optionTwoVotesCount(id);
  };

  const optionOnePercentageProgress = (id) => {
    const questionVoteValue = questions[id].optionOne.votes.length;
    const totalVoteValue = optionOneVotesCount(id) + optionTwoVotesCount(id);

    const percentageProgress = (questionVoteValue / totalVoteValue) * 100;
    return Math.round(percentageProgress);
  };
  const optionTwoPercentageProgress = (id) => {
    const questionVoteValue = questions[id].optionTwo.votes.length;
    const totalVoteValue = optionOneVotesCount(id) + optionTwoVotesCount(id);

    const percentageProgress = (questionVoteValue / totalVoteValue) * 100;
    return Math.round(percentageProgress);
  };

  return {
    users,
    questions,
    optionOneVotesCount,
    optionTwoVotesCount,
    totalVotesCount,
    optionOnePercentageProgress,
    optionTwoPercentageProgress,
  };
};

export default connect(mapStateToProps)(ResultCard);
