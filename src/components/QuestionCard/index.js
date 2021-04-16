import {
  Box,
  HStack,
  VStack,
  Button,
  Radio,
  RadioGroup,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../../actions/users";
const QuestionCard = ({ id, users, questions, authedUser, dispatch }) => {
  const [radioValue, setRadioValue] = useState("");
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <VStack align="start" border="1px solid black" p="20px">
          <Box>
            <Text fontWeight="bold">
              {" "}
              {users[questions[id].author].name} asks
            </Text>
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
                <VStack align="start">
                  <form>
                    <Text fontSize="20px" fontWeight="bold">
                      {" "}
                      Would You Rather ...
                    </Text>
                    <RadioGroup>
                      <VStack spacing={5} align="start">
                        <Radio
                          colorScheme="red"
                          value="1"
                          onChange={() => setRadioValue("optionOne")}
                        >
                          a. {questions[id].optionOne.text}
                        </Radio>
                        <Radio
                          colorScheme="green"
                          value="2"
                          onChange={() => setRadioValue("optionTwo")}
                        >
                          b. {questions[id].optionTwo.text}
                        </Radio>
                      </VStack>
                    </RadioGroup>

                    <Button
                      onClick={() =>
                        dispatch(
                          handleSaveQuestionAnswer(
                            authedUser,
                            questions[id].id,
                            radioValue
                          )
                        )
                      }
                    >
                      Submit
                    </Button>
                  </form>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

const mapStateToProps = ({ users, authedUser, questions }) => {
  return { users, authedUser, questions };
};

export default connect(mapStateToProps)(QuestionCard);
