import React from "react";
// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import DefaultMain from "layouts/main/Default";
// Assets;
import Service from "components/home/Service";
import Contact from "components/home/Contact";

export default function Services() {

  return (
    <DefaultMain>
      <Flex position="relative" h="max-content">
        <Service />
      </Flex>
      <Flex position="relative" h="max-content">
        <Contact />
      </Flex>
    </DefaultMain>
  );
}
