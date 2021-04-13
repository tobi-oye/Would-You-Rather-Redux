import {
  Box,
  Flex,
  Text,
  FormControl,
  Select,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";

const SignIn = ({ users, dispatch }) => {
  const [authUser, setAuthUser] = useState("");

  const authHandler = (id) => setAuthUser(id);
  const dispatchAuthUserHandler = (id) => dispatch(setAuthedUser(id));


  const userList = Object.values(users);
  return (
    <Flex justifyContent="center" alignItems="center" h="50vh">
      <VStack>
        <VStack>
          <Text fontSize="25px">Welcome to the Woould You Rather App</Text>
          <Text fontSize="15px">Please Sign In to Continue</Text>
        </VStack>

        <Box>REDUX LOGO</Box>

        <Flex>
          <Text>Sign In</Text>
        </Flex>

        <form style={{ width: "100%" }}>
          <FormControl id="country">
            <Select
              placeholder="Select User"
              onChange={(e) => authHandler(e.target.value)}
            >
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            <Flex justifyContent="center">
              <Button
                mt={4}
                colorScheme="blue"
                w="100%"
                onClick={() => dispatchAuthUserHandler(authUser)}
              >
                Sign In
              </Button>
            </Flex>
          </FormControl>
        </form>
      </VStack>
    </Flex>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};
export default connect(mapStateToProps)(SignIn);
