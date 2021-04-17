import {
  Box,
  HStack,
  VStack,
  Progress,
  Text,
  Image,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  checkAuthUserVoteOptionOne,

  authedUser,
}) => {
  const [popOver, setPopOver] = useState({ optionOne: "", optionTwo: "" });

  useEffect(
    () =>
      checkAuthUserVoteOptionOne(authedUser, id) === true
        ? setPopOver({ optionOne: true, optionTwo: !true })
        : setPopOver({ optionOne: !true, optionTwo: true }),
    [checkAuthUserVoteOptionOne, authedUser, id]
  );

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
                <Popover
                  returnFocusOnClose={false}
                  isOpen={popOver.optionOne}
                  onClose={false}
                  placement="right"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Box w="300px" pos="relative">
                      <Text> a. {questions[id].optionOne.text}</Text>
                      <Progress
                        value={optionOnePercentageProgress(id)}
                        colorScheme="green"
                        height="32px"
                      />
                      <Box pos="absolute" top="30px" left="80px">
                        {" "}
                        <Text color="black" fontWeight="bold">
                          {optionOnePercentageProgress(id)}%
                        </Text>
                      </Box>

                      <Box>
                        {" "}
                        {optionOneVotesCount(id)} of {totalVotesCount(id)} votes
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent w="150px">
                    <PopoverArrow />

                    <PopoverBody>Your Vote</PopoverBody>
                  </PopoverContent>
                </Popover>

                <Popover
                  returnFocusOnClose={false}
                  isOpen={popOver.optionTwo}
                  onClose={false}
                  placement="right"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Box w="300px" pos="relative">
                      <Text>b. {questions[id].optionTwo.text}</Text>
                      <Progress
                        value={optionTwoPercentageProgress(id)}
                        colorScheme="green"
                        height="32px"
                      />
                      <Box pos="absolute" top="30px" left="80px">
                        {" "}
                        <Text color="black" fontWeight="bold">
                          {optionTwoPercentageProgress(id)}%
                        </Text>
                      </Box>
                      <Box>
                        {" "}
                        {optionTwoVotesCount(id)} of {totalVotesCount(id)} votes
                      </Box>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent w="150px">
                    <PopoverArrow />

                    <PopoverBody>Your Vote</PopoverBody>
                  </PopoverContent>
                </Popover>
              </VStack>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Flex>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => {
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

  const checkAuthUserVoteOptionOne = (authedUser, id) => {
    const voteCheck = questions[id].optionOne.votes.some(
      (user) => user === authedUser
    );
    return voteCheck;
  };

  const optionTwoPercentageProgress = (id) => {
    const questionVoteValue = questions[id].optionTwo.votes.length;
    const totalVoteValue = optionOneVotesCount(id) + optionTwoVotesCount(id);

    const percentageProgress = (questionVoteValue / totalVoteValue) * 100;
    return Math.round(percentageProgress);
  };

  const checkAuthUserVoteOptionTwo = (authedUser, id) => {
    const voteCheck = questions[id].optionTwo.votes.some(
      (user) => user === authedUser
    );
    return voteCheck;
  };

  return {
    users,
    questions,
    optionOneVotesCount,
    optionTwoVotesCount,
    totalVotesCount,
    optionOnePercentageProgress,
    optionTwoPercentageProgress,
    checkAuthUserVoteOptionOne,
    checkAuthUserVoteOptionTwo,
    authedUser,
  };
};

export default connect(mapStateToProps)(ResultCard);
