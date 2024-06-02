import React from "react";
// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultMain from "layouts/main/Default";

import Contact from "components/home/Contact";
import Faq from "components/home/Faq";

export default function Faqs() {

  return (
    <DefaultMain>
      <Flex position="relative" h="max-content">
        <Faq />
      </Flex>
      <Flex position="relative" h="max-content">
        <Contact />
      </Flex>
    </DefaultMain>
  );
}
