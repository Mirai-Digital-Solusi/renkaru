import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultMain from "layouts/main/Default";
// Assets
import illustration from "assets/img/auth/auth.jpg";

import Term from "components/home/Terms";
import Contact from "components/home/Contact";

export default function Terms() {
  const { children, illustrationBackground } = illustration;

  // unused
  function DottedBox() {
    return (
      <Box
        position="absolute"
        left="-45px"
        top="-30px"
        height="full"
        maxW="700px"
        zIndex={-1}
      >
        <svg
          color={useColorModeValue(
            "rgba(55,65,81, 0.1)",
            "rgba(55,65,81, 0.7)"
          )}
          width="350"
          height="420"
          fill="none"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
          ></rect>
        </svg>
      </Box>
    );
  }

  return (
    <DefaultMain>
      <Flex position="relative" h="max-content">
        <Term />
      </Flex>
      <Flex position="relative" h="max-content">
        <Contact />
      </Flex>
    </DefaultMain>
  );
}
