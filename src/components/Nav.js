import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Image,
  HStack,
  Text,
  //   BreadcrumbSeparator,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = ({ authedUser, users, dispatch }) => {
  return (
    <Flex justifyContent="center" p="30px">
      <Breadcrumb separator="" spacing="55px">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">New Question</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Leader Board</BreadcrumbLink>
        </BreadcrumbItem>

        {authedUser && (
          <BreadcrumbItem isCurrentPage>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <HStack m="10px">
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={users[authedUser].avatarURL}
                  alt={users[authedUser].name}
                />
                <Text>{users[authedUser].name}</Text>
              </HStack>
              <BreadcrumbLink href="#">
                <Button onClick={() => dispatch(setAuthedUser(null))}>
                  LOG OUT
                </Button>
              </BreadcrumbLink>
            </Flex>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </Flex>
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return { users, authedUser };
};

export default connect(mapStateToProps)(Nav);
