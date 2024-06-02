import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  chakra,
  Stack,
  HStack,
  Text,
  Link,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Skeleton,
  Image,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultMain from "layouts/main/Default";
// Assets
import illustration from "assets/img/auth/auth.jpg";
import { FcGoogle } from "react-icons/fc";
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

import About from "components/home/About";
import Contact from "components/home/Contact";

export default function Home() {
  const { children, illustrationBackground } = illustration;

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
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  function validateLogin(email) {
    let error;
    if (!email) {
      error = "email or password is required";
    }
    return error;
  }

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
