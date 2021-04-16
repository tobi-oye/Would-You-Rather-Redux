import { Box, Flex, VStack, Text, Button, Input } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../../actions/questions";

const NewCard = ({ dispatch, authedUser }) => {
  const history = useHistory();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  return (
    <Box>
      <Flex justifyContent="center">
        <VStack align="spacing">
          <Box>
            <Text textAlign="center" fontSize="25px" fontWeight="bold">
              {" "}
              Create New Question
            </Text>
          </Box>
          <Box w="100%">
            <VStack align="start" spacing={5}>
              <Text>Complete the Question</Text>

              <Text fontSize="25px" fontWeight="bold">
                Would you rather ...
              </Text>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(optionOneText, optionTwoText, authedUser);
                  dispatch(
                    handleSaveQuestion(optionOneText, optionTwoText, authedUser)
                  );
                  return history.push("/");
                }}
              >
                <VStack w="500px" spacing={5}>
                  <Input
                    placeholder="Enter OptionOne Text Here"
                    onChange={(e) => setOptionOneText(e.target.value)}
                  />
                  <Text fontSize="25px" fontWeight="bold">
                    OR
                  </Text>
                  <Input
                    placeholder="Enter OptionTwo Text Here"
                    onChange={(e) => setOptionTwoText(e.target.value)}
                  />
                  <Button colorScheme="green" type="submit" w="100%">
                    Submit
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};
const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(NewCard);
