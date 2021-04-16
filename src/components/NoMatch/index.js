import { Button } from "@chakra-ui/button";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { useHistory } from "react-router";

const NoMatch = () => {
  const history = useHistory();
  return (
    <Box>
      <Flex justifyContent="center">
        <VStack spacing={5}>
          <Text fontSize="50px" fontWeight="bold">
            {" "}
            404 Error , Page Not Found
          </Text>
          <Text fontSize="20px">Kindly Sign In Here</Text>

          <Button onClick={() => history.push("/")} colorScheme="green">
            Sign In Here
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default NoMatch;
