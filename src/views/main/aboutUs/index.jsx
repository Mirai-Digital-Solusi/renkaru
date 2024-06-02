import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultMain from "layouts/main/Default";

import About from "components/home/About";
import Contact from "components/home/Contact";

export default function Home() {

  return (
    <DefaultMain>
      <Flex position="relative" h="max-content">
        <About />
      </Flex>
      <Flex position="relative" h="max-content">
        <Contact />
      </Flex>
    </DefaultMain>
  );
}
