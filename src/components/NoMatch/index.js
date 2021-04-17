import { Box, Flex, Text, VStack } from "@chakra-ui/layout";

import SignIn from "../SignIn";

const NoMatch = ({ location }) => {
  return (
    <Box>
      <Flex justifyContent="center">
        <VStack spacing={5}>
          <Text fontSize="50px" fontWeight="bold">
            {" "}
            404 Error , Page Not Found
          </Text>
          <Text fontSize="20px">Kindly Sign In Here</Text>
          <SignIn location={location} />
        </VStack>
      </Flex>
    </Box>
  );
};

export default NoMatch;
