import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import DefaultMain from "layouts/main/Default";

import Term from "components/home/Terms";
import Contact from "components/home/Contact";

export default function Terms() {
  
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
