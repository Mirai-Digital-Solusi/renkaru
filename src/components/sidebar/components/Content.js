// chakra imports
import { Text, Box, Flex, Stack, Button } from "@chakra-ui/react";
import { MdOutlineLogout } from "react-icons/md";
//   Custom components
//import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";
import AuthService from "services/auth.services.js";
import { Link } from "react-router-dom";

function LogoutFunc() {
  AuthService.logout().then(
    () => {
      console.log("Success Logout");
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    }
  );
}

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      {/* <Brand /> */}
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
          <Link onClick={LogoutFunc} to="/auth/sign-in">
            <Button mt="10%" w="90%" leftIcon={<MdOutlineLogout />} size="md" colorScheme="red">
              Logout
            </Button>
          </Link>
        </Box>
        
      </Stack>

      <Box mt="60px" mb="40px" borderRadius="30px">
        <SidebarCard />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
