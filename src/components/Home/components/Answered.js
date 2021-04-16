import {
  Flex,
  Button,
  Box,
  VStack,
  Image,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const Answered = ({ answeredQuestionsList, users, questions }) => {
  const history = useHistory();
  return (
    <UnorderedList
      style={{
        listStyleType: "none",
        padding: "0",
        width: "100%",

        border: "1px solid black",
      }}
    >
      {answeredQuestionsList.map((answeredQuestion) => (
        <ListItem
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
                  onClick={(e) => history.push(`/questions/${e.target.value}`)}
                >
                  View Poll
                </Button>
              </VStack>
            </Flex>
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

const mapStateToProps = ({ users, questions }) => {
  return { users, questions };
};

export default connect(mapStateToProps)(Answered);
