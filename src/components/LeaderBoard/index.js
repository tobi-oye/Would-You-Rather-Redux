import { Image } from "@chakra-ui/image";
import {
  Box,
  Circle,
  Flex,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/layout";
import { connect } from "react-redux";

import sortBy from "sort-by";

const LeaderBoard = ({ users }) => {
  const allUsers = Object.values(users);
  const sorted = allUsers
    .map((user) => {
      return {
        total: user.questions.length + Object.keys(user.answers).length,
        ...user,
      };
    })
    .sort(sortBy("-total"));

  return (
    <>
      <Box>
        <UnorderedList>
          {sorted.map((user) => {
            const answeredQuestions = Object.keys(user.answers).length;
            const createdQuestions = user.questions.length;
            return (
              <ListItem key={user.id} listStyleType="none">
                <Flex justifyContent="center" mb="30px">
                  <HStack spacing={10}>
                    <Box>
                      <Image
                        src={user.avatarURL}
                        alt={user.name}
                        borderRadius="full"
                        boxSize="100px"
                      />
                    </Box>

                    <Box>
                      <VStack w="100%" align="start">
                        <Text fontSize="20px" fontWeight="700">
                          {user.name}
                        </Text>
                        <Flex justifyContent="space-between" w="200px">
                          <Text>Answered Questions</Text>
                          <Text>{answeredQuestions}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" w="200px">
                          <Text>Created Questions</Text>
                          <Text>{createdQuestions}</Text>
                        </Flex>
                      </VStack>
                    </Box>

                    <Box>
                      <VStack
                        bgColor="gray.100"
                        border="0.5px solid black"
                        p="5px"
                      >
                        <Box>
                          {" "}
                          <Text>Score</Text>
                        </Box>
                        <Flex justifyContent="center" p="5px">
                          {" "}
                          <Circle bgColor="green.700" boxSize="50px">
                            {" "}
                            <Text
                              fontSize="25px"
                              fontWeight="700"
                              color="white"
                            >
                              {createdQuestions + answeredQuestions}
                            </Text>
                          </Circle>
                        </Flex>
                      </VStack>
                    </Box>
                  </HStack>
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
      )
    </>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return { users, authedUser };
};

export default connect(mapStateToProps)(LeaderBoard);
